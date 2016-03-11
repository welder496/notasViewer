var express = require('express');
var main = express.Router({mergeparams:true});
var tags = require('./tags');
var arquivos = require('./arquivos');
var notasRest = require('notasrest');
var stack = require('localstack');
var fs = require('fs');
var netConfig = require('netconfig');
var tokenUtil = require('./connect');
var token = global.__token;

/* GET home page. */
main.get('/', function(req, res) {
      token = global.__token;
      stack.clear(function(data){});
      req.session.stack = [];
      req.session.cookie.expires = new Date(Date.now()+60000);
      req.session.cookie.maxAge = 60000;
      req.session.save(function(err){});
      res.render('index', { title: 'Notas', command: "", token: token});
});

main.post('/tags', function(req, res){
      token = req.body.token;
      token = tokenUtil.connect(token);
      var tags = [];
      notasRest.getTagsMapReduce(token, function(data){
           if ((data instanceof Array) && data.length != 0) {
                 for (var i=0; i < data.length; i++){
                       var temp = [data[i]._id , data[i].value];
                       tags.push(temp);
                 }
           }
           res.send(tags);
      });
      global.__token = token;
});

module.exports = main;
