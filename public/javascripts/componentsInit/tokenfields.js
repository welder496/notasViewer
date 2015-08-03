$("#searchTags").tokenfield({
   limit: 10,
   autocomplete: {
     //source:['Funcional','Não-Funcional','Regra de Negócio'],
     delay: 100
   },
   showAutocompleteOnFocus: true,
   createTokensOnBlur: true
 });

$("#insertTags").tokenfield({
	limit: 10,
	autocomplete: {
	  //source:['Funcional','Não-Funcional','Regra de Negócio'],
	  delay: 100
	},
	showAutocompleteOnFocus: true,
	createTokensOnBlur: true
});

$("#editTags").tokenfield({
   limit: 10,
   autocomplete: {
     //source:['Funcional','Não-Funcional','Regra de Negócio'],
     delay: 100
   },
   showAutocompleteOnFocus: true,
   createTokensOnBlur: true
});
