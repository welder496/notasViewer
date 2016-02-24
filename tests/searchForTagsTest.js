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

      /*Retorna 20 registros */
      EmptySearchForTagsOr: function(test){
           var commands = {button: 'or', searchTags: ''};
           var command = rest.post("http://"+host+":"+port+"/searchForTags/",{
                 data : commands
           })
           .on('success', function(data, response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.ok(data !== null,"Consulta com operador OU");
                 test.done();
           })
           .on('error', function(err, response){
                 test.ok(false,"Não foi possível fazer a consulta com operador OU!!!");
                 test.done();
           });
           test.throws(command);
           test.expect(3);
      },

      /*Retorna 20 registros */
      EmptySearchForTagsAnd: function(test){
           var commands = {button: 'and', searchTags: ''};
           var command = rest.post("http://"+host+":"+port+"/searchForTags/",{
                 data : commands
           })
           .on('success', function(data, response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.ok(data !== null,"Consulta com operador AND");
                 test.done();
           })
           .on('error', function(err, response){
                 test.ok(false,"Não foi possível fazer a consulta com operador AND!!!");
                 test.done();
           });
           test.throws(command);
           test.expect(3);
      },

      /*Retorna 20 registros */
      EmptySearchForTagsTexto: function(test){
           var commands = {button: 'texto', searchTags: ''};
           var command = rest.post("http://"+host+":"+port+"/searchForTags/",{
                 data : commands
           })
           .on('success', function(data, response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.ok(data !== null,"Consulta com TEXTO");
                 test.done();
           })
           .on('error', function(err, response){
                 test.ok(false,"Não foi possível fazer a consulta com TEXTO!!!");
                 test.done();
           });
           test.throws(command);
           test.expect(3);
      },

      /*Retorna 20 registros */
      SearchForTagsWithIncorrectCommand : function(test){
           var commands = {button: '@@@', searchTags: ''};
           var command = rest.post("http://"+host+":"+port+"/searchForTags/",{
                 data : commands
           })
           .on('success', function(data, response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.ok(data !== null,"Consulta com comando inexistente ou incorreto");
                 test.done();
           })
           .on('error', function(err, response){
                 test.ok(false,"Não foi possível fazer a consulta com comando incorreto!!");
                 test.done();
           });
           test.throws(command);
           test.expect(3);
      },

      SearchForTagsOrWithIncorrectChars: function(test){
           var commands = {button: 'or', searchTags: 'Perfil: Procurador MP-Gestor (estagiário)'};
           var command = rest.post("http://"+host+":"+port+"/searchForTags/",{
                 data : commands
           })
           .on('success', function(data, response){
                 test.equal(response.statusCode,200,"Status de resposta!!");
                 test.ok(data !== null,"Consulta com tag que contém chave ou colchete");
                 test.done();
           })
           .on('error', function(err, response){
                 test.ok(false,"Não foi possível fazer a consulta com comando incorreto!!");
                 test.done();
           });
           test.throws(command);
           test.expect(3);
      }

};
