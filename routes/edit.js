var express = require('express');
var router = express.Router();
var notasRest = require('notasrest');

/* GET home page. */
router.get('/', function(req, res, next) {
   var codigo = req.body.codigo;
   notasRest.getNotaByCodigo(codigo, function(data){
      var versao = data.versao;
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
   if (comando == 'edit') {
      notasRest.getNotaByCodigo(codigo, function(data){
         if (data.hasOwnProperty('codigo')){
              versao = parseInt(data.versao);
              nota = data.nota;
              tags = data.tags;
              arquivos = data.arquivos;
         }
         if (data.hasOwnProperty('message')){
             message = data.message
         }
         res.render('edit', {codigo: codigo, nota: nota, tags: tags, arquivos: arquivos, versao: versao, message: message, show:'false'});
      });
   } else {
    if (comando == 'post'){
       var notadata ={'codigo':'','nota':'','tags':'','versao':'',};
       if (req.body) {
          if (req.body.codigo)
              notadata['codigo'] = req.body.codigo;
          if (req.body.nota)
              notadata['nota'] = req.body.nota;
          if (req.body.tags)
              notadata['tags'] = req.body.tags;
          notadata['versao'] = parseInt(req.body.versao);
       }
       var files = req.files;
       if (files.file) {
          if (files.file.length > 1){
            files.file.forEach(function(file,i){
                notadata['file'+i]=rest.file(file.path,null,file.size,null,file.mimetype);
            });
          } else {
            var file = req.files.file;
            notadata['file0']=rest.file(file.path,null,file.size,null,file.mimetype);
          }
       }
       notasRest.updateNotaByCodigo(codigo,notadata, function(data){
            if (data.hasOwnProperty('message')){
                message = data.message;
            }
            notasRest.getNotaByCodigo(codigo, function(data){
                if (data.hasOwnProperty('codigo')){
                    versao = parseInt(data.versao);
                    nota = data.nota;
                    tags = data.tags;
                    arquivos = data.arquivos;
                }
                if (data.hasOwnProperty('message')){
                    message = data.message;
                }
                res.render('edit',{codigo: codigo, nota: nota, tags: tags, arquivos: arquivos, versao: versao, message: message, show:'true'});
            })
       });
    }
   }
});

module.exports = router;