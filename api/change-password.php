<?php 

    if (session_status() == PHP_SESSION_NONE) { //VALIDATE SESSION
    	session_start();
    }

    if (!isset($_GET["option"])) { //VALIDATE ACTIONS
 		return;
    }

    if (isset($_GET["option"])) {

        if($_GET["option"] == 1) { // DESBLOQUEAR SISTEMA
            require_once("connection/crud.php");
            $object = new crud();
            $id_user = $_SESSION["id_user"];
            $current_password = isset($_POST['current_password'])?$_POST['current_password']:"";
            $new_password = isset($_POST['new_password'])?$_POST['new_password']:"";
            $object->setTable('users');
            $object->setColumn('*');
            $object->setCondition('WHERE id= ' . $id_user . " AND upper(password) = '" . $current_password . "'");
            $object->fnSelect();
            if (count($object->getRow()) > 0) {
                $object->setTable('users');
                $object->setValue("password='" . $new_password . "'");
                $object->setCondition('WHERE id= ' . $id_user);
                $result = $object->fnUpdate();
                echo $result;
            }
            else{
                echo 2;
            }
            return;
    	}
        else if($_GET["option"] == 2) { // CAMBIAR CONTRASEÑA PARA EL PRIMER USO O CUANDO EL ADMIN RESETEA LA CONTRASEÑA.
            $id_user = $_SESSION["id_user"];
            $new_password = isset($_POST['new_password'])?$_POST['new_password']:"";
            require_once("connection/crud.php");
            $object = new crud();
            $object->setTable('users');
            $object->setValue("password='" . $new_password . "'");
            $object->setCondition('WHERE id= ' . $id_user);
            $result = $object->fnUpdate();
            if($result==1){
                echo $result;
            }
            else{
                echo 2;
            }
            return;
        }
    }

 ?>