<?php {

    require_once("connection/crud.php");
    $filter = isset($_GET["filter"])? $_GET["filter"]: 1;
    //echo "Valor de Filtro: " . $filter;
    if($filter == 1) {   //RETRIEVE FOR MAIN TABLE

        $user_name = isset($_POST['user_name'])?$_POST['user_name']:'' ;
        $password = isset($_POST['password'])?$_POST['password']:'';

        $object = new crud();
        $object->setTable("users");

        $object->setColumn('*');
        $object->setCondition("WHERE user='$user_name' AND (password = upper('$password') OR password = '*****') AND active=1"); // AND active=1
        $object->fnSelect();
        if (count($object->getRow()) > 0) {
            foreach ($object->getRow() as $record) {
                session_start();
                $_SESSION["id_user"] = $record['id'];
                $_SESSION["name_user"] = $record['name'];
                $_SESSION['document'] = $record['document'];
                $_SESSION['type_user'] = $record['type'];
                $_SESSION['email_user'] = $record['email'];
                $_SESSION['id_company_user'] = $record['id_company'];
                $_SESSION['id_father_user'] = $record['id_father'];
                $_SESSION['user_user'] = $record['user'];
                $_SESSION['master'] = $record['master'];
                $_SESSION['screen_lock'] = false;
                if ($record['password'] == "*****") {
                    $_SESSION["password"] = 0;
                    echo 2;
                } else {
                    $_SESSION["password"] = 1;
                    echo 1;
                }
            }
        } else {
            echo 3;
        }
        return;
    }
}
?>
