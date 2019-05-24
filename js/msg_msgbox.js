iziToast.settings({
    timeout: 2000,
    resetOnHover: true,
    position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
    theme: 'light', // dark or light
    transitionIn: 'fadeInLeft',
    transitionOut: 'fadeOut',
    transitionInMobile: 'fadeInUp',
    transitionOutMobile: 'fadeOutDown',
    layout:2,
});

// function msg_alert(title, text, type) {
//     // type=success, error, info, 
//     new PNotify({
//         title: title,
//         text: text,
//         type: type,
//         after_init: function (notice) {
//             notice.attention('wobble');
//         }
//     });
//     return false;
// }

function alert_warning(title, message){
    // icon = fontawesome icons.
  iziToast.show({
      icon:'fa fa-exclamation',
      timeout: 3000,
      //progressBarColor: 'rgb(0, 255, 184)',
      iconColor:'white',
      color:'#ff9933',
      position:'topRight',
      title: title,
      message: message
  });
}

function alert_error(title, message){
  iziToast.show({
      icon:'fa fa-times',
      timeout: 3000,
      //progressBarColor: 'rgb(0, 255, 184)',
      iconColor:'white',
      color:'#ff6666',
      position:'topRight',
      title: title,
      message:message
  });
}

function alert_info(title, message){
  iziToast.show({
      icon:'fa fa-check',
      timeout: 3000,
      //progressBarColor: 'rgb(0, 255, 184)',
      iconColor:'blue',
      color:'#9fff80',
      position:'topRight',
      title: title,
      message:message
  });
}

function messageBox(color, icon, title, message, position) {
  iziToast.show({
    color: color,
    icon: icon,
    iconColor:'red',
    title: title,
    message: message,
    position: position,
    timeout: 3000,
    progressBarColor: 'rgb(0, 255, 184)',
    buttons: [
      ['<button>Aceptar</button>', function (instance, toast) {
        return true;
      }],
      ['<button>Cancelar</button>', function (instance, toast) {
        instance.hide({ transitionOut: 'fadeOutUp' }, toast);
        return false;
      }]
    ]
  });
  return false;
}

function msg_question(title, message, funcion_ejecutar){
  iziToast.show({
      theme: 'dark',
      timeout: 3000,
      icon: 'fa fa-question-circle',
      title: title,
      message: message + "<hr>",
      position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
      progressBarColor: 'rgb(0, 255, 184)',
      buttons: [
          ["<button>Aceptar</button>", function (instance, toast) {
              funcion_ejecutar();
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
      onOpening: function(instance, toast){
      },
      onClosing: function(instance, toast, closedBy){
      }
  });
}
