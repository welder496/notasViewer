      var app = require('../app');
      var server = require('../bin/www');
      var http = require("http");
      var rest = require('restler');
      var host = 'localhost';
      var port = '8090';


module.exports = {

      setUp: function(callback){
            server = http.createServer(app);
            callback();
      },

      tearDown: function(callback){
            callback();
      },

      cleanSession: function(test){
         var command = rest.post("http://"+host+":"+port+"/searchForTags/clean")
           .on('success', function(data, response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.equal(typeof(data),"string","Comando foi executado!!");
                 test.done();
           })
           .on('error', function(err, response){
                 test.ok(false,"Erro ao limpar sessão!!");
                 test.done();
           });
           test.throws(command);
           test.expect(3);
      },




};
