....function documentLoad(res){
  if (res.hasOwnProperty('message')) {
      bootbox.alert(res.message);
  } else {
     window.location=res;
  }
};

function editShow(res){
       if (res.hasOwnProperty('codigo')) {
             $('#editCodigo').val(res.codigo);
             $('#versao').val(res.__v);
             $('#editNota').data("wysihtml5").editor.setValue(res.nota);
             $('#editTags').tokenfield('setTokens',res.tags);
             $('#itemsArquivos').children().remove();
             if (res.arquivos.length != 0){
                    $('#listaArquivos').attr('style','display: none');
                    $.each(res.arquivos, function(index,value){
                          var div = $('<div id='+index+'>').addClass("input-group");
                          var anchor = $('<a onclick=notasAjax.getDocument("'+res._id+'/'+value+'",documentLoad);>'+value+'</a><span> </span>');
                          var buttonbtn = $('<button id='+value+' name="'+index+'"> - </button>').addClass("btn btn-default btn-xs")
                          div.append(anchor);
                          div.append(buttonbtn);
                          $('#itemsArquivos').append(div);
                   });
                   $('#listaArquivos').attr('style','display:block');
             } else {
                   $('#listaArquivos').attr('style','display:none');
             }
       } else {
             var test = JSON.parse(res);
             bootbox.alert(test.message);
             if (test.message=="Nota alterada com sucesso!") {
                   notasAjax.getNotaByCodigo($('#editCodigo').val(),editShow);
             } else
             if (test.message=="A nota está sendo alterada por outro usuário. Tente novamente mais tarde...!!") {
                   window.location = '/searchForCodigo';
             }
       }
 };

$('#editEnviar').on('click', function(event) {

      var codigo=$("#editCodigo").val();

	var formData = new FormData();

	formData.append("codigo",$("#editCodigo").val());
	formData.append("nota",$("#editNota").val());

      $.each($("#editArquivos")[0].files, function(file){
            formData.append("file"+file, this);
      })

       var temp = $("#editTags").val();
       var vector = temp.split(',');
       for (var i=0; i < vector.length; i++){
             formData.append("tags",vector[i].trim());
      }

      formData.append("versao",$("#versao").val());

      $('.js-loading-bar').modal({backdrop: 'static', show: false});

      if ($("#editArquivos")[0].files.length != 0){
            $('.js-loading-bar').modal('show');
            $('.progress-bar').css('width','0%').attr('aria-valuenow','0');
      }

      var test;

   	notasAjax.updateNotaByCodigo(codigo,formData,function(res){

             test = setInterval(function(){
                   var totalSize=0;
                   $.each($("#editArquivos")[0].files, function(file){
                         totalSize+=this.size;
                   });

                   var size=0;
                   $.each($("#editArquivos")[0].files, function(file){
                         notasAjax.getDocumentInfo($("#editCodigo").val(),this.name,function(res){
                                size+=res.size;
                                var percent = Math.floor(((size/totalSize)*100).toFixed(2));
                                $('.js-loading-bar').modal('show');
                                $('.progress-bar').css('width',percent+'%').attr('aria-valuenow',percent);
                         });
                   });

             },1500);

             setTimeout(function(){
                   $('.js-loading-bar').modal('hide');
                   clearInterval(test);
                   test=0;
                   $("#editArquivos").val("");
             },3500);

            editShow(res);

      });

       event.preventDefault();
 });