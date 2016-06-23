//Make sure jQuery has been loaded before controller.js
if (typeof jQuery === "undefined") {
  throw new Error("controller requires jQuery");
}

var headers = {
  key: 'absinth',
  access: 'onlycoc',
  'x-requested-with': 'XMLHttpRequest',
  accept: '*/*',
  'content-type': 'application/json; charset=UTF-8'
};

function display (data) {
  console.log(data);
}

function dynamicTabe (data) {
  var tableHead = '<thead>' +
                    '<th>body-parser</th>' +
                    '<th>connect-redis</th>' +
                    '<th>cookie-parser</th>' +
                    '<th>debug</th>' +
                    '<th>errorhanfler</th>' +
                    '<th>express</th>' +
                    '<th>express-session</th>' +
                    '<th>jade</th>' +
                    '<th>lodash</th>' +
                    '<th>morgan</th>' +
                    '<th>multer</th>' +
                    '<th>request</th>' +
                    '<th>static-favicon</th>' +
                    '<th>validator</th>' +
                    '<th>minifyjs</th>' +
                    '<th>csv</th>' +
                  '</thead>';
  var tableRow = '';
  for ( i = 0; i<data.length; i++ ) {
    tableRow += '<tr>' +
                  '<td>' + data[i]['body-parser'] + '</td>' +
                  '<td>' + data[i]["connect-redis"] + '</td>' +
                  '<td>' + data[i]["cookie-parser"] + '</td>' +
                  '<td>' + data[i]["debug"] + '</td>' +
                  '<td>' + data[i]["errorhandler"] + '</td>' +
                  '<td>' + data[i]["express"] + '</td>' +
                  '<td>' + data[i]["express-session"] + '</td>' +
                  '<td>' + data[i]["jade"] + '</td>' +
                  '<td>' + data[i]["lodash"] + '</td>' +
                  '<td>' + data[i]["morgan"] + '</td>' +
                  '<td>' + data[i]["multer"] + '</td>' +
                  '<td>' + data[i]["request"] + '</td>' +
                  '<td>' + data[i]["static-favicon"] + '</td>' +
                  '<td>' + data[i]["validator"] + '</td>' +
                  '<td>' + data[i]["minifyjs"] + '</td>' +
                  '<td>' + data[i]["csv"] + '</td>' +
                '</tr>';
  }

  $("#tabBody").html('<table>' + tableHead + tableRow + '</table>');
}

var session = {
  user: 'me',
  pass: 'u'
};

getData('http://127.0.0.1:4000/data','get', headers, session, dynamicTabe);

var data = {'id': 111};

postData('http://127.0.0.1:2000/data', 'POST', headers, session,data, display);

