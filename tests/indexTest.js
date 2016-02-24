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
      }

};
