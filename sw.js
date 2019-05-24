//importar el archivo de las funciones para el sw
importScripts('js/sw-utils.js');

//constantes para manejo del cache
const STATIC_CACHE = "static-v1";
const DYNAMIC_CACHE = "dynamic-v1";
const INMUTABLE_CACHE = "inmutable-v1";

//librerias que son parte de mi app
const APP_SHELL = [
  // 'api/connection/connection.php',
  // 'api/connection/crud.php',
  // 'api/change-password.php',
  // 'api/file_upload.php',
  // 'api/general_info.php',
  // 'api/lockscreen.php',
  // 'api/login.php',
  'api/pages-blank.php',
  // 'api/upload_firm.php',
  'assets/images/custom-select.png',
  'assets/images/0Logo_V_-_DarkBG_-_2.png',
  'assets/images/background/login-register.jpg',
  'assets/images/0Logo_V_-_LightBG_-_1_icon.png',
  'assets/images/0Logo_V_-_LightBG_-_1_text.png',
  'assets/images/background/0Logo_V_-_LightBG_-_1.png',
  'assets/images/background/error-bg.jpg',
  'assets/images/background/error-bg2.jpg',
  // 'assets/images/background/login-register.jpg',
  'assets/images/background/megamenubg.jpg',
  'assets/images/background/profile-bg.jpg',
  'assets/images/background/socialbg.jpg',
  'assets/images/background/user-info-old.jpg',
  'assets/images/background/weatherbg.jpg',
  'assets/images/favicon.ico',
  'assets/images/0beanar.jpg',
  'assets/images/0Logo_V_-_DarkBG_-_2_icon.png',
  'assets/images/0Logo_V_-_LightBG_-_1.png',
  'assets/images/favicon.fw.png',
  'assets/images/favicon.png',
  'assets/images/favicon_.png',
  'assets/images/logo-icon.png',
  'assets/images/logo-icon2.png',
  'assets/images/logo-light-icon.png',
  'assets/images/logo-light-icon2.png',
  'assets/images/logo-light-text.png',
  'assets/images/logo-light-text2.png',
  'assets/images/logo-navbar-img-dark.png',
  'assets/images/logo-text.png',
  'assets/images/logo-text2.png',
  'blocks/css.php',
  'blocks/footer.php',
  'blocks/scripts.php',
  'blocks/topbar.php',
  // 'js/validsession.js',
  'js/core_Beanar_io.js',
  // 'js/login.js',
  // 'js/index.js',
  'js/language-data-table.json',
  // 'js/change-password.js',
  // 'js/lockscreen.js',
  // 'js/reset-password.js',
  'js/sw-utils.js',
  'libs/DateToStr.php',
  'libs/fechaLarga.php',
  'libs/NumeroALetras.php',
  'modals/add_product_report_modal.php',
  'modals/add_products_modal.php',
  'modals/expenses_modal.php',
  'modals/expenses_view_modal.php',
  '/',
  'change-password.php',
  'index.php',
  'lockscreen.php',
  'login.php',
  'logout.php',
  'pages-blank.php',
  'reset-password.php'
];

//libreria externas
const APP_SHELL_INMUTABLE = [
  'https://fonts.gstatic.com/s/poppins/v6/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2',
  'https://fonts.gstatic.com/s/poppins/v6/pxiByp8kv8JHgFVrLDz8Z1xlFd2JQEk.woff2',
  'https://fonts.gstatic.com/s/poppins/v6/pxiByp8kv8JHgFVrLGT9Z1xlFd2JQEk.woff2',
  // 'https://cr-input.mxpnl.net/data?_channel_id=&_partner_id=39571&_sub_id=0000&_app_version=1.0.23&_app=cs-dca',
  'https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700',
  'assets/plugins/bootstrap/css/bootstrap.min.css',
  'assets/plugins/icheck/skins/all.css',
  'assets/plugins/toast-master/css/jquery.toast.css',
  'assets/plugins/izitoast/css/iziToast.min.css',
  'assets/plugins/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css',
  'assets/plugins/clockpicker/dist/jquery-clockpicker.min.css',
  'assets/plugins/jquery-asColorPicker-master/css/asColorPicker.css',
  'assets/plugins/bootstrap-datepicker/bootstrap-datepicker.min.css',
  'assets/plugins/timepicker/bootstrap-timepicker.min.css',
  'assets/plugins/bootstrap-daterangepicker/daterangepicker.css',
  'assets/plugins/bootstrap-select/bootstrap-select.min.css',
  'assets/plugins/select2/dist/css/select2.min.css',
  'assets/plugins/dropify/dist/css/dropify.min.css',
  'assets/plugins/dropzone-master/dist/min/dropzone.min.css',
  'assets/plugins/icheck/skins/minimal/_all.css',
  'assets/plugins/icheck/skins/square/_all.css',
  'assets/plugins/icheck/skins/flat/_all.css',
  'assets/plugins/icheck/skins/line/_all.css',
  'assets/plugins/icheck/skins/polaris/polaris.css',
  'assets/plugins/icheck/skins/futurico/futurico.css',
  'assets/plugins/jquery/jquery.min.js',
  'assets/plugins/popper/popper.min.js',
  'assets/plugins/bootstrap/js/bootstrap.min.js',
  'assets/plugins/icheck/icheck.min.js',
  'assets/plugins/icheck/icheck.init.js',
  'assets/plugins/sticky-kit-master/dist/sticky-kit.min.js',
  'assets/plugins/sparkline/jquery.sparkline.min.js',
  'assets/plugins/styleswitcher/jQuery.style.switcher.js',
  'assets/plugins/toast-master/js/jquery.toast.js',
  'assets/plugins/izitoast/js/iziToast.min.js',
  'assets/plugins/datatables/jquery.dataTables.min.js',
  'assets/plugins/datatables-plugins/buttons/dataTables.buttons.min.js',
  'assets/plugins/datatables-plugins/buttons-flash/buttons.flash.min.js',
  'assets/plugins/datatables-plugins/jszip/jszip.min.js',
  'assets/plugins/datatables-plugins/pdfmake/pdfmake.min.js',
  'assets/plugins/datatables-plugins/vfs-fonts/vfs_fonts.js',
  'assets/plugins/datatables-plugins/buttons-html5/buttons.html5.min.js',
  'assets/plugins/datatables-plugins/buttons-print/buttons.print.min.js',
  'assets/plugins/moment/moment.js',
  'assets/plugins/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js',
  'assets/plugins/clockpicker/dist/jquery-clockpicker.min.js',
  'assets/plugins/jquery-asColorPicker-master/libs/jquery-asColor.js',
  'assets/plugins/jquery-asColorPicker-master/libs/jquery-asGradient.js',
  'assets/plugins/jquery-asColorPicker-master/dist/jquery-asColorPicker.min.js',
  'assets/plugins/bootstrap-datepicker/bootstrap-datepicker.min.js',
  'assets/plugins/timepicker/bootstrap-timepicker.min.js',
  'assets/plugins/bootstrap-daterangepicker/daterangepicker.js',
  'assets/plugins/bootstrap-select/bootstrap-select.min.js',
  'assets/plugins/select2/dist/js/select2.full.min.js',
  'assets/plugins/dropify/dist/js/dropify.min.js',
  'assets/plugins/zoom/wheelzoom.js',
  'assets/plugins/dropzone-master/dist/min/dropzone.min.js',
  'assets/plugins/signature-pad/signature_pad.min.js',
  'css/style.css',
  'css/colors/green-dark.css',
  'css/style_img_zoom.css',
  'css/spinners.css',
  'css/animate.css',
  'css/style2.css',
  'css/colors/blue.css',
  'js/jquery.slimscroll.js',
  'js/waves.js',
  'js/sidebarmenu.js',
  'js/custom.min.js',
  'js/functions.js',
  'js/mask.js',
  'js/msg_msgbox.js',
  'js/custom2.js',
  'scss/icons/font-awesome/css/font-awesome.min.css',
  'scss/icons/simple-line-icons/css/simple-line-icons.css',
  'scss/icons/weather-icons/css/weather-icons.min.css',
  'scss/icons/linea-icons/linea.css',
  'scss/icons/themify-icons/themify-icons.css',
  'scss/icons/flag-icon-css/flag-icon.min.css',
  'scss/icons/material-design-iconic-font/css/materialdesignicons.min.css',
  'scss/icons/font-awesome//fonts/fontawesome-webfont.woff2?v=4.7.0'
];

//instalacion del SW
self.addEventListener('install', e => {

  //almacenar en los caches
  const cacheStatic = caches.open(STATIC_CACHE)
    .then(cache => cache.addAll(APP_SHELL));
  const cacheInmutable = caches.open(INMUTABLE_CACHE)
    .then(cache => cache.addAll(APP_SHELL_INMUTABLE));
  let promises = [cacheStatic, cacheInmutable];

  e.waitUntil(Promise.all(promises));

  e.waitUntil(e);

});

//activacion del SW
self.addEventListener('activate', e => {

  //borrar los caches que sean diferentes a la version actual del cache
  //se necesita saber si existen otros caches con el nombre de static
  const respuesta = caches.keys().then(keys => {
      //aqui se obtienen todos los nombres que estan el localhost
      keys.forEach(key => { //aqui se van a barrer todos lo keys
          if (key !== STATIC_CACHE && key.includes('static')) {
              return caches.delete(key);
          }

          //cache dinamico
          if (key !== DYNAMIC_CACHE && key.includes('dynamic')) {
              return caches.delete(key);
          }
      });
  });
  e.waitUntil(respuesta); //hay que esperar que esto termine para no pasar al siguiente paso

});

//estrategia del cache
//cache only
self.addEventListener('fetch', e => {

  //se tiene que verificar en el cache si existe el cache
  const respuesta = caches.match(e.request).then(res => {


      //si existe la peticion y la respuesta que retorne la respuesta
      if (res){
          return res;
      } else {

          //console.log(e.request.url);
          //se necesita hacer un fetch al recurso nuevo, ya que el login no esta disponibles
          return fetch(e.request).then(newRes => {

             return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);

          });
      }

  });
  e.respondWith(respuesta);

});
