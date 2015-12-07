var express = require('express');
var main = express.Router({mergeparams:true});
var tags = require('./tags');
var arquivos = require('./arquivos');
var notasRest = require('notasrest');
var stack = require('localstack');

/* GET home page. */
main.get('/', function(req, res) {
      stack.clear(function(data){});
      req.session.stack = [];
      req.session.cookie.expires = new Date(Date.now()+60000);
      req.session.cookie.maxAge = 60000;
      req.session.save(function(err){});
      res.render('index', { title: 'Notas', command: ""});
});

main.get('/tags', function(req, res){
      var tags = [];
      notasRest.getTagsMapReduce(function(data){
           if ((data instanceof Array) && data.length != 0) {
                 for (var i=0; i < data.length; i++){
                       var temp = [data[i]._id , data[i].value];
                       tags.push(temp);
                 }
           }
           res.send(tags);
      });
});

module.exports = main;
