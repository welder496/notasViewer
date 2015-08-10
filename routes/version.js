var express = require('express');
var router = express.Router();
var notasRest = require('notasrest');

router.get('/',function(req,res,next){
      var codigo = req.body.codigo;
      console.log(codigo);
      notasRest.getNotaVersao(codigo, function(data){
            res.json(data);
      });
});

module.exports = router;