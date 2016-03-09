var express = require('express');
var documents = express.Router({mergeparams: true});
var notasRest = require('notasrest');
var request = require('request');
var fs = require('fs');
var netconfig = require('netconfig');
var downs = __base+'/downloads';

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
            var r = request.get("http://"+netconfig.getHost()+":"+netconfig.getPort()+"/arquivos/"+id+"/"+documento).auth(null,null,true,JSON.parse(fs.readFileSync('./userInfo','utf8')).token);
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
});

module.exports = documents;