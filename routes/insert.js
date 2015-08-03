var express = require('express');
var router = express.Router();
var notasRest = require('notasrest');
var rest = require('restler');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('insert',{show: 'false'});
});

/* POST home page */
router.post('/',function(req, res, next){
   /* Do not change this object */
   var notadata ={'codigo':'','nota':'','tags':'','versao':'',};
   if (req.body) {
      if (req.body.codigo)
          notadata['codigo'] = req.body.codigo;
      if (req.body.nota)
          notadata['nota'] = req.body.nota;
      if (req.body.tags)
          notadata['tags'] = req.body.tags;
      notadata['versao'] = parseInt(0);
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
   notasRest.newNota(notadata,function(data){
     res.render('insert',{show: 'true', message: data.message});

   });
});

module.exports = router;