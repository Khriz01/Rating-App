$(document).ready(function() {
	var general_data = "";
	$.ajax({
		method: "GET",
		url: "api/general_info.php",
		dataType: "JSON",
		success: function (data) {
			if(data.id_user == 0){
				window.location.replace("login.php");
				return;
			}
			console.log(data.image_user);
			$(".name-user-log").text(data.name_user);
			// if (data.image_user.length == 0 || data.image_user == null){
	  			$(".img-user-log").attr({
	  				src: "assets/images/users/userdefault.png",
	  			});
  			// }
  			// else{
  			// 	$(".img-user-log").attr({
	  		// 		src: data.image_user,
	  		// 	});
  			// }
		}
	});

	var my_data = "&lockscreen=true"
	$.ajax({
		url: 'api/lockscreen.php?option=1',
		type: 'POST',
		dataType: 'text',
		data: my_data
	})
	.done(function() {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});


	$("#loginform").keydown(function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
        	$("#btn-submit").click();
        }
    });

	$("#btn-submit").click(function(event) {
		event.preventDefault();
		var current_password = $("#current-password").val(),
			new_password = $("#new-password").val(),
			new_password2 = $("#new-password2").val();

		if(current_password == ""||new_password == ""||new_password2 == ""){
			if(current_password == ""){
				$("#current-password").focus();
				alert_warning("Atención!","Escriba su contraseña actual");
			}
			else if(new_password == ""){
				$("#new-password").focus();
				alert_warning("Atención!","Escriba su nueva contraseña");
			}
			else if(new_password2 == ""){
				$("#new-password2").focus();
				alert_warning("Atención!","Escriba su nueva contraseña");
			}
			return;
		}

		if(new_password != new_password2){
			alert_warning("Atención!","Las contraseñas nuevas no son iguales");
			$("#new-password").val("");
			$("#new-password2").val("");
			$("#new-password").focus();
			return;
		}

		current_password = hex_sha1(current_password);
		new_password = hex_sha1(new_password);
		new_password2 = hex_sha1(new_password2);

		var my_data = "&current_password=" + current_password + "&new_password=" + new_password + "&new_password2=" + new_password2;

		$.ajax({
			type: "POST",
            url: "api/change-password.php?option=1",
            data: my_data,
            dataType:'text'
		})
		.done(function(result) {
			if (result == 1){
				alert_info('EXITO', 'Su contraseña se actualizo correctamente');
				window.location.replace("lockscreen");
			}
			else if (result == 2){
				alert_error('Error', 'La contraseña actual que ingreso es incorrecta!');
				$("#current-password").val("");
				$("#current-password").focus();
			}
		})
		.fail(function() {
			alert_error('Error', 'Ocurrio un error mientras se actializaba su contraseña!');
			$("#current-password").val("");
			$("#new-password").val("");
			$("#new-password2").val("");
			$("#current-password").focus();
		})
		.always(function() {
		});
        return false;
	});

	$("#btn-cancel").click(function(){
		window.location.replace("index.php");
	});

});
