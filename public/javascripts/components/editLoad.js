$(document).on('click','button.btn.btn-default.btn-xs',function(event){
      var versao = $('#versao').val();
      var value = $(this).attr('id');
      var index = $(this).attr('name');
      var codigo = $('#editCodigo').val();
      $('div#'+index).remove();
      $('#versao').val(parseInt(versao)+1);
       var count = $('#itemsArquivos').children().length;
      if (count == 0)
            $('#listaArquivos').attr('style','display: none');
      notasAjax.deleteDocument(codigo,value);
 });

