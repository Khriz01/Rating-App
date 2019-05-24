//Service worker
if(navigator.serviceWorker){
    navigator.serviceWorker.register('sw.js');

}

$("#document").ready(function(){

	$(this).attr("title", "Beanario - Inicio de Sesión");

	$("#loginform").keydown(function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
        	$("#btn-submit").click();
        }
    });

	$("#btn-submit").click(function(event) {
		event.preventDefault();
		var user_name = $("#user_name").val(),
			user_pass = $("#user_password").val();

			if(user_name == ""){
				alert_warning("Atención", "Campo NOMBRE DE USUARIO necesario para Iniciar Sesión");
				$("#user_name").focus();
				return;
			}
			else if(user_pass == ""){
				alert_warning("Atención", "Campo CONTRASEÑA necesario para Iniciar Sesión");
				$("#user_password").focus();
				return;
			}


        let pass_user = hex_sha1($("#user_password").val());
        let my_data = '&user_name=' + user_name + '&password=' + pass_user;
		$.ajax({
            type: "POST",
            url: "api/login?filter=1",
            data: my_data,
            success: function(response) {
							// alert(response);
                if (response == 1) {
                    alert_info("Atención", "Bienvenido");
                    window.location.replace("index");
                } else if (response == 2) {
                    window.location.replace("reset-password");
                } else {
                    alert_warning('Error', 'Nombre de Usuario o Contraseña incorrectos!');
                    $("#user_name").val(""),
    								$("#user_password").val("")
                    $("#user_name").focus();
                }
            }
        });
        return false;
	});

	$("#to-recover-pass").click(function(e){
		e.preventDefault();
	});
});
