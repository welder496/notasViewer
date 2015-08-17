$(document).ready( function() {

   $('#tableCodigo').dataTable({
	"paging": true,
	"info": false,
          "ordering": false,
	"searching": false,
	"bLengthChange": false,
	"lengthMenu": [5],
	"oLanguage" : {
		"oPaginate":{
			"sPrevious":"Página Anterior",
			"sNext":"Próxima Página",
			"sFirst":"Primeira Página",
			"sLast":"Última Página"
		},
		"sEmptyTable": "A tabela está vazia!!"
	},
	"aoColumns": [
	     {"sTitle": "Código","sWidth": "10%"},
               {"sTitle": "Nota","sWidth": "90%"}
       ]
   });


   $('#tableTags').dataTable({
	"paging": true,
	"info": false,
	"searching": false,
	"bLengthChange": false,
         "ordering": false,
	"lengthMenu": [5],
 	"oLanguage" : {
		"oPaginate":{
			"sPrevious":"Página Anterior",
			"sNext":"Próxima Página",
			"sFirst":"Primeira Página",
			"sLast":"Última Página"
		},
		"sEmptyTable": "A tabela está vazia!!"
	},
	"aoColumns": [
	        {"sTitle": "Código", "sWidth": "10%"},
              {"sTitle": "Nota", "sWidth": "90%"}
        ]
   });


   $('#tableNota').dataTable({
	"paging": true,
	"info": false,
	"searching": false,
       "ordering": false,
	"bLengthChange": false,
	"lengthMenu": [5],
	"oLanguage" : {
		"oPaginate":{
			"sPrevious":"Página Anterior",
			"sNext":"Próxima Página",
			"sFirst":"Primeira Página",
			"sLast":"Última Página"
		},
		"sEmptyTable": "A tabela está vazia!!"
	},
	"aoColumns": [
	          {"sTitle": "Código", "sWidth": "10%"},
                {"sTitle": "Nota", "sWidth": "90%"}
        ]
   });
});
