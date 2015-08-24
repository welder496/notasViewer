var express = require('express');
var router = express.Router();
var rest = require('restler');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Notas' });
});

router.post('/', function(req, res, next){
   var button = req.body.choosenButton;
   var searchTags = req.body.searchTags;
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
