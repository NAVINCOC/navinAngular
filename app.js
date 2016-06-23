var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var router = require('./router');
var colors = require('colors');
 
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

var app = express();

console.log('server listening at 127.0.0.1 over port 4000'.info);
app.use(cookieParser());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

router(app);

app.listen(4000);


