var user_data = {id_user:0, id_father_user:0, type_user:0, name_user:"", email_user:"",document_user:"", master_user:0, super_user: 0, url_api:"http://localhost/beanar_io/", access_control:[], admin_control:[]};
var id_father_user = 0;
var url_api = user_data.url_api;
$(document).ready(function(){



	let admin = document.querySelectorAll(".admon_menu");
	let normal = document.querySelectorAll(".normal_menu");

	for (let i = 0; i < normal.length; i++) {
		normal[i].setAttribute('hidden', 'true');
	}

	for (let i = 0; i < admin.length; i++) {
		admin[i].setAttribute('hidden', 'true');
	}


	coreBeanar_io.GET("api/general_info",
	    (data)=>{
	      if(data.id_user == 0){
	          window.location.replace("login");
	          return;
	        }

	        if(data.screen_lock == true){
	          window.location.replace("lockscreen");
	          return;
	        }
	        general_data = data;
	        user_data.id_user = data.id_user;
	        user_data.name_user = data.name_user;
	        user_data.email_user = data.email_user;
	        user_data.document_user = data.document_user
					user_data.super_user = data.super_user;
					user_data.id_father_user = data.id_father_user;
					user_data.mastter_user = data.master_user;

	        let name_user_log = document.querySelectorAll('.name-user-log');
	        for(let i=0;i<name_user_log.length; i++){
	          name_user_log[i].innerHTML = data.name_user;
	        }
	        let email_user_log = document.querySelectorAll('.email-user-log');
	        for(let i=0;i<email_user_log.length; i++){
	          email_user_log[i].innerHTML = data.email_user;
	        }
	        if (typeof(fnDataProfile) === 'function'){
	          fnDataProfile();
	        }
					if(user_data.super_user == 0){ // Menu normal
	          for (let i = 0; i < normal.length; i++) {
	            normal[i].removeAttribute('hidden');
	          }
	        }
	        else if(user_data.super_user == 1){ // Administración
	          for (let i = 0; i < admin.length; i++) {
	           admin[i].removeAttribute('hidden');
	          }
	        }


	        if (typeof(fnDataProfile) === 'function'){
	          fnDataProfile();
	        }

          // let img_user_log = document.querySelectorAll('.img-user-log');
          // for(let i=0;i<img_user_log.length; i++){
          //   img_user_log[i].setAttribute('src', 'assets/images/users/userdefault.png');
					// }
					//
          // let profile_pic = document.querySelectorAll('.profile-pic');
          // for(let i=0;i<profile_pic.length; i++){
          //   profile_pic[i].setAttribute('src', 'assets/images/users/userdefault.png');
          // }
	    },
	    (error)=>{
	        window.location.replace("login");
	        return;
	    });

			var fecha = new Date();
		  let anio = fecha.getFullYear();
		  document.querySelector('#footer').innerHTML = "Service Provided by <a class='text-info' target='_blank' href='http://beanar.io'>beanar.io</a> | Copyright &#169; " + anio ;

});
// comentarios
