var netConfig = require('netconfig');
var restler = require('restler');
var fs = require('fs');
var info = "";
var localtoken = "";

module.exports = {
      connect : function(token){
            fs.readFile('./userInfo', 'utf8', function(err, data){
                 info = JSON.parse(data);
                 restler.get("http://"+netConfig.getHost()+":"+netConfig.getPort()+'/notas/notas/first/1',{
                       accessToken: token
                 })
                 .on('complete', function(result){
                       if (result.message === "Token inválido!!") {
                             restler.post("http://"+netConfig.getHost()+":"+netConfig.getPort()+'/notas/usuario/login',{
                                  data: {username: info.username, password: info.password}
                             })
                             .on('complete', function(result){
                                  localtoken = result.token;
                             });
                       } else {
                          localtoken = global.__token;
                       }
                 });
            });
            return localtoken;
      },

};