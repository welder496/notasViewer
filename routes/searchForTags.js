var express = require('express');
var router = express.Router();
var notasRest = require('notasrest');
var tags = require('./tags');
var arquivos = require('./arquivos');

/* GET */
router.get('/', function(req, res, next) {
   notasRest.getFirstNotas(function(data){
      for (var i=0; i < data.length; i++){
          data[i].tags = tags(data[i].tags);
          data[i].arquivos = arquivos(data[i].codigo,data[i].arquivos);
      }
      res.render('searchForTags', {results: data, show: 'false'});
   });
});

/* POST */
router.post('/', function(req, res, next) {
   var del = req.body.comando;
   var button = req.body.choosenButton;
   var searchTags = req.body.searchTags;
   if (button== "OR" && (typeof(searchTags) != "undefined" && searchTags)) {
         notasRest.getNotasByTagsOr(searchTags, function(data){
            for (var i=0; i < data.length; i++){
                 data[i].tags = tags(data[i].tags);
                 data[i].arquivos = arquivos(data[i].codigo,data[i].arquivos);
            }
            if (data.hasOwnProperty('message'))
               res.render('searchForTags', {results: null, show: 'true', message: data.message});
            else
               res.render('searchForTags', {results: data, show: 'false'});
         });
   } else
   if (button== "AND" && (typeof(searchTags) != "undefined" && searchTags)) {
         notasRest.getNotasByTagsAnd(searchTags, function(data){
            for (var i=0; i < data.length; i++){
                data[i].tags = tags(data[i].tags);
                data[i].arquivos = arquivos(data[i].codigo,data[i].arquivos);
            }
            if (data.hasOwnProperty('message'))
               res.render('searchForTags', {results: null, show: 'true', message: data.message});
            else
               res.render('searchForTags', {results: data, show: 'false'});
         })
   } else {
         notasRest.getFirstNotas(function(data){
            for (var i=0; i < data.length; i++){
                 data[i].tags = tags(data[i].tags);
                 data[i].arquivos = arquivos(data[i].codigo,data[i].arquivos);
            }
            res.render('searchForTags', {results: data, show: 'false'});
         });
   }
});

module.exports = router;