var rest = function($){

   var put = function(url, data, callback, type){

         if ($.isFunction(data) ){
               type = type || callback,
               callback = data,
               data = {}
         }

         return $.ajax({
            url: url,
            type: 'PUT',
            success: callback,
            data: data,
            contentType: type
         });
   }

   var del =function(url, data, callback, type){

         if ($.isFunction(data) ){
               type = type || callback,
               callback = data,
               data = {}
         }

         return $.ajax({
            url: url,
            type: 'DELETE',
            success: callback,
            data: data,
            contentType: type
         });
   }

   var post = function(url, data, callback, type){

         if ($.isFunction(data) ){
               type = type || callback,
               callback = data,
               data = {}
         }

         return $.ajax({
            url: url,
            type: 'POST',
            success: callback,
            data: data,
            contentType: type
         });
   }

   var get = function(url, data, callback, type){

         if ( $.isFunction(data) ){
               type = type || callback,
               callback = data,
               data = {}
         }

         return $.ajax({
            url: url,
            type: 'GET',
            success: callback,
            data: data,
            contentType: type
         });
   }

   return {
      put:put,
      del:del,
      post:post,
      get:get,
   };

}(jQuery);