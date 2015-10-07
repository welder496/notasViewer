var express = require('express');
var router = express.Router();
var notasRest = require('notasrest');
var rest = require('restler');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Notas' });
});

router.get('/tags', function(req, res){
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

router.post('/', function(req, res, next){
   var button = req.body.choosenButton;
   var searchTags = req.body.searchTags;
   if (searchTags != "") {
          searchTags = encodeURIComponent(req.body.searchTags);
   }
   rest.post("http://"+req.header('host')+"/searchForTags",
      {
         multipart: true,
         data: {choosenButton: button, searchTags: searchTags}
      })
   .on('success', function(data,response){
        res.send(data);
   });
});

module.exports = router;
