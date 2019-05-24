<?php 

    if (session_status() == PHP_SESSION_NONE) { //VALIDATE SESSION
    	session_start();
    }

    if (!isset($_GET["option"])) { //VALIDATE ACTIONS
 		return;
    }

    if (isset($_GET["option"])) {

    	if ($_GET["option"] == 1) { // ACTIVAR LA VARIABLE PARA BLOQUEAR SISTEMA
    		//echo "entro a la opcion 1";
    		$_SESSION['screen_look'] = true;
    	}
    	else if($_GET["option"] == 2) { // DESBLOQUEAR SISTEMA
            require_once("connection/crud.php");
            $object = new crud();
            $id_user = $_SESSION["id_user"];
            $password_user = isset($_POST['password'])?$_POST['password']:"";
            $object->setTable('users');
            $object->setColumn('*');
            $object->setCondition('WHERE id= ' . $id_user . " AND upper(password) = '" . $password_user . "'");
            $object->fnSelect();
            if (count($object->getRow()) > 0) {
                $_SESSION['screen_look'] = false;
                echo 1;
            }
            else{
                echo 2;
            }

    	}
    }
    	

 ?>