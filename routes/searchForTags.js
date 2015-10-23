var express = require('express');
var router = express.Router();
var notasRest = require('notasrest');
var tags = require('./tags');
var arquivos = require('./arquivos');
var stack = require('localstack');
var stackCopy = [];

var parseData = function(counter,str){
    var txt = "";
    while (! stack.isEmpty()) {
            stack.pop(function(data){
                 var opr = data;
                 if (opr.indexOf('$') != -1) {
                      txt = parseData(counter+1, txt);
                      str = str + 'op'+(counter+1)+'='+opr+"&"+txt;
                      return;
                 } else {
                      str = str + "tags"+counter+"="+opr+"&";
                 }
            });
    }
    return str;
};

var pushData = function(tags){
   tags = tags.split(',');
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

/* GET */
router.get('/', function(req, res) {
      var message = "";
      var show = 'false';
      notasRest.getFirstNotas(function(data){
           showData(res, message, show, data);
      });
});

router.get('/getTags', function(req, res){
   res.json(stackCopy);   
});

router.post('/or', function(req, res){
      var show = 'false';
      var message = "";
      var searchTags = req.body.searchTags;
      pushData(searchTags);
      //stack.push('$or',function(data){});
      stack.stack(function(data){
           console.log("Pilha: "+data);   
      });
      stackCopy = stack.copy();
      var command="";
      command = parseData(0,command);
      notasRest.getNotasByTags(command.substring(0,command.length-1), function(data){
           if (data.hasOwnProperty('message')) {
               message = data.message;
               show = 'true';
           }
           showData(res, message, show, data);                
      });
});

router.post('/and', function(req, res){
      var show = 'false';
      var message = "";
      var searchTags = req.body.searchTags;
      if (typeof(searchTags) != "undefined" && searchTags) {
           searchTags = decodeURIComponent(req.body.searchTags);
      }
      pushData(searchTags);
      //stack.push('$and',function(data){});
      stack.stack(function(data){
           console.log("Pilha: "+data);   
      });
      stackCopy = stack.copy();
      var command = "";
      command = parseData(0,command);
      notasRest.getNotasByTags(command.substring(0,command.length-1), function(data){
           if (data.hasOwnProperty('message')) {
                 message = data.message;
                 show = 'true';
           } 
           showData(res, message, show, data);                
      });
});

router.post('/texto', function(req, res){
      var message = "";
      var show = 'false';
      var button = req.body.choosenButton;
      var searchTags = req.body.searchTags;
      if (button == "TEXTO" && (typeof(searchTags) != "undefined" && searchTags)){
           notasRest.getNotasLike(searchTags, function(data){
                 if (data.hasOwnProperty('message')) {
                       message = data.message;
                       show = 'true';
                 }
                 showData(res, message, show, data);
           });
      }
});

/* POST */
router.post('/', function(req, res) {
      var message = "";
      var show = 'false';
      notasRest.getFirstNotas(function(data){
           if (data.hasOwnProperty('message')) {
                 message = data.message;
                 show = 'true';
           }
           showData(res, message, show, data);
      });
      //stack.clear(function(data){});
});

module.exports = router;