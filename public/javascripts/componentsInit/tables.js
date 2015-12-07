$(document).ready( function() {

   $('#tableCodigo').DataTable({
        responsive: true,
	paging: true,
	info: false,
         ordering: false,
	searching: false,
	bLengthChange: false,
	lengthMenu: [4],
	oLanguage : {
		oPaginate:{
			sPrevious:"Página Anterior",
			sNext:"Próxima Página",
			sFirst:"Primeira Página",
			sLast:"Última Página"
		},
		sEmptyTable: "A tabela está vazia!!"
	},
	aoColumns: [
	     {sTitle: "Código",sWidth: "10%"},
               {sTitle: "Nota",sWidth: "90%"}
       ]
   });


   $('#tableTags').DataTable({
        responsive: true,
	paging: true,
	info: false,
	searching: false,
	bLengthChange: false,
         ordering: false,
	lengthMenu: [4],
 	oLanguage : {
		oPaginate:{
			sPrevious:"Página Anterior",
			sNext:"Próxima Página",
			sFirst:"Primeira Página",
			sLast:"Última Página"
		},
		sEmptyTable: "A tabela está vazia!!"
	},
	aoColumns: [
	      {sTitle: "Código", sWidth: "10%"},
              {sTitle: "Nota", sWidth: "90%"}
        ]
   });


   $('#tableNota').DataTable({
         responsive: true,
        	paging: true,
	info: false,
	searching: false,
         ordering: false,
	bLengthChange: false,
	lengthMenu: [4],
	oLanguage : {
		oPaginate:{
			sPrevious:"Página Anterior",
			sNext:"Próxima Página",
			sFirst:"Primeira Página",
			sLast:"Última Página"
		},
		sEmptyTable: "A tabela está vazia!!"
	},
	aoColumns: [
	       {sTitle: "Código", sWidth: "10%"},
                {sTitle: "Nota", sWidth: "90%"}
        ]
   });
});
