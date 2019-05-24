$(function(){
    // CARGAR LAS SECCIONES DE LA PAGINA
    var title = "Pagina de Prueba";
	var id_record = 0;
    $(this).attr("title", "AyR - " + title);
	// TITULO DEL NAVEGADOR
    $(this).attr("title", "AyR - " + title);
    // TITULO DE LA PAGINA
    $("#title-screen").html(title);
    // RUTA DE LA PAGINA
	$("#breadcrumb-item-screen").html(title);
    $("#card-title").html("Tabla de " + title);
});