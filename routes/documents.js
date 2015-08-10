var express = require('express');
var router = express.Router();
var notasRest = require('notasrest');
var open = require('opener');
var request = require('request');

router.get('/', function(req, res, next){
   res.render('documents');
});

router.delete('/', function(req, res, next){
   var codigo = req.body.codigo;
   var documento = req.body.value;
   var message = '';
   var versao =  0;
   notasRest.deleteDocument(codigo, documento, function(data){
      if (data.hasOwnProperty('message')) {
         message = data.message;
      }
      notasRest.getNotaByCodigo(codigo, function(data){
         if (data.hasOwnProperty('message')) {
            message = data.message;
         }
         if (data.hasOwnProperty('codigo')) {
            versao = parseInt(data.versao);
         }
      })
   });
  res.render('documents');
});

router.post('/', function(req, res, next){
   var codigo = req.body.codigo;
   var documento = req.body.value;
   var message = '';
   notasRest.getNotaByCodigo(codigo, function(data){
      if (data.hasOwnProperty('message')){
         message = data.message;
         res.render('edit',{message: message, show: 'true'});
      }
      if (data.hasOwnProperty('codigo')) {
         var id = data._id;
         notasRest.getDocument(id+'/'+documento, function(data){
             if (data.hasOwnProperty('message')){
                  message = data.message;
                  res.render('edit',{message: message, show: 'true'});
             } else
             if (data) {
                 open(data);
             }
         });
      }
  });
  res.render('documents');
});

module.exports = router;