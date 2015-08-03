$("#insertTags").on('keyup',function(event){

   var insertTags = $(this).val().replace(/[^a-zA-Z0-9\-\/ ]+/g,'');
   $(this).val(insertTags.toUpperCase());

});