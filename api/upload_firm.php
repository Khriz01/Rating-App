<?php
require_once('connection/crud.php');
$return = Array("ok"=>TRUE, "message" => "Imagen Cargada Correctamente", "status" => "success");
$id_record = isset($_POST['id_record'])?$_POST['id_record']:"";
$table = isset($_POST['table_name'])?$_POST['table_name']:"";
$field = isset($_POST['field_name'])?$_POST['field_name']:"";
$image = isset($_POST['imgBase64'])?$_POST['imgBase64']:"";

try{
  $rand_id = "firm_" . mt_rand();
  $name_image = save_base64_image($image, $rand_id,"../../rating_app_backend/assets/images/gallery/");
  $name_image_db = "rating_app_backend/assets/images/gallery/" . $rand_id . ".png";

  if($table != ""){
      $object = new crud();
      $object->setTable($table);
      //$object->setColumn("$field_file");
      $object->setValue("$field = '$name_image_db'");
      $object->setCondition("WHERE id = $id_record");
      $resp = $object->fnUpdate();
      if($resp != 0){
          $return = array("ok"=>TRUE, "message" => "Imagen Agregada Correctamente", "status" => "success", "imagen" => $name_image_db);
      }
      else{
          $return = array('status' => "error", "message" => $object->getMessage(), "status" => "error");
      }
    }
    $return['archivo'] = $name_image_db;
    echo json_encode($return);

}
catch (Exception $ex){
  $return = array('status' => 'error', 'message'=>$ex->getMessage());
  echo json_encode($return);
}

return;

function save_base64_image($base64_image_string, $output_file_without_extension, $path_with_end_slash="" ) {
    //usage:  if( substr( $img_src, 0, 5 ) === "data:" ) {  $filename=save_base64_image($base64_image_string, $output_file_without_extentnion, getcwd() . "/application/assets/pins/$user_id/"); }
    //
    //data is like:    data:image/png;base64,asdfasdfasdf
    $splited = explode(',', substr( $base64_image_string , 5 ) , 2);
    $mime=$splited[0];
    $data=$splited[1];

    $mime_split_without_base64=explode(';', $mime,2);
    $mime_split=explode('/', $mime_split_without_base64[0],2);
    if(count($mime_split)==2)
    {
        $extension=$mime_split[1];
        if($extension=='jpeg')$extension='jpg';
        //if($extension=='javascript')$extension='js';
        //if($extension=='text')$extension='txt';
        $output_file_with_extension=$output_file_without_extension.'.'.$extension;
    }
    file_put_contents( $path_with_end_slash . $output_file_with_extension, base64_decode($data) );
    return $output_file_with_extension;
}

















$upload_folder ='../../rating_app_backend/assets/images/gallery/';
$nombre_archivo = $_FILES["archivo"]["name"];
$tipo_archivo = $_FILES["archivo"]["type"];
$tamano_archivo = $_FILES["archivo"]["size"];
$tmp_archivo = $_FILES["archivo"]["tmp_name"];
$rand_id = mt_rand();
$archivador = $upload_folder . "/" . $rand_id . $nombre_archivo;
$rutaarchivador = "assets/images/gallery/" . $rand_id . $nombre_archivo;
if (!move_uploaded_file($tmp_archivo, $archivador)) {

  $return = array("ok" => FALSE, "msg" => "Ocurrio un error al subir el archivo. No pudo guardarse.", "status" => "error");
  echo json_encode($return);
  return;
}
else{
    if($table != ""){
      $object->setTable($table);
      //$object->setColumn("$field_file");
      $object->setValue("$field_file = '$rutaarchivador'");
      $object->setCondition("WHERE id = $id_record");
      $resp = $object->fnUpdate();
      if($resp != 0){
          $return = array("ok"=>TRUE, "message" => "Imagen Agregada Correctamente", "status" => "success", "imagen" => $rutaarchivador);
      }
      else{
          $return = array('status' => "error", "message" => $object->getMessage(), "status" => "error");
      }
    }
    $return['archivo'] = $rutaarchivador;
  echo json_encode($return);
  return;
}
