var token = "5311734100:AAFoEMJvO_l-ua-mAWMuKU7ttR3FXPeJTvo";
var telegramUrl = 'https://api.telegram.org/bot' + token;
var webAppUrl = 'https://script.google.com/macros/s/AKfycbxKGsx7M1BM0zZX15pFZ9JiDBoRak0dwk0JHI96S4vsFEElD2u_/exec';
// https://script.google.com/macros/s/AKfycbxKGsx7M1BM0zZX15pFZ9JiDBoRak0dwk0JHI96S4vsFEElD2u_/exec

function setWebhook() {
var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
var response = UrlFetchApp.fetch(url);
}

function sendMessage(id, text) {
var url = telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + text;
var response = UrlFetchApp.fetch(url);
}

function doPost(e) {

  // General
  var ssId = "1PHHFjpfAfaXmbNsYTsj2R0uMkssKD41fUE7PWj3jSk8";
  //parse user data
  var contents = JSON.parse(e.postData.contents);
  var id = contents.message.from.id;
  var text = contents.message.text;
  // var first_name = contents.message.from.first_name;

  // // Format text
  var item = text.split(" ");
  var date = new Date();
  // var barang = item[]
  

  // recapt sheet
  var sheet = SpreadsheetApp.openById(ssId).getSheetByName("Sheet1");
  if (item[0] == "tagih") {
  sheet.appendRow([date, item[2], item[1], item[3], item[0]]);
  } else if (item[0] == "bayar") {
  sheet.appendRow([date, "", item[1], item[2], item[0]]);
  }

  // sheet.appendRow([date, item[2], item[1], item[3], item[0]]);

  sendMessage(id, "lolollol Lavinca");


}
