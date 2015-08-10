var express = require('express');
var router = express.Router();
var notasRest = require('notasrest');

router.get('/',function(req,res,next){
      var codigo = req.query.codigo;
      notasRest.getNotaVersao(codigo, function(data){
            res.json({versao: data});
      });
});

router.post('/',function(req,res,next){
      var codigo = req.body.codigo;
      notasRest.getNotaVersao(codigo, function(data){
            res.json({versao: data});
      });
})

module.exports = router;