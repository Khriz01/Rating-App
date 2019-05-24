<?php
    if (session_status() == PHP_SESSION_NONE) { //VALIDATE SESSION
    	session_start();
    }

    if (!isset($_SESSION["id_user"])) {
        //header("Location: ../login.php");
        header('Content-Type: application/json');
        echo json_encode(array("status"=>"error", "message"=>"No ha iniciado Sesión"));
        return;
    }

    $id_user = $_SESSION["id_user"];
    $name_user = $_SESSION["name_user"];
    $document_user = $_SESSION['document'];
    $type_user = $_SESSION['type_user'];
    $email_user = $_SESSION['email_user'];
    $id_company_user = $_SESSION['id_company_user'];
    $id_father_user = $_SESSION['id_father_user'];
    $user = $_SESSION['user_user'];
    $master = $_SESSION['master'];
    $screen_lock = $_SESSION['screen_lock'];


  	$data = array('status'=>'success', 'id_user' => $id_user, 'name_user'=>$name_user, 'document_user'=>$document_user, 'type_user'=>$type_user, 'email_user'=>$email_user, 'screen_lock'=>$screen_lock, 'id_company_user'=>$id_company_user, 'id_father_user'=>$id_father_user, 'user'=>$user, 'master'=>$master);
    header('Content-Type: application/json');
  	echo json_encode($data);
    // comentarios
?>
