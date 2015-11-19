      $(window).on('resize',function(){
            location.reload();
      });

      $(window).on('load',function(event){
           $("#searchTags").focus();
           rest.get('/index/tags',function(data){
                 WordCloud(document.getElementById('canvas'),
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
      });

      $('#buttonOR').on('click', function(event){
           var searchTags = $("#searchTags").val();
           if (searchTags != "") {
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
           if (searchTags != "") {
                 rest.post('/searchForTags/and',{searchTags: searchTags}, function(page){
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

      $('#buttonTexto').on('click', function(event){
          var searchTags = $("#searchTags").val();
           if (searchTags != "") {
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

      $(".btn.btn-default.btn-xs").on('click',function(event){
          $("#searchTags").tokenfield();
          var search = $("#searchTags").val()+","+$(this).attr('id');
          if (search[0]==',')
              search = search.substring(1,(search.length));
          $('#searchTags').tokenfield('setTokens',search);
      });
