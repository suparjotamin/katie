// Bot configuration
var token = "5311734100:AAFoEMJvO_l-ua-mAWMuKU7ttR3FXPeJTvo";
var telegramUrl = 'https://api.telegram.org/bot' + token;
var webAppUrl = 'https://script.google.com/macros/s/AKfycbxKGsx7M1BM0zZX15pFZ9JiDBoRak0dwk0JHI96S4vsFEElD2u_/exec';

// Webhook function
function setWebhook() {
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
}

// Function to send message 
function sendMessage(id, text) {
  var url = telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + text;
  var response = UrlFetchApp.fetch(url);
}

// Function to get id from name
function getIdFromName(name, sheet) {
  var arrayName = preprocessArray(sheet.getRange('B2:B').getValues()) ;
  var idxName = arrayName.indexOf(name);
  
  var arrayId = preprocessArray(sheet.getRange('A2:A').getValues()) ;
  var idFromName = arrayId[idxName] ;
  
  return idFromName
}

// Function to get name from id
function getNameFromId(chooseid, sheet) {
  var arrayId = preprocessArray(sheet.getRange('A2:A').getValues()) ;
  var idxId = arrayId.indexOf(chooseid);
  
  var arrayName = preprocessArray(sheet.getRange('B2:B').getValues()) ;
  var nameFromId = arrayName[idxId] ;
  
  return nameFromId
}

// Function to get format from command
function getFormatFromCommand(command, sheet) {
  var arrayCommand = preprocessArray(sheet.getRange('A2:A').getValues()) ;
  var idxCommand = arrayCommand.indexOf(command);
  
  var arrayFormat = preprocessArray(sheet.getRange('B2:B').getValues()) ;
  var FormatFromCommand = arrayFormat[idxCommand] ;
  
  return FormatFromCommand
}

// Function to flatten and clean array
function preprocessArray(array) {
  var processedArrayRaw = [] ;
  
  for (var i = 0; i < array.length; i++) {
    processedArrayRaw.push(array[i][0]);
  }
  
  var processedArray = processedArrayRaw.filter(Boolean) ;
  
  return processedArray.filter(x => x !== null)
}

// Main function
function doPost(e) {

  // Google sheet link
  var ssId = "1PHHFjpfAfaXmbNsYTsj2R0uMkssKD41fUE7PWj3jSk8";
  
  // User data
  var contents = JSON.parse(e.postData.contents) ;
  var id = contents.message.from.id ;
  var text = contents.message.text.toLowerCase() ;
  var first_name = contents.message.from.first_name ;

  // Format text
  var item = text.split(" ");
  var command = item[0].toLowerCase()
  var date = new Date();
  
  // Sheet
  var sheet_log = SpreadsheetApp.openById(ssId).getSheetByName("Log Tagih Bayar");
  var sheet_summary = SpreadsheetApp.openById(ssId).getSheetByName("Summary");
  var sheet_register = SpreadsheetApp.openById(ssId).getSheetByName("Register User");
  var sheet_command = SpreadsheetApp.openById(ssId).getSheetByName("List Command");
  var sheet_cello = SpreadsheetApp.openById(ssId).getSheetByName("Cello Expenses");
  var sheet_parjo = SpreadsheetApp.openById(ssId).getSheetByName("Parjo Expenses");
  
  ////////////////////////////////////////////////////////////////////////////////////////////////
  
  // --- List of command ---
  if (command == 'getformat') {
    var commandChoose = item[1] ;
    // var commandFormat = getFormatFromCommand(commandChoose, sheet_command) ;
    
    var arrayCommand = preprocessArray(sheet_command.getRange('A2:A').getValues()) ;
    var idxCommand = arrayCommand.indexOf(commandChoose);
    
    sendMessage(id, arrayCommand) ;
    sendMessage(id, idxCommand) ;
  
    var arrayFormat = preprocessArray(sheet_command.getRange('B2:B').getValues()) ;
    sendMessage(id, arrayFormat) ;
    
    var FormatFromCommand = arrayFormat[idxCommand] ;
    
    sendMessage(id, FormatFromCommand) ;
    
    // sendMessage(id, commandFormat) ;
  }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////
  
  // --- Register User ---
  if (command == 'register') {
    var register_name = item[1] ;
    sheet_register.appendRow([id, register_name, date]);
    sendMessage(id, 'User ' + register_name + ' registered on ' + date); 
  }
  
  // --- Print all registered user ---
  if (command == 'listuser') {
    var arrayId = preprocessArray(sheet_register.getRange('A2:A').getValues()) ;
    var arrayName = preprocessArray(sheet_register.getRange('B2:B').getValues()) ;
    
    sendMessage(id, 'List of registered user :') ;
    for (var i = 2; i < arrayId.length + 2; i++) {
      var currentId = sheet_register.getDataRange().getCell(i, 1).getValue() ;
      var currentName = sheet_register.getDataRange().getCell(i, 2).getValue() ;
      sendMessage(id, i-1 + '. ' + currentName + ' : ' + currentId) ;
    } 
  }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////
  
  // --- Personal expenses ---
  if (command == 'exp') {
    var senderName = getNameFromId(id, sheet_register) ;
    
    if (senderName == 'cello') {
      var expensesCat = item[1] ;
      var expensesItem = item[2] ;
      var expensesPrice = item[3] ;
      
      sheet_cello.appendRow([date, expensesCat, expensesItem, expensesPrice]) ;
      sendMessage(id, 'Log expenses successfuly added') ;
    } 
    
    else if (senderName == 'parjo') {
      var expensesCat = item[1] ;
      var expensesItem = item[2] ;
      var expensesPrice = item[3] ;
      
      sheet_parjo.appendRow([date, expensesCat, expensesItem, expensesPrice]) ;
      sendMessage(id, 'Log expenses successfuly added') ;
    }
  }
  
  // --- Get all expenses category ---
  if (command == 'listcat') {
    if (item[1] == 'cello' ) {
      var arrayCategoryRaw = preprocessArray(sheet_cello.getRange('B2:B').getValues()) ;
      var arrayCategory = Array.from(new Set(arrayCategoryRaw));
      sendMessage(id, arrayCategory) ;
  
    }
  }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////
  
  // Config bucin parjo
  if (first_name == "Suparjo") {
    var bucin = "Lavinca";
  } else if (first_name == "Marcello") {
    var bucin = "Regina";
  }
  
  // --- Log Tagihan ---
  if (command == "tagih") {
    
    var tagihName = item[1] ;
    var tagihItem = item[2] ;
    var tagihPrice = item[3] ;
    var tagihId = getIdFromName(tagihName, sheet_register) ;
    
    var senderName = getNameFromId(id, sheet_register) ;
    
    sheet_log.appendRow([date, tagihItem, tagihName, tagihPrice, command]) ;
    
    if (senderName == 'cello') {
      sendMessage(id, 'Log tagih successfuly added') ;
    }
    
    else if (senderName == 'parjo') {
      sendMessage(id, bucin + ` : berhasil ditagih sayang`) ;
    }
    
    sendMessage(tagihId, senderName + ' ' + command + ' ' + tagihName + ' ' + tagihItem + ' ' + tagihPrice) ;
    
  } 
  
  // --- Log Bayar --- 
  else if (command == "bayar") {
    
    var bayarName = item[1] ;
    var bayarPrice = item[2] ;
    var bayarId = getIdFromName(bayarName, sheet_register) ;
    
    var senderName = getNameFromId(id, sheet_register) ;
    
    sheet_log.appendRow([date, "", item[1], item[2], command]);
    
    if (senderName == 'cello') {
      sendMessage(id, 'Log bayar successfuly added') ;
    }
    
    else if (senderName == 'parjo') {
      sendMessage(id, bucin + ` : berhasil dibayar sayang`);
    }
    
    sendMessage(bayarId, senderName + ' ' + command + ' ' + bayarName + ' ' + bayarPrice) ;
  }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////
  
  // --- Get Status --- 
  if (command == "getstatus") {
  var balance = sheet_summary.getDataRange().getCell(4, 5).getValue();
    if (balance > 0) {
      sendMessage(id, "Bayar utang kau Cello! : " + balance);
    } else if (balance < 0) {
      sendMessage(id, "Utang Parjo : " + balance);
    }
  } 
  
  ////////////////////////////////////////////////////////////////////////////////////////////////
  

  // sheet.appendRow([date, item[2], item[1], item[3], item[0]]);

  // sendMessage(id, "lolollol Lavinca Suhaimi");
}