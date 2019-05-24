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
			//console.log(data.image_user);
			$(".name-user-log").text(data.name_user);
			// if (data.document_user == null){
	  			$(".img-user-log").attr({
	  				src: "assets/images/users/userdefault.png",
	  			});
  			// }
  			// else{
  			// 	$(".img-user-log").attr({
	  		// 		src: data.document_user,
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
		var user_pass = $("#user_password").val();

		if(user_pass == ""){
			alert_warning("Atención", "Debe escribir su Contraseña para poder Iniciar Sesión!")
			$("#user_password").focus();
			return;
		}

		pass_user = hex_sha1($("#user_password").val());
		// console.log(pass_user);
        var my_data = '&password=' + pass_user;
		$.ajax({
            type: "POST",
            url: "api/lockscreen.php?option=2",
            data: my_data,
            success: function(response) {
                if (response == 1) {
                    window.location.replace("index.php");
                } else {
                	alert_error('Error', 'Contraseña Incorrecta!');
    						$("#user_password").val("")
                $("#user_password").focus();
                }
            }
        });
        return false;
	});
});
