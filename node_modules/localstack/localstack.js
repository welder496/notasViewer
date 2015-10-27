var pilha = [];
var backup = [];

module.exports = {

      clear: function(callback){
          pilha = [];
          backup = [];
          callback({message: "Pilha limpa com sucesso!!"});
      },

      push: function(value,callback){
          pilha.unshift(value);
          callback({message: "Valor empilhado com sucesso!!"});
      },

      isEmpty: function(){
          return (pilha.length == 0);
      },

      reverse: function(){
          return pilha.reverse();
      },

      pop: function(callback){
          if (pilha.length != 0) {
            var value = pilha.shift();
            callback(value);
          } else {
            callback({message: "Pilha vazia!!"});
          }
      },

      copy: function(){
            for (var i=pilha.length; i >= 0; i--) {
                 if (pilha[i] != "" && typeof(pilha[i]) != "undefined") {
                       backup.unshift(pilha[i]);
                 }
            }
            return backup;
      },

      pushCopy: function(){
            pilha = [];
            for (var i=backup.length; i >=0; i--){
                 if (backup[i] != "" && typeof(backup[i]) != "undefined") {
                       pilha.unshift(backup[i]);
                 }
            }
      },

      stack: function(callback){
            callback(pilha);
      }

};