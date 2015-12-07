var arquivos=function(codigo,str){
      if (typeof(str) != "undefined") {
         var links = "";
         for (var i=0; i < str.length; i++){
            var loc = str[i].split(',');
            for (var j=0; j < loc.length; j++)
               links+='<div><a codigo="'+codigo+'" value="'+loc[j]+'">'+loc[j]+'</a></div>';
         }
         if (links!="")
            links="<div><strong><em>Arquivos:</em></strong></div>"+links;
         return links;
      } else {
         return "";
      }
};

module.exports = arquivos;