var express = require('express');
var searchForTags = express.Router({mergeparams: true});
var notasRest = require('notasrest');
var tags = require('./tags');
var arquivos = require('./arquivos');
var stack = require('localstack');
var netConfig = require('netconfig');
var restler = require('restler');
var fs = require('fs');
var update = false;
var info = "";

var connect = function(req,res,next){
      fs.readFile('./userInfo', 'utf8', function(err, data){
            info = JSON.parse(data);
            restler.get("http://"+netConfig.getHost()+":"+netConfig.getPort()+'/notas/notas/first/1',{
                 accessToken: info.token
            })
            .on('complete', function(result){
                 if (result.message === "Token inválido!!") {
                       restler.post("http://"+netConfig.getHost()+":"+netConfig.getPort()+'/notas/usuario/login',{
                             data: {username: info.username, password: info.password}
                       })
                       .on('complete', function(result){
                             fs.writeFile('./userInfo',JSON.stringify({"username": result.username, "password": "notasPJEViewer", "token": result.token}),'utf8');
                             update = true;
                       })
                 }
            });
      });
      next();
}

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

var showData = function(res, message, show, data, reload){
      var results = "";
      if ((data instanceof Array) && (data.length != 0)) {
           for (var i=0; i < data.length; i++){
                 data[i].tags = tags(data[i].tags);
                 data[i].arquivos = arquivos(data[i].codigo,data[i].arquivos);
           }
           results = data;
      }
      res.render('searchForTags', {results: results, message: message, show: show, reload: reload});
};

/* GET */
searchForTags.get('/',connect, function(req, res) {
      var message = "";
      var command = "";
      var show = 'false';
      var localReload = false;
      req.session.stack = [];
      req.session.cookie.expires = new Date(Date.now()+60000);
      req.session.cookie.maxAge = 60000;
      req.session.save(function(){});
      stack.clear(function(data){});
      notasRest.getFirstNotas(function(data){
            localReload = update;
            update = false;
            showData(res, message, show, data, localReload);
            if (localReload) {
                 localReload = false;
            }
      });
});

var postOr = function(req, res){
      var show = 'false';
      var message = "";
      var localReload = false;
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
      notasRest.getNotasByTags(command.substring(0,command.length-1), function(data){
            if (data.hasOwnProperty('message')) {
                 message = data.message;
                 show = 'true';
            }
            localReload = update;
            update = false;
            showData(res, message, show, data, localReload);
            if (localReload) {
                  localReload = false;
            }
      });
};

var postAnd = function(req, res){
      var show = 'false';
      var message = "";
      var localReload = false;
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
      notasRest.getNotasByTags(command.substring(0,command.length-1), function(data){
           if (data.hasOwnProperty('message')) {
                 message = data.message;
                 show = 'true';
           }
           localReload = update;
           update = false;
           showData(res, message, show, data, localReload);
           if (localReload) {
                  localReload = false;
           }
      });
}

var postTexto = function(req,res){
      var message = "";
      var show = 'false';
      var localReload = false;
      var searchTags = encodeURIComponent(req.body.searchTags);
      req.session.stack = [];
      req.session.cookie.expires = new Date(Date.now()+60000);
      req.session.cookie.maxAge = 60000;
      req.session.save(function(){});
      stack.clear(function(data){});
      if ((typeof(searchTags) != "undefined" && searchTags)){
           notasRest.getNotasLike(searchTags, function(data){
                 if (data.hasOwnProperty('message')) {
                       message = data.message;
                       show = 'true';
                 }
                 localReload = update;
                 update = false;
                 showData(res, message, show, data, localReload);
                 if (localReload) {
                      localReload = false;
                 }
           });
      }
};

var postNothing = function(req, res){
      var message = "";
      var show = 'false';
      var localReload = false;
      req.session.stack = [];
      req.session.cookie.expires = new Date(Date.now()+60000);
      req.session.cookie.maxAge = 60000;
      req.session.save(function(){});
      stack.clear(function(data){});
      notasRest.getFirstNotas(function(data){
           if (data.hasOwnProperty('message')) {
                 message = data.message;
                 show = 'true';
           }
           localReload = update;
           update = false;
           showData(res, message, show, data, localReload);
           if (localReload) {
                localReload = false;
           }
      });
};

/* POST */
searchForTags.post('/', connect, function(req, res) {
      var searchTags = req.body.searchTags;
      var button = req.body.button;
      if (button !== null) {
          var testButton = button.toUpperCase();
      }
      if (testButton === "OR" && searchTags !== ""){
         postOr(req, res);
      } else
      if (testButton === "AND" && searchTags !== ""){
         postAnd(req, res);
      } else
      if (testButton === "TEXTO" && searchTags !== ""){
         postTexto(req, res);
      } else {
         postNothing(req,res);
      }
});

searchForTags.get('/subsearch/:value',connect, function(req, res){
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
      if (substack[0] === "$or") {
            postOr(req, res);
      } else
      if (substack[0] === "$and") {
           postAnd(req, res);
      } else {
         res.redirect('/index');
      }
});

searchForTags.post('/clean', connect, function(req, res){
      stack.clear(function(data){});
      req.session.stack = [];
      req.session.cookie.expires = new Date(Date.now()+60000);
      req.session.cookie.maxAge = 60000;
      req.session.save(function(err){});
      res.end();
});

module.exports = searchForTags;