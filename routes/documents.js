var express = require('express');
var documents = express.Router({mergeparams: true});
var notasRest = require('notasrest');
var netconfig = require('netconfig');

documents.get('/', function(req, res, next){
   var codigo = req.body.codigo;
   var documento = req.body.value;
   var message = '';
   notasRest.getNotaByCodigo(codigo, function(data){
      if (data.hasOwnProperty('message')){
            message = data.message;
            res.json({message: message, show: 'true'});
      } else
      if (data.hasOwnProperty('codigo')) {
            var id = data._id;
            notasRest.getDocument(id+'/'+documento, function(data){
            if (data.hasOwnProperty('message')){
                 message = data.message;
                 res.json({message: message, show: 'true'});
            } else {
                 res.end(data);
            }
         });
      }
  });
});

documents.post('/', function(req, res, next){
   var codigo = req.body.codigo;
   var documento = req.body.value;
   var message = '';
   notasRest.getNotaByCodigo(codigo, function(data){
      if (data.hasOwnProperty('message')){
            message = data.message;
            res.json({message: message, show: 'true'});
      } else
      if (data.hasOwnProperty('codigo')) {
            var id = data._id;
            notasRest.getDocument(id+'/'+documento, function(data){
            if (data.hasOwnProperty('message')){
                 message = data.message;
                 res.json({message: message, show: 'true'});
            } else {
                 res.send(data);
            }
         });
      }
  });
});

module.exports = documents;