var express = require('express');
var help = express.Router({mergeparams:true});

help.get('/', function(req, res){
      res.render('help');
});

help.post('/', function(req,res){
      //not either.
});

module.exports = help;