global.__base = __dirname;

var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var path = require('path');
var bodyParser = require('body-parser');
var main = require('./routes/main');
var searchForTags = require('./routes/searchForTags');
var documents = require('./routes/documents');
var breadcrumb = require('./routes/breadCrumb');
var help = require('./routes/help');
var http_auth = require('express-http-auth');
var morgan = require('morgan');
var fs = require('fs');

var app = express();

var downs = __base + '/downloads';

//creates a log into a file
var accessLogger = fs.createWriteStream(__dirname+'/logAccess.log', {flags: 'a'});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('combined',{stream: accessLogger}));
/* Testing
app.use(http_auth.realm('NotasViewer'));
app.use(function(req,res,next){
      if (req.name == 'user' && req.pass == 'user'){
            next();
      } else {
            res.header('WWW-Authenticate', 'Basic realm="NotasViewer"');
            res.sendStatus(401);
      }
});
*/
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'teste',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({url: 'mongodb://localhost/Notas', autoRemove: 'native', collection: 'notasViewerSession'})
}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(downs)));

app.use('/',main);
app.use('/index', main);
app.use('/searchForTags', searchForTags);
app.use('/documents', documents);
app.use('/breadcrumb', breadcrumb);
app.use('/help', help);
app.use('/downloads',express.static(downs));

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
