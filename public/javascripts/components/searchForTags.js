(function($){
      "use strict";

      $(window).on('resize',function(){
          location.reload();
      });

      $('#buttonOR').on('click', function(event){
           var searchTags = $("#searchTags").val();
           if (searchTags !== "") {
                 rest.post('/searchForTags/or',{searchTags: searchTags}, function(page){
                       document.write(page);
                       document.close();
                 });
           } else {
                rest.post('/searchForTags/', function(page){
                       document.write(page);
                       document.close();
                });
           }
           $("searchTags").focus();
      });

      $('#buttonAND').on('click', function(event){
           var searchTags = $("#searchTags").val();
           if (searchTags !== "") {
                 rest.post('/searchForTags/and',{searchTags: searchTags}, function(page){
                       document.write(page);
                       document.close();
                       $("#searchTags").focus();
                 });
           } else {
                 rest.post('/searchForTags/', function(page){
                       document.write(page);
                       document.close();
                       $("#searchTags").focus();
                 });
           }
      });

      $('#buttonTexto').on('click', function(event){
          searchTags = $("#searchTags").val();
          if (searchTags !== "") {
                 rest.post('/searchForTags/texto',{searchTags: searchTags}, function(page){
                       document.write(page);
                       document.close();
                 });
          } else {
                 rest.post('/searchForTags/', function(page){
                       document.write(page);
                       document.close();
                 });
          }
          $("searchTags").focus();
      });

      $("#searchTags").on('tokenfield:createtoken', function(event){
            var existingTokens = $(this).tokenfield('getTokens');
            $.each(existingTokens, function(index, token){
                 if (token.value === event.attrs.value) {
                       event.preventDefault();
                 }
            });
      });

      $(".btn.btn-default.btn-xs").on('click',function(event){
            $("#searchTags").tokenfield();
            var search = $("#searchTags").val()+","+$(this).attr('id');
            if (search[0]==',')
                 search = search.substring(1,(search.length));
            $('#searchTags').tokenfield('setTokens',search);
      });

      $("#tableTags").on('click','a',function(event){
            var codigo = $(this).attr('id');
            var value = $(this).attr('value');
            rest.post('/documents',{codigo: codigo, value: value},function(data){
                 window.open(data,'_blank','top=200,left=200,toolbar=no,resizable=yes,scrollbars=no,width=800,height=600');
            });
      });

      $(document).on('keydown',function(event){
            var searchTags = $("#searchTags").val();
            var key = event.which || event.keyCode;
            if (key == 97) {
                 rest.post('/searchForTags/or', {searchTags: searchTags} ,function(page){
                       document.write(page);
                       document.close();
                       $("#searchTags").focus();
                 });
            }
            if (key == 98) {
                 rest.post('/searchForTags/and', {searchTags: searchTags} ,function(page){
                       document.write(page);
                       document.close();
                       $("#searchTags").focus();
                 });
            }
      });
}(jQuery));
