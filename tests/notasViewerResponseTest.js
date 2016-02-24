      var app = require('../app');
      var server = require('../bin/www');
      var http = require("http");

module.exports = {

      setUp: function(callback){
            server = http.createServer(app);
            callback();
      },

      testApplicationOn: function(test){
            httpGet("http://localhost:8090/index", function(response, responseTxt){
                     test.equals(response.statusCode, 200, "statusCode testing");
                     test.ok(responseTxt !== null,"Index page response!!");
                     test.expect(2);
                     test.done();
            });
      }

};

         function httpGet(url, callback) {
            var request = http.get(url);
            request.on("response", function(response) {
               var responseTxt = "";
               response.setEncoding("utf8");

               response.on("data", function(chunk) {
                  responseTxt += chunk;
               });
               response.on("end", function() {
                  callback(response, responseTxt);
               });
            });
         };
