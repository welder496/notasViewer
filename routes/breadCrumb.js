var express = require('express');
var breadcrumb = express.Router({mergeparams: true});

breadcrumb.get('/',function(req, res){
    var stack = "";
    if (req.session.stack instanceof Array) {
      var temp = req.session.stack;
      var copy = temp.toString().split(',');
      var total = copy.length;
      copy.forEach(function(data, index){
            if (data !== "" && data !== "undefined"){
                if (data === '$and' || data === '$or') {
                     data = data.substring(1);
                     if (data === 'or') data = 'OU';
                     if (data === 'and') data = 'E';
                     stack = '<li><a id="'+(total - index)+'" value="'+data+'" href="/searchForTags/subsearch/'+(total-index)+'"><strong>'+data+'</strong></a></li>' + stack;
                } else {
                     stack = '<li><a id="'+(total - index)+'" value="'+data+'" href="#">'+data+'</a></li>' + stack;
                }
            }
      });
    }
    if (stack !== "")
         res.send('<li class="active">Tags pesquisadas:</li>'+stack);
});

module.exports = breadcrumb;

