<?php

	if (session_status() == PHP_SESSION_NONE) { //VALIDATE SESSION
    	session_start();
    }

    if (!isset($_GET["option"])) { //VALIDATE ACTIONS
 		return;
    }

    require_once("connection/crud.php");//CLASS CRUD

    $object = new crud();

		// TRAER DATOS GENERALES Y LABORALES PARA MOSTRAR EN PANTALLA
    if(isset($_GET['option'])&& $_GET['option']== 8){

        $id_record = isset($_GET['id_record']) ? $_GET['id_record'] : 0;
				$table = isset($_GET['table']) ? $_GET['table'] : "";
				$file_path = isset($_GET['file_path']) ? $_GET['file_path'] : "";
        if ($id_record == 0){
            echo "no hay parametros!";
            return;
        }

        $counter = 0;

        $object->setTable($table);
        $object->setColumn("file_path");
        $object->setCondition("WHERE id = $id_record");
        $object->fnSelect();
				if (count($object->getRow()) > 0){
		        foreach ($object->getRow() as $row) {
		            $counter++;
		            $path1 = "rating_app_backend/" . $row["file_path"];
		          }
		        }
        echo json_encode($object->getRow());
        return;
    }

    // ACTUALIZAR DATOS GENERALES DEL EMPLEADO

    if(isset($_GET['option']) && $_GET['option']==12){
        $id_record = $_POST['id'];
				$table = $_GET['table'];
				$counter=0;
				$object->setTable($table);
        $object->setColumn("file_path");
        $object->setCondition("WHERE id = $id_record");
        $object->fnSelect();
				if (count($object->getRow()) > 0){
		        foreach ($object->getRow() as $row) {
		            $counter++;
		            $path1 = $row["file_path"];
		          }
		        }

        if ($id_record == 0){
        	$return = array("ok" => FALSE, "msg" => "No establecio el id la muestra", "status" => "error");
        }
        else{
	        $field_file = $_POST['field'];
					// $path_file = $_POST['path'];
					$directory = "../../rating_app_backend/";
	        $object->setTable($table);
	        $object->setValue("$field_file = ''");
	        $object->setCondition("WHERE id = $id_record");
	        $resp = $object->fnUpdate();
					if($field_file == "file_path"){
						unlink($directory.$path1);
					}
					//echo "path: " . $path_file;
	        if($resp != 0){
	            $return = array('ok' => TRUE, "msg" => "La imagen ha sido Eliminada", "status" => "success");
	        }
	        else{
	            $return = array('status' => "error", "msg" => $object->getMessage(), "status" => "error");
	        }
        }

        echo json_encode($return);
    }

		if(isset($_GET['option']) && $_GET['option']==13){
        $return = Array("ok"=>TRUE, "msg" => "Imagen Cargada Correctamente", "status" => "success");
				$table = $_GET['table'];
        $upload_folder ='../../rating_app_backend/assets/images/bills';
        $nombre_archivo = $_FILES["archivo"]["name"];
        $tipo_archivo = $_FILES["archivo"]["type"];
        $tamano_archivo = $_FILES["archivo"]["size"];
        $tmp_archivo = $_FILES["archivo"]["tmp_name"];
        $rand_id = mt_rand();
        $archivador = $upload_folder . "/" . $rand_id . $nombre_archivo;
        $id_record = $_POST['id'];
        $field_file = $_POST['field_file'];
        $rutaarchivador = "assets/images/bills/" . $rand_id . $nombre_archivo;
        if (!move_uploaded_file($tmp_archivo, $archivador)) {

        $return = array("ok" => FALSE, "msg" => "Ocurrio un error al subir el archivo. No pudo guardarse.", "status" => "error");
        }
        else{
            $object->setTable($table);
            //$object->setColumn("$field_file");
            $object->setValue("$field_file = '$rutaarchivador'");
            $object->setCondition("WHERE id = $id_record");
            $resp = $object->fnUpdate();
            if($resp != 0){
                $return = array("ok"=>TRUE, "msg" => "Imagen Agregada Correctamente", "status" => "success", "imagen" => $rutaarchivador);
            }
            else{
                $return = array('status' => "error", "msg" => $object->getMessage(), "status" => "error");
            }
        }
        echo json_encode($return);
        return;
    }

		if(isset($_GET['option'])&& $_GET['option']== 9){

        $id_record = isset($_GET['id_record']) ? $_GET['id_record'] : 0;
				$table = isset($_GET['table']) ? $_GET['table'] : "";
				$file_path = isset($_GET['file_path']) ? $_GET['file_path'] : "";
        if ($id_record == 0){
            echo "no hay parametros!";
            return;
        }

        $counter = 0;

        $object->setTable($table);
        $object->setColumn("file_path");
        $object->setCondition("WHERE id = $id_record");
        $object->fnSelect();
				if (count($object->getRow()) > 0){
		        foreach ($object->getRow() as $row) {
		            $counter++;
		            $path1 = $row["file_path"];
		          }
		        }
        echo json_encode($object->getRow());
        return;
    }

    // ACTUALIZAR DATOS GENERALES DEL EMPLEADO

    if(isset($_GET['option']) && $_GET['option']==10){
        $id_record = $_POST['id'];
				$table = $_GET['table'];
				$counter=0;
				$object->setTable($table);
        $object->setColumn("file_path");
        $object->setCondition("WHERE id = $id_record");
        $object->fnSelect();
				if (count($object->getRow()) > 0){
		        foreach ($object->getRow() as $row) {
		            $counter++;
		            $path1 = $row["file_path"];
		          }
		        }

        if ($id_record == 0){
        	$return = array("ok" => FALSE, "msg" => "No establecio el id la muestra", "status" => "error");
        }
        else{
	        $field_file = $_POST['field'];
					// $path_file = $_POST['path'];
					$directory = "../../rating_app_backend/";
	        $object->setTable($table);
	        $object->setValue("$field_file = ''");
	        $object->setCondition("WHERE id = $id_record");
	        $resp = $object->fnUpdate();
					if($field_file == "file_path"){
						unlink($directory.$path1);
					}
					//echo "path: " . $path_file;
	        if($resp != 0){
	            $return = array('ok' => TRUE, "msg" => "La imagen ha sido Eliminada", "status" => "success");
	        }
	        else{
	            $return = array('status' => "error", "msg" => $object->getMessage(), "status" => "error");
	        }
        }

        echo json_encode($return);
    }

		if(isset($_GET['option']) && $_GET['option']==11){
        $return = Array("ok"=>TRUE, "msg" => "Imagen Cargada Correctamente", "status" => "success");
				$table = $_GET['table'];
        $upload_folder ='../../rating_app_backend/assets/images/products';
        $nombre_archivo = $_FILES["archivo"]["name"];
        $tipo_archivo = $_FILES["archivo"]["type"];
        $tamano_archivo = $_FILES["archivo"]["size"];
        $tmp_archivo = $_FILES["archivo"]["tmp_name"];
        $rand_id = mt_rand();
        $archivador = $upload_folder . "/" . $rand_id . $nombre_archivo;
        $id_record = $_POST['id'];
        $field_file = $_POST['field_file'];
        $rutaarchivador = "assets/images/products/" . $rand_id . $nombre_archivo;
        if (!move_uploaded_file($tmp_archivo, $archivador)) {

        $return = array("ok" => FALSE, "msg" => "Ocurrio un error al subir el archivo. No pudo guardarse.", "status" => "error");
        }
        else{
            $object->setTable($table);
            //$object->setColumn("$field_file");
            $object->setValue("$field_file = '$rutaarchivador'");
            $object->setCondition("WHERE id = $id_record");
            $resp = $object->fnUpdate();
            if($resp != 0){
                $return = array("ok"=>TRUE, "msg" => "Imagen Agregada Correctamente", "status" => "success", "imagen" => $rutaarchivador);
            }
            else{
                $return = array('status' => "error", "msg" => $object->getMessage(), "status" => "error");
            }
        }
        echo json_encode($return);
        return;
    }

 ?>
