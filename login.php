<?php
    if (session_status() == PHP_SESSION_NONE) { //VALIDATE SESSION
        session_start();
        session_destroy();
    }
 ?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- Favicon icon -->
    <link rel="icon" type="image/png" sizes="16x16" href="assets/images/favicon.ico">
    <title>Beanario - </title>
    <!-- Bootstrap Core CSS -->
    <link href="assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="css/style2.css" rel="stylesheet">
    <!-- Alert Toaster -->
    <link href="assets/plugins/toast-master/css/jquery.toast.css" rel="stylesheet">
    <link href="assets/plugins/izitoast/css/iziToast.min.css"  rel="stylesheet">
    <!-- You can change the theme colors from here -->
    <link href="css/colors/blue.css" id="theme" rel="stylesheet">
    <!-- Alert Toaster -->
    <link href="assets/plugins/toast-master/css/jquery.toast.css" rel="stylesheet">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
  <!-- Manifest -->
  <link rel="manifest" href="manifest.json">
  <!-- Este atributo es como le va decir al navegador del android como quiere que se vea la barra de direcciones -->
  <meta name="theme-color" content="#3498db">

  <!-- IOS -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <link rel="apple-touch-icon" href="assets/images/icons/icon-192x192.png">
  <link rel="apple-touch-icon" sizes="152x152" href="assets/images/icons/icon-152x152.png">
  <link rel="apple-touch-icon" sizes="180x180" href="assets/images/icons/icon-192x192.png">
  <link rel="apple-touch-icon" sizes="167x167" href="assets/images/icons/icon-152x152.png">

  <!-- iPhone X (1125px x 2436px) -->
  <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
      href="assets/images/icons-ios">
  <!-- iPhone 8, 7, 6s, 6 (750px x 1334px) -->
  <link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
      href="assets/images/icons-ios/apple-launch-750x1334.png">
  <!-- iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus (1242px x 2208px) -->
  <link rel="apple-touch-startup-image" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)"
      href="assets/images/icons-ios/apple-launch-1242x2208.png">
  <!-- iPhone 5 (640px x 1136px) -->
  <link rel="apple-touch-startup-image" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
      href="assets/images/icons-ios/apple-launch-640x1136.png">

  <!-- status bar que color quiere que sea -->
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

  <!-- nombre de la app-->
  <meta name="apple-mobile-web-app-title" content="Rating App">
</head>

<body>
    <!-- ============================================================== -->
    <!-- Preloader - style you can find in spinners.css -->
    <!-- ============================================================== -->
    <div class="preloader">
        <svg class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" /> </svg>
    </div>
    <!-- ============================================================== -->
    <!-- Main wrapper - style you can find in pages.scss -->
    <!-- ============================================================== -->
    <!--  -->
    <section id="wrapper" class="login-register login-sidebar" style="background-image:url(assets/images/background/login-register.jpg);">
  <div class="login-box card">
    <div class="card-body">
      <form class="floating-labels m-t-40" id="loginform">
        <a href="javascript:void(0)" class="text-center db"><img src="assets/images/0Logo_V_-_DarkBG_-_2.png" alt="" style="width: 50%; height:50%; " /></a>
        <br>
        <br>

        <div class="form-group m-b-40">
          <div class="col-xs-12">
            <input class="form-control" id="user_name" type="text" required="true" autocomplete="off">
            <span class="bar"></span>
            <label for="user_name">Nombre de Usuario</label>
          </div>
        </div>
        <div class="form-group">
          <div class="col-xs-12">
            <input class="form-control" id="user_password" type="password" required="true">
            <span class="bar"></span>
            <label for="user_password">Contraseña</label>
          </div>
        </div>
        <div class="form-group text-center m-t-20">
          <div class="col-xs-12">
            <button class="btn btn-info btn-md btn-block text-uppercase waves-effect waves-light" id="btn-submit">Iniciar Sesión</button>
          </div>
        </div>
        <br>
        <div class="form-group">
          <div class="col-md-12">
            <!-- <div class="checkbox checkbox-primary pull-left p-t-0">
              <input id="checkbox-signup" type="checkbox">
              <label for="checkbox-signup"> Remember me </label>
            </div> -->
            <a href="" id="to-recover_pass" class="text-dark pull-right"><i class="fa fa-lock m-r-5"></i> Olvido su contraseña?</a> </div>
        </div>
        <!-- <div class="row">
          <div class="col-xs-12 col-sm-12 col-md-12 m-t-10 text-center">
            <div class="social"><a href="javascript:void(0)" class="btn  btn-facebook" data-toggle="tooltip"  title="Login with Facebook"> <i aria-hidden="true" class="fa fa-facebook"></i> </a> <a href="javascript:void(0)" class="btn btn-googleplus" data-toggle="tooltip"  title="Login with Google"> <i aria-hidden="true" class="fa fa-google-plus"></i> </a> </div>
          </div>
        </div> -->
        <!-- <div class="form-group m-b-0">
          <div class="col-sm-12 text-center">
            <p>Don't have an account? <a href="register2.html" class="text-primary m-l-5"><b>Sign Up</b></a></p>
          </div>
        </div> -->
      </form>
      <!-- <form class="form-horizontal" id="recoverform" action="index.html">
        <div class="form-group ">
          <div class="col-xs-12">
            <h3>Recover Password</h3>
            <p class="text-muted">Enter your Email and instructions will be sent to you! </p>
          </div>
        </div>
        <div class="form-group ">
          <div class="col-xs-12">
            <input class="form-control" type="text" required="" placeholder="Email">
          </div>
        </div>
        <div class="form-group text-center m-t-20">
          <div class="col-xs-12">
            <button class="btn btn-primary btn-lg btn-block text-uppercase waves-effect waves-light" type="submit">Reset</button>
          </div>
        </div>
      </form> -->
    </div>
  </div>
</section>
    <!-- ============================================================== -->
    <!-- End Wrapper -->
    <!-- ============================================================== -->
    <!-- ============================================================== -->
    <!-- All Jquery -->
    <!-- ============================================================== -->
    <script src="assets/plugins/jquery/jquery.min.js"></script>
    <!-- Bootstrap tether Core JavaScript -->
    <script src="assets/plugins/popper/popper.min.js"></script>
    <script src="assets/plugins/bootstrap/js/bootstrap.min.js"></script>
    <!-- slimscrollbar scrollbar JavaScript -->
    <script src="js/jquery.slimscroll.js"></script>
    <!--Wave Effects -->
    <script src="js/waves.js"></script>
    <!--Menu sidebar -->
    <script src="js/sidebarmenu.js"></script>
    <!--stickey kit -->
    <script src="assets/plugins/sticky-kit-master/dist/sticky-kit.min.js"></script>
    <script src="assets/plugins/sparkline/jquery.sparkline.min.js"></script>
    <!--Custom JavaScript -->
    <script src="js/custom.min.js"></script>
    <!-- Alert Toaster -->
    <script src="assets/plugins/toast-master/js/jquery.toast.js"></script>
    <script src="assets/plugins/izitoast/js/iziToast.min.js"></script>
    <!-- ============================================================== -->
    <!-- Style switcher -->
    <!-- ============================================================== -->
    <script src="assets/plugins/styleswitcher/jQuery.style.switcher.js"></script>
    <script src="js/sha-1factory.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/msg_msgbox.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/login.js" type="text/javascript" charset="utf-8"></script>
    <!-- Alert Toaster -->
    <script src="assets/plugins/toast-master/js/jquery.toast.js"></script>
</body>

</html>
