var express = require('express');
var router = express.Router();
var tags = require('./tags');
var arquivos = require('./arquivos');
var notasRest = require('notasrest');
var rest = require('restler');
var stack = require('localstack');

var pushData = function(tags){
      var tags = tags.split(',');
      tags.forEach(function(data){
            stack.push(data.trim(), function(data){});
      });
};

var showData = function(res, message, show, data){
      var results = "";
      if ((data instanceof Array) && (data.length != 0)) {
                 for (var i=0; i < data.length; i++){
                       data[i].tags = tags(data[i].tags);
                       data[i].arquivos = arquivos(data[i].codigo,data[i].arquivos);
                 }
                 results = data;
      }
      res.render('searchForTags', {results: results, message: message, show: show});
};

/* GET home page. */
router.get('/', function(req, res) {
  stack.clear(function(data){});
  res.render('index', { title: 'Notas' });
});

router.get('/tags', function(req, res){
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

router.post('/', function(req, res){
      res.render('searchForTags');
});


module.exports = router;
