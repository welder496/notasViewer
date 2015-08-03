$(document).ready( function() {

   $('#tableCodigo').dataTable({
	"paging": true,
	"info": false,
      "ordering": false,
	"searching": false,
	"bLengthChange": false,
	"lengthMenu": [7],
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
               {"sTitle": "Nota", "sWidth": "90%"},
	         {"mData":null,"bSortable":false,"mRender":
                        function(data, type, full) {
                           return '<form id="'+full[0]+'" action="edit" method="post">'+
                           '<input type="hidden" name="codigo" value="'+full[0]+'"/>'+
                           '<input type="hidden" name="versao" value="'+full[4]+'"/>'+
                           '<input type="hidden" name="comando" value="edit"/>'+
                           '<button class="btn btn-default" onclick=document.getElementById("'+full[0]+'").submit();>'+
                           '<span class="glyphicon glyphicon-pencil"></span></button></form>';
                        }
	         },
       		{"mData":null,"bSortable":false,"mRender":
                       function(data, type, full) {
                            return '<form id="'+full[0]+'" action="searchForCodigo" method="post">'+
                            '<input type="hidden" name="codigo" value="'+full[0]+'"/>'+
                            '<input type="hidden" name="versao" value="'+full[4]+'"/>'+
                            '<input type="hidden" name="comando" value="delete" />'+
                            '<button class="btn btn-default" onclick=document.getElementById("'+full[0]+'").submit();>'+
                            '<span class="glyphicon glyphicon-trash"></span></button></form>';
                       }
	          }
        ]
   });


   $('#tableTags').dataTable({
	"paging": true,
	"info": false,
	"searching": false,
	"bLengthChange": false,
      "ordering": false,
	"lengthMenu": [7],
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
              {"sTitle": "Nota", "sWidth": "90%"},
	        {"mData":null,"bSortable":false,"mRender":
                     function(data, type, full) {
                         return '<form id="'+full[0]+'"action="edit" method="post">'+
                         '<input type="hidden" name="codigo" value="'+full[0]+'"/>'+
                         '<input type="hidden" name="versao" value="'+full[4]+'"/>'+
                         '<input type="hidden" name="comando" value="edit"/>'+
                         '<a class="btn btn-default" onclick=document.getElementById("'+full[0]+'").submit();>'+
                         '<span class="glyphicon glyphicon-pencil"></span></a></form>';
                     }
               },
      		 {"mData":null,"bSortable":false,"mRender":
                     function(data, type, full) {
                         return '<form id="'+full[0]+'" action="searchForTags" method="post">'+
                         '<input type="hidden" name="codigo" value="'+full[0]+'"/>'+
                         '<input type="hidden" name="versao" value="'+full[4]+'"/>'+
                         '<input type="hidden" name="comando" value="delete" />'+
                         '<button class="btn btn-default" onclick=document.getElementById("'+full[0]+'").submit();>'+
                         '<span class="glyphicon glyphicon-trash"></span></button></form>';
                     }
	        }
        ]
   });


   $('#tableNota').dataTable({
	"paging": true,
	"info": false,
	"searching": false,
       "ordering": false,
	"bLengthChange": false,
	"lengthMenu": [7],
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
                {"sTitle": "Nota", "sWidth": "90%"},
	         {"mData":null,"bSortable":false,"mRender":
                     function(data, type, full) {
                         return '<form id="'+full[0]+'"action="edit" method="post">'+
                         '<input type="hidden" name="codigo" value="'+full[0]+'"/>'+
                         '<input type="hidden" name="versao" value="'+full[4]+'"/>'+
                         '<input type="hidden" name="comando" value="edit"/>'+
                         '<a class="btn btn-default" onclick=document.getElementById("'+full[0]+'").submit();>'+
                         '<span class="glyphicon glyphicon-pencil"></span></a></form>';
                      }
                },
      		  {"mData":null,"bSortable":false,"mRender":
                     function(data, type, full) {
                         return '<form id="'+full[0]+'" action="searchForNota" method="post">'+
                         '<input type="hidden" name="codigo" value="'+full[0]+'"/>'+
                         '<input type="hidden" name="versao" value="'+full[4]+'"/>'+
                         '<input type="hidden" name="comando" value="delete" />'+
                         '<button class="btn btn-default" onclick=document.getElementById("'+full[0]+'").submit();>'+
                         '<span class="glyphicon glyphicon-trash"></span></button></form>';
                     }
	         }
        ]
   });
});
