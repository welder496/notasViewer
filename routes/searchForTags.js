var express = require('express');
var searchForTags = express.Router({mergeparams: true});
var notasRest = require('notasrest');
var tags = require('./tags');
var arquivos = require('./arquivos');
var stack = require('localstack');
var tokenUtil = require('./connect');
var token = "";

var parseData = function(counter,str){
      var txt = "";
      while (! stack.isEmpty()) {
            stack.pop(function(data){
                 var opr = data;
                 if (opr.indexOf('$') != -1) {
                       txt = parseData(counter+1, txt);
                       str = str + 'op'+(counter+1)+'='+encodeURIComponent(opr)+"&"+txt;
                       return;
                 } else {
                       str = str + "tags"+counter+"="+encodeURIComponent(opr)+"&";
                 }
            });
      }
      return str;
};

var pushSessionData = function(tags){
      tags = decodeURIComponent(tags);
      tags = tags.toString().split(',');
      tags.forEach(function(data){
            if (data != "" && typeof(data) != "undefined"){
                 stack.push(data.trim(), function(data){});
            }
      });
};

var pushData = function(tags){
      tags = decodeURIComponent(tags);
      tags = tags.split(',');
      tags.forEach(function(data){
            if (data != "" && typeof(data) != "undefined"){
                 stack.push(data.trim(), function(data){});
            }
      });
};

var showData = function(res, message, show, data, token){
      var results = "";
      if ((data instanceof Array) && (data.length != 0)) {
           for (var i=0; i < data.length; i++){
                 data[i].tags = tags(data[i].tags);
                 data[i].arquivos = arquivos(data[i].codigo,data[i].arquivos);
           }
           results = data;
      }
      res.render('searchForTags', {results: results, message: message, show: show, token: token});
};

/* GET */
searchForTags.get('/', function(req, res) {
      var message = "";
      var command = "";
      var show = 'false';
      token = global.__token;
      req.session.stack = [];
      req.session.cookie.expires = new Date(Date.now()+60000);
      req.session.cookie.maxAge = 60000;
      req.session.save(function(){});
      stack.clear(function(data){});
      notasRest.getFirstNotas(token, function(data){
            showData(res, message, show, data, token);
      });
});

var postOr = function(token,req, res){
      var show = 'false';
      var message = "";
      var searchTags = encodeURIComponent(req.body.searchTags);
      if (req.session.stack instanceof Array){
           req.session.stack.reverse();
           pushSessionData(req.session.stack);
      }
      if (searchTags !== "undefined" && searchTags !== "") {
            pushData(searchTags);
            stack.push('$or',function(data){});
      }
      req.session.stack = stack.copy();
      req.session.cookie.expires = new Date(Date.now()+60000);
      req.session.cookie.maxAge = 60000;
      req.session.save(function(err){});
      var command="";
      command = parseData(0,command);
      notasRest.getNotasByTags(token, command.substring(0,command.length-1), function(data){
            if (data.hasOwnProperty('message')) {
                 message = data.message;
                 show = 'true';
            }
            showData(res, message, show, data, token);
      });
};

var postAnd = function(token,req, res){
      var show = 'false';
      var message = "";
      var searchTags = encodeURIComponent(req.body.searchTags);
      if (req.session.stack instanceof Array){
            req.session.stack.reverse();
            pushSessionData(req.session.stack);
      }
      if (searchTags !== "undefined" && searchTags !== "") {
           pushData(searchTags);
           stack.push('$and',function(data){});
      }
      req.session.stack = stack.copy();
      req.session.cookie.expires = new Date(Date.now()+60000);
      req.session.cookie.maxAge = 60000;
      req.session.save(function(){});
      var command = "";
      command = parseData(0,command);
      notasRest.getNotasByTags(token, command.substring(0,command.length-1), function(data){
           if (data.hasOwnProperty('message')) {
                 message = data.message;
                 show = 'true';
           }
           showData(res, message, show, data, token);
      });
}

var postTexto = function(token,req,res){
      var message = "";
      var show = 'false';
      var searchTags = encodeURIComponent(req.body.searchTags);
      req.session.stack = [];
      req.session.cookie.expires = new Date(Date.now()+60000);
      req.session.cookie.maxAge = 60000;
      req.session.save(function(){});
      stack.clear(function(data){});
      if ((typeof(searchTags) != "undefined" && searchTags)){
           notasRest.getNotasLike(token, searchTags, function(data){
                 if (data.hasOwnProperty('message')) {
                       message = data.message;
                       show = 'true';
                 }
                 showData(res, message, show, data, token);
           });
      }
};

var postNothing = function(token,req, res){
      var message = "";
      var show = 'false';
      req.session.stack = [];
      req.session.cookie.expires = new Date(Date.now()+60000);
      req.session.cookie.maxAge = 60000;
      req.session.save(function(){});
      stack.clear(function(data){});
      notasRest.getFirstNotas(token, function(data){
           if (data.hasOwnProperty('message')) {
                 message = data.message;
                 show = 'true';
           }
           showData(res, message, show, data, token);
      });
};

/* POST */
searchForTags.post('/', function(req, res) {
      var searchTags = req.body.searchTags;
      var button = req.body.button;
      token = req.body.token;
      token = tokenUtil.connect(token);
      if (button !== null) {
          var testButton = button.toUpperCase();
      }
      if (testButton === "OR" && searchTags !== ""){
         postOr(token,req, res);
      } else
      if (testButton === "AND" && searchTags !== ""){
         postAnd(token,req, res);
      } else
      if (testButton === "TEXTO" && searchTags !== ""){
         postTexto(token,req, res);
      } else {
         postNothing(token,req,res);
      }
      global.__token = token;
});

searchForTags.get('/subsearch/:value', function(req, res){
      var value = req.params.value;
      var substack = [];
      if (typeof(req.session) !== "undefined") {
            var stack = req.session.stack;
            if (typeof(stack) !== "undefined") {
                 for (var i = (stack.length - value); i < stack.length ; i++){
                       substack.push(stack[i]);
                 }
            }
      }
      req.session.stack = substack;
      req.session.cookie.expires = new Date(Date.now()+60000);
      req.session.cookie.maxAge = 60000;
      req.session.save(function(err){});
      token = global.__token;
      if (substack[0] === "$or") {
            postOr(token,req, res);
      } else
      if (substack[0] === "$and") {
           postAnd(token,req, res);
      } else {
         res.redirect('/index');
      }
      global.__token = token;
});

searchForTags.post('/clean', function(req, res){
      stack.clear(function(data){});
      req.session.stack = [];
      req.session.cookie.expires = new Date(Date.now()+60000);
      req.session.cookie.maxAge = 60000;
      req.session.save(function(err){});
      res.end();
});

module.exports = searchForTags;