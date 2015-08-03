$("#insertCodigo").on('keyup',function(event){
   var codigo = $("#insertCodigo").val().replace(/[a-zA-Z0-9\-]/g,'');
   $("#insertCodigo").val(codigo);
});