<?php

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
    <title></title>
    <?php
        include_once('blocks/css.php');
     ?>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>

    <![endif]-->
    <!-- Manifiest -->
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

<body class="fix-header fix-sidebar card-no-border">
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
    <div id="main-wrapper">
        <!-- ============================================================== -->
        <!-- Topbar header - style you can find in pages.scss -->
        <!-- ============================================================== -->
        <?php
            include_once('blocks/topbar.php');
         ?>
        <!-- ============================================================== -->
        <!-- End Topbar header -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- Left Sidebar - style you can find in sidebar.scss  -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- End Left Sidebar - style you can find in sidebar.scss  -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- Page wrapper  -->
        <!-- ============================================================== -->
        <div class="page-wrapper">
            <!-- ============================================================== -->
            <!-- Container fluid  -->
            <!-- ============================================================== -->
            <div class="container-fluid">
                <!-- ============================================================== -->
                <!-- Bread crumb and right sidebar toggle -->
                <!-- ============================================================== -->
                <!-- ============================================================== -->
                <!-- End Bread crumb and right sidebar toggle -->
                <!-- ============================================================== -->
                <!-- ============================================================== -->
                <!-- Start Page Content -->
                <!-- ============================================================== -->
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-8">
                                        <h4 class="card-title" id="card-title"></h4>
                                    </div>

                                </div>
                                <br>
                                <div class="row floating-labels m-t-1">
                                  <div class="col col-md-5 form-group m-t-10">
                                    <select class="form-control select custom-select" id="id_tour" required="true" placeholder="Seleccione Gira">
                                        <option value="0">Seleccione Gira</option>
                                    </select>
                                    <span class="bar"></span>
                                    <label for="id_tour">Gira</label>
                                  </div>

                                </div>
                                <div class="table-responsive m-t-20">
                                    <table id="visits-table" class="tablesaw table-striped table-hover table-bordered table" data-tablesaw-mode="columntoggle">
                                        <thead>
                                            <tr>
                                                <th  style="width:25%">Visita</th>
                                                <th  style="width:25%">Fecha Max.</th>
                                                <th  style="width:25%"></th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- ============================================================== -->
                <!-- End PAge Content -->
                <!-- ============================================================== -->
                <!-- ============================================================== -->
                <!-- Right sidebar -->
                <!-- ============================================================== -->
                <!-- ============================================================== -->
                <!-- End Right sidebar -->
                <!-- ============================================================== -->
            </div>
            <!-- ============================================================== -->
            <!-- End Container fluid  -->
            <!-- ============================================================== -->
            <!-- ============================================================== -->
            <!-- footer -->
            <!-- ============================================================== -->
            <?php
                include_once('blocks/footer.php');
            ?>
            <!-- ============================================================== -->
            <!-- End footer -->
            <!-- ============================================================== -->
        </div>
        <!-- ============================================================== -->
        <!-- End Page wrapper  -->
        <!-- ============================================================== -->
    </div>
    <div>
        <?php
            include_once('modals/add_products_modal.php');
        ?>
    </div>
    <div>
        <?php
            include_once('modals/add_product_report_modal.php');
        ?>
    </div>
    <div>
        <?php
            include_once('modals/expenses_view_modal.php');
        ?>
    </div>
    <div>
        <?php
            include_once('modals/expenses_modal.php');
        ?>
    </div>
    <!-- ============================================================== -->
    <!-- End Wrapper -->
    <!-- ============================================================== -->
    <!-- ============================================================== -->
    <!-- All Jquery -->
    <!-- ============================================================== -->
    <?php
        include_once('blocks/scripts.php');
     ?>

    <script src="assets/plugins/signature-pad/signature_pad.min.js"></script>
    <script src="js/index.js"></script>
</body>

</html>
