var express = require('express');
var router = express.Router();
var notasRest = require('notasrest');
var tags = require('./tags');
var arquivos = require('./arquivos');

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
router.get('/', function(req, res, next) {
   var message = "";
   var show = 'false';
   notasRest.getFirstNotas(function(data){
         showData(res, message, show, data);
   });
});

/* POST */
router.post('/', function(req, res, next) {
   var message = "";
   var show = 'false';
   var del = req.body.comando;
   var button = req.body.choosenButton;
   var searchTags = req.body.searchTags;
   if (typeof(del) == "undefined") {
      if (button== "OR" && (typeof(searchTags) != "undefined" && searchTags)) {
         notasRest.getNotasByTagsOr(searchTags, function(data){
                   showData(res, message, show, data)
         });
      } else
      if (button== "AND" && (typeof(searchTags) != "undefined" && searchTags)) {
         notasRest.getNotasByTagsAnd(searchTags, function(data){
                   showData(res, message, show, data);
         });
      } else {
         notasRest.getFirstNotas(function(data){
                   showData(res, message, show, data);
         });
      }
   } else {
         var codigo = req.body.codigo;
         notasRest.deleteNotaByCodigo(codigo,function(data){
                   if (data.hasOwnProperty('message')){
                             message = data.message;
                             show = 'true';
                   }
                   notasRest.getFirstNotas(function(data){
                           showData(res, message, show, data);
                   });
         });
   }
});

module.exports = router;