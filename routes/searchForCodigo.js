var express = require('express');
var router = express.Router();
var notasRest = require('notasrest');

/* GET */
router.get('/', function(req, res, next){
   var codigo = req.body.searchCodigo;
   if (typeof(codigo) == "undefined" || codigo=="") {
      notasRest.getFirstNotas(function(data){
         res.render('searchForCodigo',{results: data, show: 'false'});
      });
   } else {
      notasRest.getNotaByCodigoLike(codigo, function(data){
         res.render('searchForCodigo',{results: data, show: 'false'});
      });
   }
});

/* POST */
router.post('/', function(req, res, next) {
   var codigo = req.body.codigo || req.body.searchCodigo;
   if (typeof(codigo) == "undefined" || codigo=="") {
         notasRest.getFirstNotas(function(data){
            res.render('searchForCodigo',{results: data, show: 'false'});
         });
   } else {
         notasRest.getNotaByCodigoLike(codigo, function(data){
            if (data.hasOwnProperty('message'))
               res.render('searchForCodigo',{results: null, show: 'true', message: data.message});
            else
               res.render('searchForCodigo',{results: data, show: 'false'});
         });
   }
});


module.exports = router;