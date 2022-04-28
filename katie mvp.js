var token = "5311734100:AAFoEMJvO_l-ua-mAWMuKU7ttR3FXPeJTvo";
var telegramUrl = 'https://api.telegram.org/bot' + token;
var webAppUrl = 'https://script.google.com/macros/s/AKfycbxF-G_cOOX3C8TcUy4iFS5H0IX42qWiGz0d5LVuktj6APNa9by00RTKh5jhN6c3kvYmOg/exec';
//https://script.google.com/macros/s/AKfycbxbASBy1FjywPXeQooTLSZ9bk0T2ZVuoPHIwvyQM__-wZYKeFo9/exec



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
  // var ssId = "1aDdPayG0oRgrutUf8jeK6AiVPPfSVhzfD1aySh6LsWc";
  //parse user data
  // var contents = JSON.parse(e.postData.contents);
  // var id = contents.message.from.id;
  // var text = contents.message.text;
  // var first_name = contents.message.from.first_name;

  // // Format text
  // var item = text.split(" ");
  // var date = nowDate.getMonth() +1+'/' +nowDate.getDate();
  // var barang = item[]
  

  // // recapt sheet
  // var sheet = SpreadsheetApp.openById(ssId).getSheetByName("Sheet1");
  // if (item[0] == "tagih") {
  // sheet.appendRow([date, item[2], item[1], item[3], item[0]]);
  // } else if (item[0] == "bayar") {
  // sheet.appendRow([date, "", item[2], item[1], item[0]]);
  // }

  // sheet.appendRow([date, item[2], item[1], item[3], item[0]]);

  sendMessage(id, "lolollol");


}




