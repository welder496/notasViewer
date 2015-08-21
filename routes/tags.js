var tags=function(str){
      if (typeof(str) != "undefined") {
         var buttons = "";
         for (var i=0; i < str.length; i++) {
            loc = str[i].split(',');
            for (var j=0; j < loc.length; j++) {
               buttons+='<button id="'+loc[j]+'" class="btn btn-default btn-xs"><strong>'+loc[j]+'</strong></button><span>  </span>';
            }
         }
         return buttons;
      } else
         return "";
};

module.exports = tags;