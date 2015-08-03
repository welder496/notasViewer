var express = require('express');
var router = express.Router();
var notasRest = require('notasrest');

/* GET */
router.get('/', function(req, res, next) {
   notasRest.getFirstNotas(function(data){
      res.render('searchForTags', {results: data, show: 'false'});
   });
});

/* POST */
router.post('/', function(req, res, next) {
   var del = req.body.comando;
   var button = req.body.choosenButton;
   var searchTags = req.body.searchTags;
   if (typeof(del) == "undefined") {
      if (button== "OR" && (typeof(searchTags) != "undefined" && searchTags)) {
         notasRest.getNotasByTagsOr(searchTags, function(data){
            if (data.hasOwnProperty('message'))
               res.render('searchForTags', {results: null, show: 'true', message: data.message});
            else
               res.render('searchForTags', {results: data, show: 'false'});
         });
      } else
      if (button== "AND" && (typeof(searchTags) != "undefined" && searchTags)) {
         notasRest.getNotasByTagsAnd(searchTags, function(data){
            if (data.hasOwnProperty('message'))
               res.render('searchForTags', {results: null, show: 'true', message: data.message});
            else
               res.render('searchForTags', {results: data, show: 'false'});
         })
      } else {
         notasRest.getFirstNotas(function(data){
            res.render('searchForTags', {results: data, show: 'false'});
         });
      }
   } else {
         var codigo = req.body.codigo;
         notasRest.deleteNotaByCodigo(codigo,function(data){
               var dat = data;
               notasRest.getFirstNotas(function(data){
                   res.render('searchForTags',{results: data, show: 'true', message: dat.message});
               });
         });
   }
});

module.exports = router;