(function($){
      "use strict";

      $(window).on('load',function(event){
           $("#searchTags").focus();
           rest.get('index/tags',function(data){
                 new WordCloud(document.getElementById('canvas'),
                 {list: data,
                        gridSize: 18,
                        weightFactor: 3,
                        fontFamily: 'Finger Paint, cursive, sans-serif',
                        color: '#777',
                        hover: window.drawBox,
                        click: function(item) {
                                $("#searchTags").tokenfield();
                                var search = $("#searchTags").val()+","+item[0];
                                if (search[0]==',')
                                          search = search.substring(1,(search.length));
                                $('#searchTags').tokenfield('setTokens',search);
                        },
                        backgroundColor: '#F8F8F8'
                 })
           });
           rest.get('/breadcrumb', function(data){
              $('#breadcrumb').empty();
              $('#breadcrumb').append(data);
           });
      });

      $("#searchTags").on('tokenfield:createtoken', function(event){
          var existingTokens = $(this).tokenfield('getTokens');
          $.each(existingTokens, function(index, token){
                if (token.value === event.attrs.value) {
                    event.preventDefault();
                }
          });
      });

      $("#breadcrumb").on('click','a', function(event){
            var id = $(this).attr('id');
            var value = $(this).attr('value');
            if (value !== "E" && value !== "OU") {
                 rest.post('/searchForTags/clean');
                 $("#searchTags").tokenfield();
                 var search = $("#searchTags").val()+","+$(this).attr('value');
                 if (search[0]===',')
                       search = search.substring(1,(search.length));
                 $('#searchTags').tokenfield('setTokens',search);
            }
      });

      $("#tableTags").on('click','a',function(event){
            var codigo = $(this).attr('codigo');
            var value = $(this).attr('value');
            rest.post('/documents',{codigo: codigo, value: value},function(data){
                   document.write(data);
                   document.close();
//                 rest.get(data, function(idata){
//                       window.open(idata,'_blank','top=200,left=200,toolbar=no,resizable=yes,scrollbars=no,width=800,height=600');
//                 });
            });
      });

      $(".btn.btn-default.btn-xs").on('click',function(event){
          $("#searchTags").tokenfield();
          var search = $("#searchTags").val()+","+$(this).attr('id');
          if (search[0]===',')
              search = search.substring(1,(search.length));
          $('#searchTags').tokenfield('setTokens',search);
      });
}(jQuery));

