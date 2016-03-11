var express = require('express');
var documents = express.Router({mergeparams: true});
var notasRest = require('notasrest');
var request = require('request');
var fs = require('fs');
var netconfig = require('netconfig');
var tokenUtil = require('./connect');
var downs = __base+'/downloads';
var token = "";

documents.post('/', function(req, res, next){
   var codigo = req.body.codigo;
   var documento = req.body.value;
   token = req.body.token;
   token = tokenUtil.connect(token);
   var message = '';
   notasRest.getNotaByCodigo(token, codigo, function(data){
      if (data.hasOwnProperty('message')){
            message = data.message;
            res.json({message: message, show: 'true'});
      } else
      if (data.hasOwnProperty('codigo')) {
            var id = data._id;
            var r = request.get("http://"+netconfig.getHost()+":"+netconfig.getPort()+"/arquivos/"+id+"/"+documento).auth(null,null,true,token);
            r.on('response', function(response){
              if (!fs.existsSync(downs)){
                 fs.mkdir(downs);
              }
              if (!fs.existsSync(downs+'/'+documento)) {
                  response.pipe(fs.createWriteStream(downs+'/'+documento));
              }
              res.end('downloads/'+documento);
            });
      }
  });
  global.__token = token;
});

module.exports = documents;