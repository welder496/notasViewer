var express = require('express');
var documents = express.Router({mergeparams: true});
var notasRest = require('notasrest');
var netconfig = require('netconfig');

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
                //var buffer = new Buffer(data, 'base64');
                //console.log(typeof(buffer));
                res.send(data);
                // res.send('http://'+netconfig.getHost()+':'+netconfig.getPort()+'/arquivos/'+id+'/'+documento);
            }
         });
      }
  });
});

module.exports = documents;