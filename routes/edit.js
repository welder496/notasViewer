var express = require('express');
var router = express.Router();
var notasRest = require('notasrest');
var rest = require('restler');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
   var codigo = req.query.codigo;
   notasRest.getNotaByCodigo(codigo, function(data){
      var versao = data.__v;
      var nota = data.nota;
      var tags = data.tags;
      var arquivos = data.arquivos;
      var message = '';
      res.render('edit', {codigo: codigo, nota: nota, tags: tags, arquivos: arquivos, versao: versao, message: message, show:'false'});
   });
});

router.post('/', function(req, res, next){
   var codigo = req.body.codigo;
   var comando = req.body.comando;
   var versao = 0;
   var nota = '';
   var tags = '';
   var arquivos = '';
   var message = '';
   notasRest.getNotaByCodigo(codigo,function(data){
      if (data.hasOwnProperty('codigo')){
             versao = parseInt(data.__v);
             nota = data.nota;
             tags = data.tags;
             arquivos = data.arquivos;
      }
      if (data.hasOwnProperty('message')){
             message = data.message
      }
      res.render('edit', {codigo: codigo, nota: nota, tags: tags, arquivos: arquivos, versao: versao, message: message, show:'false'});
   });
});

module.exports = router;