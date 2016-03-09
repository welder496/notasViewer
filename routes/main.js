var express = require('express');
var main = express.Router({mergeparams:true});
var tags = require('./tags');
var arquivos = require('./arquivos');
var notasRest = require('notasrest');
var stack = require('localstack');
var fs = require('fs');
var netConfig = require('netconfig');
var restler = require('restler');
var update = false;
var info = "";

var connect = function(req,res,next){
      fs.readFile('./userInfo', 'utf8', function(err, data){
            info = JSON.parse(data);
            restler.get("http://"+netConfig.getHost()+":"+netConfig.getPort()+'/notas/notas/first/1',{
                 accessToken: info.token
            })
            .on('complete', function(result){
                 if (result.message === "Token inválido!!") {
                       restler.post("http://"+netConfig.getHost()+":"+netConfig.getPort()+'/notas/usuario/login',{
                             data: {username: info.username, password: info.password}
                       })
                       .on('complete', function(result){
                             fs.writeFileSync('./userInfo',JSON.stringify({"username": result.username, "password": "notasPJEViewer", "token": result.token}),'utf8');
                             update = true;
                       })
                 }
            });
      });
      next();
}

/* GET home page. */
main.get('/',connect, function(req, res) {
      var localReload = update;
      update = false;
      stack.clear(function(data){});
      req.session.stack = [];
      req.session.cookie.expires = new Date(Date.now()+60000);
      req.session.cookie.maxAge = 60000;
      req.session.save(function(err){});
      res.render('index', { title: 'Notas', command: "", reload: localReload});
      if (localReload) {
           localReload = false;
      }
});

main.get('/tags',connect, function(req, res){
      var tags = [];
      notasRest.getTagsMapReduce(function(data){
           if ((data instanceof Array) && data.length != 0) {
                 for (var i=0; i < data.length; i++){
                       var temp = [data[i]._id , data[i].value];
                       tags.push(temp);
                 }
           }
           res.send(tags);
      });
});

module.exports = main;
