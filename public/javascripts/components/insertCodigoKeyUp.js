$("#insertCodigo").on('keyup',function(event){

   var codigo = $(this).val().replace(/[^a-zA-Z0-9\-]+/g,'');
   $(this).val(codigo.toUpperCase());

});