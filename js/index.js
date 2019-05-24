if(navigator.serviceWorker){
    navigator.serviceWorker.register('sw.js');

}

$("#document").ready(function(){

    var id_father_api = [];
    //info de session
    var id_module = 1;
    var id_record = 0,
        id_record_product = 0,
        id_record_expense = 0,
        id_record_detail = 0,
        id_tour = 0,
        id_tour2 = 0,
        id_father = 0,
        master_user = 0,
        user_company = 0,
        id_father_user = 0,
        user = 0,
        id_record_deta = 0,
        id_reason = 0,
        id_client = 0,
        id_location = 0,
        id_type = 0,
        date = "",
        inputFileImage = null,
        file = null,
        name_file = "",
        table = "expenses",
        star_value = 0,
        lat = 0,
        lng = 0,
        visit_close = 0,
        id_father2 = 0,
        url_api = user_data.url_api;


  //Firma
  var canvas2 = document.getElementById("canvas_firm2");
  var signaturePad2 = new SignaturePad(canvas2);

    coreBeanar_io.GET("api/general_info",
  	    (data)=>{
  	        id_father_api = data;
            id_father_user = id_father_api.id_father_user;
            master_user = id_father_api.master;
            user_company = id_father_api.id_company_user;
            user = id_father_api.id_user;
            // console.log(id_father_api);
            $.getJSON(url_api + 'tours1/visitors/' + user, function(json, textStatus) {
                json = json.data;
                // console.log(json);
                for(var i=0;i<json.length;i++){
                    $("#id_tour").append('<option value="'+json[i]["id"]+'">'+json[i]["name"]+'</option>');
                }
            });
  	    },
  	    (error)=>{
  	        console.log("Error al traer los datos");
  	        return;
  	    });


    cTitleScreen = "Giras";
    //$("#master_key").hide();

    $(this).attr("title", "Beanario - " + cTitleScreen);

    $("#oculta_ventana_pass").hide();
	// TITULO DEL NAVEGADOR
    $(this).attr("title", "Beanario - " + cTitleScreen);
    // TITULO DE LA PAGINA
    $("#title-screen").html(cTitleScreen);
    // RUTA DE LA PAGINA
	$("#breadcrumb-item-screen").html(cTitleScreen);

    $("#card-title").html("Tabla de " + cTitleScreen);

    $("#file-picture").dropify();

    $("#date2").change(function(event) {
    	if($(this).val() !== ""){
    		$(this).parent().addClass('focused');
    	}
    });


    $('#deta-table').DataTable({
  		dom: 'Bfrtip',
  		ajax:{
  			url: url_api + "products_detail/get_dt",
  			data:function(d){
          d.id_father = id_father
  			}
  		},
  		columns: [

        {"data" : "name"},
        {"data" : "total"},
  			{"data" : "buttons"}
  		],
  		buttons: [
  			//'copy', 'csv', 'excel', 'pdf'
  		],
  		language:{
  			url: "js/language-data-table.json"
  		}
  	});

    $('#visits-table').DataTable({
  		dom: 'Bfrtip',
  		ajax:{
  			url: url_api + "visits/get_dt",
  			data:function(d){
  				// d.id_father = id_father,
          d.id_tour1 = id_tour
  			}
  		},
  		columns: [

        {"data" : "client"},
        {"data" : "date"},
  			{"data" : "buttons"}
  		],
  		buttons: [
  			//'copy', 'csv', 'excel', 'pdf'
  		],
  		language:{
  			url: "js/language-data-table.json"
  		}
  	});

    $('#expenses-table').DataTable({
  		dom: 'Bfrtip',
      ajax:{
  			url: url_api + "expenses/get_dt",
  			data:function(d){
          d.id_tour2 = id_tour2
  			}
  		},
  		columns: [

        {"data" : "name"},
        {"data" : "amount1"},
  			{"data" : "buttons"}
  		],
  		buttons: [
  			//'copy', 'csv', 'excel', 'pdf'
  		],
  		language:{
  			url: "js/language-data-table.json"
  		}
  	});

    var visits_table = $('#visits-table').DataTable();
    var deta_table = $('#deta-table').DataTable();
    let expenses_table = $('#expenses-table').DataTable();

    $(".date-picker").datepicker({
      autoclose:true,
      format:"yyyy-mm-dd",
      language:'es',
      calendarWeeks: true,
      todayBtn:true,
      todayHighlight:true
    });

    $('.numeric').on('input', function () { 
      this.value = this.value.replace(/[^0-9]/g,'');
    });

    $("#id_tour").change(function(event) {
        event.preventDefault();
        id_tour = $(this).val();
        visits_table.ajax.reload();
    });

    $("#btn-clear-fields").click(function() {
        clear_fields();
    });

    $("#btn-new-docto").click(function(e) {
      e.preventDefault();
      if(id_father == 0){
        alert_warning('Atención', 'Debe Seleccionar un Grupo!');
        $("#id_father").focus();
        return;
      }
      if(id_company == 0){
        alert_warning('Atención', 'Debe Seleccionar una Empresa!');
        $("#id_company").focus();
        return;
      }
      clear_fields();
      if(access_control[0]['optcreate']==0){
          alert_warning('Atención', 'Opción deshabilitada para su perfil');
          return;
      }

        clear_fields();
        id_record = 0;
        detail_users.ajax.reload()
        $("#users-modal").modal('show');
    });

//cud gastos
$("body").on("click", ".btn-add-expense", function (e) {
  e.preventDefault();
  id_record_expense = 0;
  resetControls();
  let d = new Date();
  let month = d.getMonth()+1;
  let day = d.getDate();
  let output = d.getFullYear() + '-' +
  ((''+month).length<2 ? '0' : '') + month + '-' +
  ((''+day).length<2 ? '0' : '') + day;

  $("#date2").parent().addClass("focused");

  $("#date2").val(output);

  id_father = this.getAttribute('data-id_father');
  user = id_father_api.id_user;
  id_tour = this.getAttribute('data-id_tour1');
  id_tour2 = this.getAttribute('data-id_tour2');

  // $("#path1 *").remove();
  // $("#path1").append('<h4 class="card-title"></h4>');
  // $("#path1").append('<input type="file" accept="image/*" id="file-picture" class="dropify"/>');
  // $("#path1").append('</div>');

  $("#file-picture").change(function(e){
    inputFileImage = document.getElementById("file-picture");
    file = inputFileImage.files[0];
    name_file = file.name;
    // console.log(inputFileImage);
    // console.log(file);
    // console.log(name_file);
    // subirArchivos(file, "file_path", id_record);
  });
  $("#id_reason1").empty().append('<option value="0">-Seleccione-</option>');
  $.getJSON(url_api + 'expenses_reasons/get_sl?id_father=' + id_father + "&type_for=9", function(json, textStatus) {
      json = json.data;
      for(var i=0;i<json.length;i++){
          $("#id_reason1").append('<option value="'+json[i]["id"]+'">'+json[i]["name"]+'</option>');
      }
  });
  $("#expenses-modal").modal("show");
});

$("body").on("click", ".btn-view-expense", function (e) {
  e.preventDefault();
  id_tour2 = this.getAttribute('data-id_tour2');
  expenses_table.ajax.reload();
  $("#expenses_view_modal").modal("show");
});

$("body").on("click", ".btn-update-record", function(event){
    event.preventDefault();
    var array_id = [];
    array_id = this.id.split("-");
    id_record_expense = array_id[1];
    // alert(id_record_expense);
    $("#name").val(this.getAttribute("data-name"));
    $("#amount1").val(this.getAttribute("data-amount1"));
    $("#description1").val(this.getAttribute("data-description"));
    $("#date2").val(this.getAttribute("data-date"));
    $("#id_employee").val(this.getAttribute("data-id_employee"));
    let id_reason1 = this.getAttribute("data-id_reason");
    id_father = this.getAttribute('data-id_father');
    $(".form-group").addClass('focused');

    $.getJSON('api/file_upload.php?option=8&id_record=' + id_record_expense + '&table=' + table,
    function(data){
      // console.log(data);
      $("#path1 *").remove();
      $("#path1").append('<h4 class="card-title"></h4>');
      $("#path1").append('<input type="file" accept="image/*" id="file-picture" class="dropify"/>');
      $("#path1").append('</div>');


      $("#file-picture").change(function(e){
        var inputFileImage = document.getElementById("file-picture");
        var file = inputFileImage.files[0];
        var name_file = file.name;
        // console.log(inputFileImage);
        // console.log(file);
        // console.log(name_file);
        // subirArchivos(file, "file_path", id_record);
      });

      $("#file-picture").attr("disabled", false);
      let img = "/rating_app_backend/" + data[0]['file_path'];
      $("#file-picture").attr({
        "data-default-file" : img
      });


      var drfile_picture_front = $('#file-picture').dropify();

      drfile_picture_front.on('dropify.afterClear', function(event, element){
        borrarImagen("file_path", id_record_expense);
      });

    });

    $("#id_reason1").empty().append('<option value="0">-Seleccione-</option>');
    $.getJSON(url_api + 'expenses_reasons/get_sl?id_father=' + id_father + "&type_for=9", function(json, textStatus) {
        json = json.data;
        for(var i=0;i<json.length;i++){
            $("#id_reason1").append('<option value="'+json[i]["id"]+'">'+json[i]["name"]+'</option>');
        }
        $("#id_reason1").val(id_reason1);
    });

    $("#expenses-modal").modal("show");
});

$("body").on("click", ".btn-delete-record", function(event){
    event.preventDefault();
    var array_id = [];
    array_id = this.id.split("-");
    id_record_expense = array_id[1];
    var name_delete = this.getAttribute("data-name");
    var message = "Seguro(a) que desea ELIMINAR el registro<br>" + name_delete;
    msg_question('Confirmar',message,delete_record = () => {
      $.getJSON('api/file_upload.php?option=8&id_record=' + id_record_expense + '&table=' + table,
      function(data){
        borrarImagen2("file_path", id_record_expense);
      });
      coreBeanar_io.DELETE(url_api + "expenses/" + id_record_expense,
        (data)=>{
          coreBeanar_io.msg.info("Exito", data.message);
          expenses_table.ajax.reload();
          id_record_expense = 0;
      },
      (err)=>{
        coreBeanar_io.msg.error("Error", err.message);
       });
    });
});

//crud productos
$("body").on("click", ".btn-add-products", function (e) {
  e.preventDefault();
  if(this.getAttribute('data-confirm') == 1){
    alert_error("Error", "No es posible agregar Productos a visitas ya Firmadas");
    return;
  }
  id_record_product = 0;
  let array_id = this.id.split("-");
  id_record = array_id[1];

  if (id_record == ""){
    id_record = 0;
  } else {
    id_record = id_record;
  }

  let d = new Date();
  let month = d.getMonth()+1;
  let day = d.getDate();
  let hour = d.getHours();
  let min = d.getMinutes();
  let sec = d.getSeconds();
  if (min <= 9)
  min = "0" + min;
  if (sec <= 9)
  sec = "0" + sec;
  let output = d.getFullYear() + '-' +
  ((''+month).length<2 ? '0' : '') + month + '-' +
  ((''+day).length<2 ? '0' : '') + day + " " + hour + ":" + min + ":" + sec;

  date = output;
  id_father2 = this.getAttribute('data-id_father');
  user = id_father_api.id_user;
  id_tour = this.getAttribute('data-id_tour1');
  id_tour2 = this.getAttribute('data-id_tour2');
  id_reason = this.getAttribute('data-id_reason');
  id_client = this.getAttribute('data-id_client');
  id_location = this.getAttribute('data-id_location');
  id_type = this.getAttribute('data-id_type');
  let description = this.getAttribute('data-description');

  $("#description").parent().addClass("focused");
  $("#description").val(description);

  //agregar Visita
  var my_data = {
    id_father: id_father2,
    id_reason: id_reason,
    id_client: id_client,
    id_visitor: user,
    id_location: id_location,
    id_tour1: id_tour,
    id_tour2: id_tour2,
    type: id_type,
    date: date
  }
  // alert(id_record);
  if(id_record == 0){
      coreBeanar_io.POST(url_api + "visits/", my_data,
          (data)=>{
              // coreBeanar_io.msg.info("Exito", data.message);
              id_record = 0;
              id_father = data.id_record;
              deta_table.ajax.reload();
              visits_table.ajax.reload();
              $("#add_products_modal").modal("show");
          },
          (err)=>{
              coreBeanar_io.msg.error("Error", err.message);
          });
    } else {

      coreBeanar_io.PUT(url_api + "visits/" + id_record, my_data,
        (data)=>{
            id_father = id_record;
            visits_table.ajax.reload();
            deta_table.ajax.reload();
            $("#add_products_modal").modal("show");
        },
        (err)=>{
            coreAyR.msg.error("Error", err.message);
        });

    }

  $("#id_product").select2({
    dropdownParent: $("#product_father"),
    width: "100%"
  });

  $("#id_product").empty().append('<option value="0">-Seleccione-</option>');
  $.getJSON(url_api + 'products/get_sl?id_company=' + id_father2, function(json, textStatus) {
      json = json.data;
      for(var i=0;i<json.length;i++){
          $("#id_product").append('<option value="'+json[i]["id"]+'">'+json[i]["name"]+'</option>');
      }
  });

});

$("#btn-add-product").click(function(e){
  e.preventDefault();
  let id_product = $("#id_product").val(),
      total = $("#total").val();
  let my_data = {
                    id_father: id_father,
                    id_product: id_product,
                    total: total
                  }
                  // console.log(my_data);

  if(id_record_product == 0){
    coreBeanar_io.POST(url_api + "products_detail/", my_data,
      (data)=>{
        coreBeanar_io.msg.info("Exito", data.message);
        id_record_product = 0;
        resetControls();
        deta_table.ajax.reload();
      },
      (err)=>{
        coreBeanar_io.msg.error("Error", err.message);
      });
  }
  else{
    coreBeanar_io.PUT(url_api + "products_detail/" + id_record_product, my_data,
      (data)=>{
          coreBeanar_io.msg.info("Exito", data.message);
          id_record_product = 0;
          resetControls();
          deta_table.ajax.reload();
      },
      (err)=>{
          coreBeanar_io.msg.error("Error", err.message);
      });
  }
});


$("body").on("click", ".btn-update-product-record", function (e) {
  e.preventDefault();
  let array_id = this.id.split("-");
  id_record_product = array_id[1];
  id_product = this.getAttribute("data-id_product");
  let total = this.getAttribute("data-total");

  $("#id_product").val(id_product);
  $("#total").val(total);
  $("#total").parent().addClass("focused");
  $("#id_product").select2({
    dropdownParent: $("#product_father"),
    width: "100%"
  });

});

$("body").on("click", ".btn-delete-product-record", function (e) {
    e.preventDefault();
    var array_id = this.id.split("-");
    id_record_product = array_id[1];
    var name_delete = this.getAttribute("data-name");
    var message = "Seguro(a) que desea ELIMINAR el registro<br>" + name_delete;
    msg_question('Confirmar',message,delete_record = () => {
    coreBeanar_io.DELETE(url_api + "products_detail/" + id_record_product,
      (data)=>{
          coreBeanar_io.msg.info("Exito", data.message);
          deta_table.ajax.reload();
      },
      (err)=>{
          coreBeanar_io.msg.error("Error", err.message);
       });
    });
});

$("#product_confirm").click(function(e){
  e.preventDefault();
  let description = $("#description").val();
  //agregar Visita
  var my_data = {
    id_father: id_father2,
    id_reason: id_reason,
    id_client: id_client,
    id_visitor: user,
    id_location: id_location,
    id_tour1: id_tour,
    id_tour2: id_tour2,
    type: id_type,
    description: description,
    date: date
  }
  // alert(id_record);
// console.log(my_data);
  coreBeanar_io.PUT(url_api + "visits/" + id_father, my_data,
    (data)=>{
        visits_table.ajax.reload();
        deta_table.ajax.reload();
        alert_info("Exito", "Productos Confirmados");
        // $("btn-add-products").attr(string/object)
    },
    (err)=>{
        coreBeanar_io.msg.error("Error", err.message);
    });
    $("#add_products_modal").modal("hide");
    $(".fa-star").css("color", "black");
    signaturePad2.clear();
    star_value = 0;
    $("#add_product_report_modal").modal('show');
});

//estrellas
$("#s1").click(function(e){
  e.preventDefault();
  $(".fa-star").css("color", "black");
  $("#s1").css("color", "yellow");
  star_value = 1;
});
$("#s2").click(function(e){
  e.preventDefault();
  $(".fa-star").css("color", "black");
  $("#s1, #s2").css("color", "yellow");
  star_value = 2;
});
$("#s3").click(function(e){
  e.preventDefault();
  $(".fa-star").css("color", "black");
  $("#s1, #s2, #s3").css("color", "yellow");
  star_value = 3;
});
$("#s4").click(function(e){
  e.preventDefault();
  $(".fa-star").css("color", "black");
  $("#s1, #s2, #s3, #s4").css("color", "yellow");
  star_value = 4;
});
$("#s5").click(function(e){
  e.preventDefault();
  $(".fa-star").css("color", "black");
  $(".fa-star").css("color", "yellow");
  star_value = 5;
});

//Firmas

document.getElementById('clear_firm2').addEventListener('click', function () {
    signaturePad2.clear();
});

$("#btn-valid-docto").click(function(e){
  e.preventDefault();
  if ("geolocation" in navigator){ //check geolocation available
        //try to get user current location using getCurrentPosition() method
        navigator.geolocation.getCurrentPosition(function(position){
              lat = position.coords.latitude;
              lng = position.coords.longitude;
              if (signaturePad2.isEmpty()) {
                  alert_error("Error", "Debe Firmar el Documento para poder Guardarlo!");
                  return;
              }
              if(star_value == 0){
                alert_error("Error", "Debe Calificar la Visita para poder Guardarlo!");
                return;
              }
              var data_firm = signaturePad2.toDataURL('image/png');
              $.ajax({
                  type: "POST",
                  url: "api/upload_firm",
                  dataType:"json",
                  data: {
                      imgBase64: data_firm,
                      table_name: "visits",
                      field_name: "signature",
                      id_record: id_father
                  }
              }).done(function(img_data) {
                  coreBeanar_io.PUT(url_api + "visits/" + id_father, {rating: star_value, gps1: lat, gps2: lng, confirm: 1},
                      (data)=>{
                          deta_table.ajax.reload();
                          visits_table.ajax.reload();
                          signaturePad2.clear();
                          $("#add_product_report_modal").modal('hide');
                          coreBeanar_io.msg.info("Información", "Documento Validado Correctamente!");
                      },
                      (err)=>{});
              });
            });
    }else{
        console.log("Browser doesn't support geolocation!");
    }

});


 $("#btn-save").click(function(e){
   e.preventDefault();
     let id_reason = $("#id_reason1").val(),
         name = $("#name").val(),
         amount1 = $("#amount1").val(),
         description = $("#description1").val(),
         date = $("#date2").val();


         let inputFileImage = document.getElementById("file-picture");
         let file = inputFileImage.files[0];
         let name_file = "";
         if (file == undefined){
           file = "Null";
           name_file = "";
         } else {
           file = inputFileImage.files[0];
           name_file = file.name;
         }

         if (name == ""){
           alert_warning('Atención', 'Falta llenar campo Nombre para poder guardar el documento!');
           $("#name").focus();
           return;
         }
         if (date == ""){
           alert_warning('Atención', 'Favor Seleccionar Fecha para poder guardar el documento!');
           $("#date2").focus();
           return;
         }
         if (id_reason == 0){
           alert_warning('Atención', 'Favor Seleccionar Razon para poder guardar el documento!');
             $("#id_reason").focus();
             return;
         }
         if (amount1 == ""){
           alert_warning('Atención', 'Falta llenar Campo Cantidad para poder guardar el documento!');
             $("#amount1").focus();
             return;
         }


     let my_data = {
                       id_father: id_father,
                       id_employee: user,
                       id_tour1: id_tour,
                       id_tour2: id_tour2,
                       id_reason: id_reason,
                       name: name,
                       amount1: amount1,
                       description:description,
                       date: date,
                     }
       // console.log(my_data);
       if(id_record_expense == 0){
         coreBeanar_io.POST(url_api + "expenses/", my_data,
           (data)=>{
             coreBeanar_io.msg.info("Exito", data.message);
             var id_record2 = data.id_record;
             id_record_expense = 0;
             subirArchivos(file, "file_path", id_record2);
             resetControls();
             //
             coreBeanar_io.GET(url_api + 'tours1/get_last_value/' + id_tour,
                 (data)=>{
                     data = data.data;
                     let exp_amount = data.exp_amount;
                     let tour2_amount = data.tour2_amount;
                     let my_data2 = {amount2: exp_amount}
                     coreBeanar_io.PUT(url_api + 'tours1/' + id_tour, my_data2,
                         (data)=>{
                             // coreBeanar_io.msg.info("Exito", data.message);
                             console.log("Exito al actualizar cantidad");
                         },
                         (err)=>{
                             coreBeanar_io.msg.error("Error", err.message);
                         });
                 },
                 (error)=>{
                     console.log("Error al traer los datos");
                     return;
                 });
             expenses_table.ajax.reload();
             $("#expenses-modal").modal('show');
           },
           (err)=>{
             coreBeanar_io.msg.error("Error", err.message);
           });
       }
       else{
         coreBeanar_io.PUT(url_api + "expenses/" + id_record_expense, my_data,
           (data)=>{
             coreBeanar_io.msg.info("Exito", data.message);
             var id_record2 = id_record_expense;
             id_record_expense = 0;
             subirArchivos(file, "file_path", id_record2);
             resetControls();
             //
             coreBeanar_io.GET(url_api + 'tours1/get_last_value/' + id_tour,
                 (data)=>{
                     data = data.data;
                     let exp_amount = data.exp_amount;
                     let tour2_amount = data.tour2_amount;
                     let my_data2 = {amount2: exp_amount}
                     coreBeanar_io.PUT(url_api + 'tours1/' + id_tour, my_data2,
                         (data)=>{
                             // coreBeanar_io.msg.info("Exito", data.message);
                             console.log("Exito al actualizar cantidad");
                         },
                         (err)=>{
                             coreBeanar_io.msg.error("Error", err.message);
                         });
                 },
                 (error)=>{
                     console.log(error.message);
                     return;
                 });
             expenses_table.ajax.reload();
             $("#expenses-modal").modal('hide');
           },
           (err)=>{
               coreBeanar_io.msg.error("Error", err.message);
           });
       }
  });

  function subirArchivos(file, field, id_record){
    var myData = new FormData();
    let table = "expenses";
    myData.append('archivo',file);
    myData.append('id', id_record);
    myData.append('field_file', field);

    $.ajax({
      url: 'api/file_upload.php?option=13&table=' + table,
      type: 'POST',
      dataType: 'json',
      data: myData,
      contentType: false,
      processData: false,
    })
    .done(function(data) {

      $.getJSON('api/file_upload.php?option=8&id_record=' + id_record + '&table=' + table, function(data1){
        multimedia = data1[0].file_path;
      });

      // alert_info("Información", data.msg);

    })
    .fail(function(error) {
      $("#path1 *").remove();
      $("#path1").append('<h4 class="card-title"></h4>');
      $("#path1").append('<input type="file" id="file-picture" class="dropify"/>');

      $('.dropify').dropify({
        messages:{
          'default': 'Arrastra y suelta un archivo aquí o haz clic',
          'replace': 'Arrastra y suelta o haz clic para reemplazar',
          'remove':  'Eliminar',
          'error':   'Error al cargar el archivo'
        }
      });


      // alert_error("Error!", "Error al subir Imagen");
    });
  }

  function borrarImagen(field, id_record_expense){

    //alert(path);

    if ($("#id_record").val() == 0){
      return;
    }
    var myData = {"field":field, "id": id_record_expense};
    let table = "expenses";
    $.ajax({
      url: 'api/file_upload.php?option=12&table=' + table + '&id_record=' + id_record_expense, // borrar archivos....
      type: 'POST',
      dataType: 'json',
      data: myData
    })
    .done(function(data) {
      $.getJSON('api/file_upload.php?option=8&id_record=' + id_record_expense + '&table=' + table, function(data1){
        multimedia = data1[0].file_path;
      });
      alert_info("Información", data.msg);
    })
    .fail(function(error) {
      alert_error("Error!", "Error imagen no se encuentra en carpeta");
    });
  }

  function borrarImagen2(field, id_record_expense){

    var myData = {"field":field, "id": id_record_expense};
    let table = "expenses";
    $.ajax({
      url: 'api/file_upload.php?option=12&table=' + table + '&id_record=' + id_record_expense, // borrar archivos....
      type: 'POST',
      dataType: 'json',
      data: myData
    })
    .done(function(data) {
      alert_info("Información", data.msg);
    })
    .fail(function(error) {
      alert_error("Error!", "Error imagen no se encuentra en carpeta");
    });
  }

  function resetControls(){
    $("#path1 *").remove();

    $("#path1").append('<input type="file" id="file-picture" class="dropify"/>');
    $('#file-picture').dropify();

    $("#name, #amount1, #description1").val('');
    $("#id_reason1").val(0);
    $("#total").val(0);
    // $("#id_product").val(0);
    $('#id_product').select2().select2('val', $('.select2 option:eq(0)').val());

  }


});
