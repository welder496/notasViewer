var express = require('express');
var router = express.Router();
var notasRest = require('notasrest');

/* GET */
router.get('/', function(req, res, next) {
    notasRest.getFirstNotas(function(data){
       res.render('searchForNota',{results: data, show: 'false'});
    });
});

/* POST */
router.post('/', function(req, res, next) {
   var nota = req.body.searchNota;
   if (typeof(nota) != "undefined" && nota) {
         notasRest.getNotasLike(nota, function(data){
             if (data.hasOwnProperty('message'))
                res.render('searchForNota',{results: null, show: 'true', message: data.message});
             else
                res.render('searchForNota',{results: data, show: 'false'});
         });
      } else {
         notasRest.getFirstNotas(function(data){
             res.render('searchForNota',{results: data, show: 'false'});
         });
   }
});


module.exports = router;