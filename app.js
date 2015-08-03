var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');

var routes = require('./routes/index');
var edit = require('./routes/edit');
var insert = require('./routes/insert');
var searchForTags = require('./routes/searchForTags');
var searchForCodigo = require('./routes/searchForCodigo');
var searchForNota = require('./routes/searchForNota');
var documents = require('./routes/documents');
var help = require('./routes/help');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer({dest: './uploads/',
  rename: function(fieldname, filename){
    return filename+Date.now();
 }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/index', routes);
app.use('/insert', insert);
app.use('/edit',edit);
app.use('/searchForTags', searchForTags);
app.use('/searchForCodigo', searchForCodigo);
app.use('/searchForNota', searchForNota);
app.use('/documents', documents);
app.use('/help', help);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
