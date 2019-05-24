<?php 

    if (session_status() == PHP_SESSION_NONE) { //VALIDATE SESSION
    	session_start();
    }
    
    if (!isset($_SESSION["id_user"])) { // VALIDATE USER AUTENTICATE
        header("Location: ../login.php");
        return;
    }

    // OPTION: 1= consulta de datos general
    // OPTION: 2= acciones en la db
    // ACCTION: 1= INSERT
    // ACCTION: 2= UPDATE
    // ACCTION: 3= DELETE
    require_once("connection/crud.php");//CLASS CRUD
    if (!isset($_GET["option"])) { //VALIDATE ACTIONS
 		return;
    }

    if (isset($_GET["option"]) AND $_GET["option"] == 1) { // CARGAR DATATABLE
    	$consulta = new crud();
    	$consulta->setTable('TABLA');
    	$consulta->setColumn('*');
    	$consulta->setCondition('');
    	$consulta->fnSelect();
    	$count = 0;
        echo '{ "data": [';
        if (count($consulta->getRow()) > 0) {
            foreach ($consulta->getRow() as $record) {
                $count++;
                echo '["' . $record['id'] . '",';
                echo '"';
                echo "<div style='text-align: right'>";
                echo " <a href='#' id='a1-" . $record["id"] ."' data-name='". $record['name'].  "' class='btn btn-mini btn-sm btn-warning btn-demo-space update_pass_record'><i class='fa fa-key'></i></a> ";
                echo " <a href='#' id='a1-" . $record["id"] . "' data-name='". $record['name']. "'data-email='" . $record['email'] . "'data-type='" . $record['type'] . "'data-active='" . $record['active'] . "'data-picture='" . $record['picture'] .  "' class='btn btn-mini  btn-sm btn-info btn-demo-space update_record'><i class='fa fa-pencil'></i></a> " ;
                echo " <a href='#' id='a1-" . $record["id"] ."' data-name='". $record['name'].  "' class='btn btn-mini btn-sm btn-danger btn-demo-space delete_record'><i class='fa fa-remove'></i></a> ";
                echo "</div>";
                echo '"]';
                if ($count < count($consulta->getRow())) {
                    echo ',';
                }
            }
        }
        echo ']}';
        return;
    }
    // acciones en la db insert/update/delete
    else if(isset($_GET['option']) && $_GET["option"] == 2){
        $id_record = isset($_POST['id_record'])?$_POST['id_record']:0;
        $name = isset($_POST['name_user'])? $_POST['name_user']:'';
		if(isset($_POST['action']) && $_POST['action'] == 1){ // INSERT
			

		}
		else if(isset($_POST['action']) && $_POST['action'] == 2){ // UPDATE
		}
		else if(isset($_POST['action']) && $_POST['action'] == 3){// DELETE

			if($id_record == 0){
				return;
			}
		}
    }
    else if(isset($_GET['option']) && $_GET["option"] == 3){ // OTRAS SOLICITUDES DE DATOS

    }

 ?>