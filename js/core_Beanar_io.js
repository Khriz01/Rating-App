function isDefined(variable){
	return (typeof(window[variable]) !== "undefined");
};

var coreBeanar_io = {

	//FUNCIONES
	clearInputs: ()=>{
		let listText = document.querySelectorAll("input");
		listText.forEach((inputT, index, arr)=>{
			let type = inputT.type;
			switch (type) {
				case "text":
					inputT.value = "";
					break;
				case "number":
					inputT.value = "0";
				default:
					// statements_def
					break;
			}
		});
		let listSelect = document.querySelectorAll("select");
		listSelect.forEach((inputT, index, arr)=>{
			inputT.value = 0;
		});
	},
	getPDF : (url, fileName)=>{

		if(url== undefined){
        	return;
    	}
	    if (fileName == undefined){
	        fileName = "PdfFile-" + new Date().getTime() + ".pdf";
	    }

	    let req = new XMLHttpRequest();
	    req.open("GET", url);
	    req.responseType = "blob";
	    req.onreadystatechange = () => {
	        if (req.readyState === 4 && req.status === 200) {
		        if (typeof window.navigator.msSaveBlob === 'function') {
		        	window.navigator.msSaveBlob(req.response, "PdfName-" + new Date().getTime() + ".pdf");
		        }
		        else {
		        	var blob = req.response;
		        	var link = document.createElement('a');
		        	link.href = window.URL.createObjectURL(blob);
		        	link.download = fileName;
		        	document.body.appendChild(link);
		        	link.click();
		        }
		  	}
		};
		req.send();
	},
	getXLS : (url, fileName)=>{

		if(url== undefined){
        	return;
    	}
	    if (fileName == undefined){
	        fileName = "XLSFile-" + new Date().getTime() + ".xls";
	    }

	    let req = new XMLHttpRequest();
	    req.open("POST", url);
	    req.responseType = "blob";
	    req.onreadystatechange = () => {
	        if (req.readyState === 4 && req.status === 200) {
		        if (typeof window.navigator.msSaveBlob === 'function') {
		        	window.navigator.msSaveBlob(req.response, "xlsName-" + new Date().getTime() + ".xls");
		        }
		        else {
		        	var blob = req.response;
		        	var link = document.createElement('a');
		        	link.href = window.URL.createObjectURL(blob);
		        	link.download = fileName;
		        	document.body.appendChild(link);
		        	link.click();
		        }
		  	}
		};
		req.send();
	},
	formatNumber : {
		separador: ",", // separador para los miles
 		sepDecimal: '.', // separador para los decimales
 		formatear: (num)=>{
 			num +='';
			let splitStr = num.split('.');
			let splitLeft = splitStr[0];
			let splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
			let regx = /(\d+)(\d{3})/;
			while (regx.test(splitLeft)) {
				splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
			}
			if(splitRight == ''){
				splitRight = '.00';
			}
			else{
				splitRight = splitRight.substring(0, 3);
			}
			return this.formatNumber.simbol + splitLeft + splitRight;
 		},
 		new: (num, simbol)=>{
			if(num===null){
				num = 0;
			}
		 	this.formatNumber.simbol = simbol ||'';
			return this.formatNumber.formatear(num);
		 }
	},
	GET: (url, success, error)=>{
		fetch(url, {
   			method: 'GET',
   			headers : {
			    "Content-Type": "application/json",
			}
		})
		.then((response)=> {
       		return response.json();// response.text()}
		})
		.then((response)=> {
			if(response.status == "success"){
				success(response)
			}
			else{
				error(response);
			}
		})
		.catch(function(err) {
		   error(err);
		});
	},

	POST :(url, data_send, success, error)=> {
	    fetch(url, {
                async: true,
                crossDomain: true,
                method: 'POST',
                headers : {
				    "Content-Type": "application/json",
				},
                contentType: 'JSON',
                body:JSON.stringify(data_send)
            }
         ).then((response) => {
			return response.json();
		})
		.then((response) => {
			if(response.status == "success"){
				if(typeof success === 'function'){
					success(response);
				}
				else{
					console.info(response);
				}
			}
			else{
				if(typeof success === 'function'){
					error(response);
				}
				else{
					console.info(response);
				}
			}
		})
		.catch((err) => {
			if(typeof error === 'function'){
				error(err);
			}else{
				console.error(err);
			}
		});
	},

	PUT :(url, data_send, success, error)=> {
	    fetch(url, {
                async: true,
                crossDomain: true,
                method: 'PUT',
                headers : {
				    "Content-Type": "application/json",
				},
                contentType: 'JSON',
                body:JSON.stringify(data_send)
            }
         ).then((response) => {
			return response.json();
		})
		.then((response) => {
			if(response.status == "success"){
				if(typeof success === 'function'){
					success(response);
				}else{
					console.log(response);
				}
			}
			else{
				if(typeof error === 'function'){
					error(response);
				}
				else{
					console.error(response)
				}
			}
		})
		.catch((err) => {
			if(typeof error === 'function'){
				error(err);
			}else{
				console.error(err);
			}
		});
	},

	DELETE: (url, success, error)=>{
		fetch(url, {
   			method: 'DELETE',
   			headers : {
			    "Content-Type": "application/json",
			}
		})
		.then((response)=> {
       		return response.json();// response.text()}
		})
		.then((response)=> {
			if(response.status == "success"){
				if(typeof success === 'function'){
					success(response)
				}else{
					console.log(response);
				}
			}
			else{
				if(typeof error === 'function'){
					error(response);
				}else{
					console.error(response);
				}
			}
		})
		.catch(function(err) {
			if(typeof error === 'function'){
				error(response);
			}else{
				console.error(response);
			}
		});
	},

	getJSON: (url, params, success = undefined)=>{
		if(typeof params === 'function' ){
			fetch(url, {
   			method: 'GET',
	   			headers : {
				    "Content-Type": "application/json",
				}
			})
			.then((response)=> {
	       		return response.json();// response.text()}
			})
			.then((response)=> {
				if(response.status == "success"){
					params(response);
				}
			})
			.catch(function(err) {
			   //error(err);
			});
		}
		else{
			let nCantParams = 0
			let nCantParams2 = 0;
			for(var param in params){
				nCantParams++;
			}
			if(nCantParams >0){
				url += "?";
				for(var param in params){
					url += param+"="+params[param];
					nCantParams2++;
					if(nCantParams2 < nCantParams){
						url += "&";
					}
				}
			}
			fetch(url, {
	   			method: 'GET',
	   			headers : {
				    "Content-Type": "application/json",
				}
			})
			.then((response)=> {
	       		return response.json();// response.text()}
			})
			.then((response)=> {
				if(response.status == "success"){
					if(typeof success === 'function'){
						success(response);
					}
				}
			})
			.catch(function(err) {
			   //error(err);
			});
		}
	},
	msg:{
		warning: (title = "", message = undefined)=>{
			if (message === undefined){
				message = title;
				title = "Atención!";
			}
			iziToast.show({
			    icon:'fa fa-exclamation',
			    timeout: 3000,
			    iconColor:'white',
			    color:'#ff9933',
			    position:'topRight',
			    title: title,
			    message: message
		  	});
		},
		error : (title = "", message = undefined) =>{
			if (message === undefined){
				message = title;
				title = "Error!";
			}
			iziToast.show({
		      	icon:'fa fa-times',
		      	timeout: 3000,
		      	iconColor:'white',
		      	color:'#ff6666',
		      	position:'topRight',
		      	title: title,
		      	message:message
	  		});
		},
		info: (title = "", message = undefined)=>{
			if (message === undefined){
				message = title;
				title = "Información";
			}
		  	iziToast.show({
			    icon:'fa fa-check',
			    timeout: 3000,
			    iconColor:'blue',
			    color:'#9fff80',
			    position:'topRight',
			    title: title,
			    message:message
		  	});
		},

		question: (title = "", message = "", fnExecute = undefined)=>{
			iziToast.show({
			    theme: 'dark',
			    timeout: 10000,
			    icon: 'fa fa-question-circle',
			    title: title,
			    message: message + "<hr>",
			    position: 'center', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
			    progressBarColor: 'rgb(0, 255, 184)',
			    buttons: [
			    	["<button>Aceptar</button>", function (instance, toast) {
			    		if(fnExecute !== undefined &&typeof fnExecute === 'function'){fnExecute();}
			            instance.hide({
			                transitionOut: 'fadeOutUp',
			                	onClosing: function(instance, toast, closedBy){
			                }
			            }, toast, 'buttonName');
			        }, true], // true to focus
			        ['<button>Cancelar</button>', function (instance, toast) {
			            instance.hide({
			                transitionOut: 'fadeOutUp',
			                	onClosing: function(instance, toast, closedBy){
			                }
			            }, toast, 'buttonName');
			        }]
			    ],
			    onOpening: function(instance, toast){},
			    onClosing: function(instance, toast, closedBy){}
			});
		}
	},

	uploadFiles : (data = {}, fnSuccess=undefined, fnError=undefined) =>{
        if(!data.file){
        	console.error("El documento a subir esta vacio.");
        	return;
        }
        var myData = new FormData();
        myData.enctype = "multipart/form-data";
        myData.append('file',data["file"]);
        if(data['table']){
        	myData.append('table', data['table']);
        }
        if(data['field']){
        	myData.append('field', data['field']);
        }
        if(data['id_record']){
        	myData.append('id_record', data['id_record']);
        }
        //console.log(myData);
        $.ajax({
            url: 'api/upload_files',
            type: 'POST',
            dataType: 'JSON',
            data: myData,
            contentType: false,
            processData: false,
        })
        .done(function(data) {
            if(fnSuccess !== undefined && typeof fnSuccess === 'function'){fnSuccess(data);}
        })
        .fail(function(error) {
        	if(fnError !== undefined && typeof fnError === 'function'){fnError(error);}
        });
    },

    validAccessControl: (opt=0)=>{
    	if(opt && opt === 0){
    		return false;
    	}
    	if(!isDefined("user_data")){
    		return false;
    	}

    	if(!user_data['access_control']){
    		console.log("variable de control indefinida!");
    		return false;
    	}
    	if(opt && opt === 1){
    		if(user_data.access_control.optcreate && coreBeanar_io.validInt(user_data.access_control.optcreate) === 1){
    			return true;
    		}
    	}
    	else if(opt && opt === 2){
    		if(user_data.access_control.optupdate && coreBeanar_io.validInt(user_data.access_control.optupdate) === 1){
    			return true;
    		}
    	}
		else if(opt && opt === 3){
    		if(user_data.access_control.optdelete && coreBeanar_io.validInt(user_data.access_control.optdelete) === 1){
    			return true;
    		}
    	}

    	return false;
    },

    validAdminControl: (id_opcion="")=>{

    	if(!isDefined("user_data")){
    		return false;
    	}

    	if(id_opcion && id_opcion === ""){
    		return false;
    	}

    	if(!user_data['admin_control']){
    		return false;
    	}
    	let exist=false;
    	for(var i=0; i<user_data.admin_control.length; i++){
    		if(user_data.admin_control[i].id && user_data.admin_control[i].id === id_opcion){
    			if(coreBeanar_io.validInt(user_data.admin_control[i].status)!==0){
    				exist = true;
    			}
    		}
    	}
    	return exist;
    },

    validInt: (number = 0)=>{

    	num = parseInt(number !== true && Number(number) || 0)

    	if(isNaN(num)){
    		num = 0;
    	}
    	return num;
    },

    validFloat: (float = 0.00, decimals = 2)=>{

    	if(Number.isNaN(Number.parseFloat(float))){
    		return Number.parseFloat(Number.parseFloat("0.00").toFixed(decimals));
    	}
    	else{
    		return Number.parseFloat(Number.parseFloat(float).toFixed(decimals))
    	}

    	// if(float === null){
    	// 	float = 0.00;
    	// }

    	// if (float === undefined){
    	// 	float = 0.00;
    	// }

    	// if(typeof float === "boolean"){
    	// 	float = 0.00;
    	// }
    	// else if(typeof float === "string"){
    	// 	float = parseFloat(float);
    	// 	if(isNaN(float)){
    	// 		float = 0.00;
    	// 	}
    	// }
    	// float = Number.parseFloat(float.toFixed(decimals));
    	// return float;
    },

    validTime: (str)=>{
		hora=str;
		if (hora=='') {
		return false;
		}
		if (hora.length>8) {
		return false;
		}
		if (hora.length!=8) {
		//alert("Introducir HH:MM:SS");
		return false;
		}
		a=hora.charAt(0); //<=2
		b=hora.charAt(1); //<4
		c=hora.charAt(2); //:
		d=hora.charAt(3); //<=5
		e=hora.charAt(5); //:
		f=hora.charAt(6); //<=5
		if ((a==2 && b>3) || (a>2)) {
			console.error("El valor que introdujo en la Hora no corresponde, introduzca un digito entre 00 y 23");
			return false;
		}
		if (d>5) {
			console.error("El valor que introdujo en los minutos no corresponde, introduzca un digito entre 00 y 59");
			return false;
		}
		if (f>5) {
			console.error("El valor que introdujo en los segundos no corresponde");
			return false;
		}
		if (c!==':' || e!==':') {
			console.error("Introduzca el caracter ':' para separar la hora, los minutos y los segundos");
			return false;
		}
		return true;
    },

    validDate: (dateString)=> {
		var regEx = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
		if(!dateString.match(regEx)) return false;  // Invalid format
		var d = new Date(dateString);
		if(Number.isNaN(d.getTime())) return false; // Invalid date
		return d.toISOString().slice(0,10) === dateString;
	},

	compareDate(date1 = "", date2 = ""){
		if(!coreBeanar_io.validDate(date1) || !coreBeanar_io.validDate(date2)){
			return false;
		}
		if(date1=== "" || date2=== ""){
			return false;
		}
		if( (new Date(date1).getTime() <= new Date(date2).getTime())){
			return true;
		}
		return false;
	},

    dateToString : ()=>{
    	return new Date().toJSON().slice(0, 10);
    },
    dateTimeToString : ()=>{
    	time = new Date().toLocaleTimeString();
    	time_arr = time.split(":");
    	time = time_arr[0].length === 1 ? "0" + time_arr[0] : time_arr[0];
    	time += ":";
    	time += time_arr[1].length === 1 ? "0" + time_arr[1] : time_arr[1];
    	time += ":";
    	time += time_arr[2].length === 1 ? "0" + time_arr[2] : time_arr[2];
    	return new Date().toJSON().slice(0, 10) + " " + time;
    },

    findInJSON : (json, fieldFind, valueFind, fieldReturn)=>{
    	if(typeof json !== "object"){
    		console.log("no es un objeto valido!");
    		return null;
    	}
    	for(var i=0; i<json.length; i++){
    		if(json[i][fieldFind]=== valueFind){
    			if(json[i][fieldReturn]=== null){
    				console.log("campo invalido!");
    			}
    			return json[i][fieldReturn];
    		}
    	}
    	return null;
    },

    getInfo: ()=>{
    	let myInfo = {
    		"Name": "coreBeanar_io",
    		"description":"JavaScript functions for Beanario Systems",
    		"Funciones":[
    			{"name":"findInJSON", "Descripcion": "Busca un valor dentro de un objeto JSON y devuelve el valor solicitado", "Parametros":{"json":"Objeto JSON donde se desea buscar el valor", "fieldFind":"Propiedad buscada", "valueFind":"Valor a buscar dentro de la propiedad", "fieldReturn":"Propiedad a devolver si se encuentra valueFind"}, "Orden de Parametros":"json, fieldFind, valueFind, fieldReturn", "Valor por Defecto": "false"
    			}
    		]
    	}
    	return myInfo;
    }
}
// MENSAJES
//
// if(iziToast && iziToast !== null){
// 	iziToast.settings({
// 	timeout: 2000,
// 	resetOnHover: true,
// 	position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
// 	theme: 'light', // dark or light
// 	transitionIn: 'fadeInLeft',
// 	transitionOut: 'fadeOut',
// 	transitionInMobile: 'fadeInUp',
// 	transitionOutMobile: 'fadeOutDown',
// 	layout:2,
// });
// }
