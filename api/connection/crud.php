<?php
require_once("connection.php");
class crud
{
    #FIELDS
    private $table, $row = array(), $column, $condition, $value, $placeholder, $message;
    #PROPERTIES
    public function getTable()
    {
        return $this->table;
    }
    public function setTable($pValue)
    {
        $this->table = $pValue;
    }
    public function getRow()
    {
        return $this->row;
    }
    public function getRecord(){
        if(count($this->getRow())>0){
            return $this->row[0];    
        }
        else{
            $array_vacio = array();
            return $array_vacio;
        }
    }
    public function setRow($pValue)
    {
        $this->row = $pValue;
    }
    public function getColumn()
    {
        return $this->column;
    }
    public function setColumn($pValue)
    {
        $this->column = $pValue;
    }
    public function getCondition()
    {
        return $this->condition;
    }
    public function setCondition($pValue)
    {
        $this->condition = $pValue;
    }
    public function getValue()
    {
        return $this->value;
    }
    public function setValue($pValue)
    {
        $this->value = $pValue;
    }
    public function getPlaceHolder()
    {
        return $this->placeholder;
    }
    public function setPlaceholder($pValue)
    {
        $this->placeholder = $pValue;
    }
    public function getMessage()
    {
        return $this->message;
    }
    #METHODS
    #SELECT
    public function fnSelect()
    {
        try {
            $model = new connection();
            $connection = $model->fnConnect();
            if (empty($this->condition) ||is_null($this->condition)){
                $result = $connection->prepare("SELECT $this->column FROM $this->table");
            }
            else{
                $result = $connection->prepare("SELECT $this->column FROM $this->table $this->condition");
            }
            $array = explode("|", $this->placeholder);
            for ($i = 1; $i <= count($array); $i++)
                $result->bindParam($i, $array[$i - 1]);
            if ($result) {
                $result->execute();
                while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                    $this->row[] = $row;
                }
                return 1;
            }
            return 0;
        } catch (Exception $e) {
            return "Error al Seleccionar:" . $e->getMessage();
        }
    }

    #INSERT
    public function fnInsert()
    {
        $cNew_Data = "INSERT INTO $this->table ($this->column()) VALUES($this->value())";
        //$this->fnRegLogs($this->getTable(), "INSERT", $cNew_Data, "");
        try {
            $model = new connection();
            $connection = $model->fnConnect();
            $result = $connection->prepare("INSERT INTO $this->table ($this->column) VALUES($this->value)");
            $array = explode("|", $this->placeholder);
            $this->message = "Error al insertar";
            for ($i = 1; $i <= count($array); $i++)
                $result->bindParam($i, $array[$i - 1]);
            if ($result) {
                $result->execute();
                $this->message = "Registro Almacenado Correctamente!";
                return 1;
            }
            return 0;
        } catch (Exception $e) {
            return $this->message = $e->getMessage();
        }
    }
    #INSERT WITH LAST ID
    public function fnInsertReturnId()
    {
        $cNew_Data = "INSERT INTO $this->table ($this->column) VALUES($this->value)";
        //$this->fnRegLogs($this->table, "INSERT", $cNew_Data, "");
        try {
            $model = new connection();
            $connection = $model->fnConnect();
            $connection->setAttribute(PDO::ATTR_EMULATE_PREPARES, TRUE);
            $result = $connection->prepare("INSERT INTO $this->table ($this->column) VALUES($this->value)");
            $array = explode("|", $this->placeholder);
            $this->message = "Error al Crear, Verifique que NO Exista otro Registro con el Mismo Nombre de ";
            for ($i = 1; $i <= count($array); $i++)
                $result->bindParam($i, $array[$i - 1]);
            if ($result) {
                $result->execute();
                $this->message = "Registro Almacenado Correctamente!";
                $lastInsert = $connection->lastInsertId();
                return $lastInsert;
            }
            return 0;
        } catch (Exception $e) {
            return $this->message = $e->getMessage();
        }
    }

    #UPDATE
    public function fnUpdate()
    {
        $cNew_Data = "UPDATE $this->table SET $this->value $this->condition";
        //$this->fnRegLogs($this->getTable(), "UPDATE", $cNew_Data, $this->getCondition());
        try {
            $model = new connection();
            $connection = $model->fnConnect();
            //$cValuesUpdate = $this->renderizeData(json_decode($this->getColumn()), json_decode($this->getValue()));
            //echo $cValuesUpdate;
            $result = $connection->prepare("UPDATE $this->table SET $this->value $this->condition");
            $array = explode("|", $this->placeholder);
            for ($i = 1; $i <= count($array); $i++)
                $result->bindParam($i, $array[$i - 1]);
            if ($result) {
                $result->execute();
                $this->message = "Registro Actualizado Correctamente";
                return 1;
            }
            return 0;
        } catch (Exception $e) {
            return $this->message = $e->getMessage();
            //return 0;
        }
    }

    #DELETE
    public function fnDelete(){
        
        //$this->fnRegLogs($this->getTable(), "DELETE", "", $this->getCondition());
        try {
            $model = new connection();
            $connection = $model->fnConnect();
            $result = $connection->prepare("DELETE FROM $this->table $this->condition");
            $array = explode("|", $this->placeholder);
            $this->message = "Error al eliminar, verifique que otros registros NO dependen de ";
            for ($i = 1; $i <= count($array); $i++) {
                $result->bindParam($i, $array[$i - 1]);
            }
            if ($result) {
                $result->execute();
                $this->message = "Registro Eliminado Correctamente";
                return 1;
            }
            return 0;
        } catch (Exception $e) {
            $this->message = $e->getMessage();
        }
    }

    // Esta funcion renderiza la informacion que sera enviada a la base de datos
    private function renderizeData($keys, $values) {
        $str = "";
        foreach ($keys as $key => $value) {
            if($key == count($keys) - 1) {
                $str = $str . $value . "='" . $values[$key] . "'";
            } else {
                $str = $str . $value . "='" . $values[$key] . "',"; 
            }
        }
        return $str;
    }

    public function fnRegLogs($cTable_Afect = "", $log_action = "", $new_data_record = "", $condition_update = ""){

        $cLog_Action = $log_action;
        $cTable_Afect_Record = $cTable_Afect;
        $cNew_Data_Record = str_replace("'", "",$new_data_record);
        $cCondition_Update = $condition_update;
        $cOld_Data_Record = '';
        $nRecord_Afect = 0;

        If ($cCondition_Update != ""){
            $cTable_Select = $this->getTable();
            $cComm_RegLog = "SELECT * FROM $cTable_Afect_Record $cCondition_Update";
            $model = new connection();
            $connection = $model->fnConnect();
            $row_RegLog_Data = array();
            $final_data = "" ;
            $result_RegLog = $connection->prepare($cComm_RegLog);
            $array_RegLog = explode("|", $this->placeholder);
            for ($i = 1; $i <= count($array_RegLog); $i++)
                $result_RegLog->bindParam($i, $array_RegLog[$i - 1]);
            if ($result_RegLog) {
                $result_RegLog->execute();
                while ($row_RegLog = $result_RegLog->fetch(PDO::FETCH_ASSOC)) {
                    $row_RegLog_Data[] = $row_RegLog;
                }
                // print_r($row_RegLog_Data) . "<br>";
                if($row_RegLog_Data != array()){
                    $ext_campos = $row_RegLog_Data[0];
                    $count = 0;
                    $field_list = "";
                    foreach($ext_campos as $campo=>$valor){
                        $field_list .= $campo;
                        $count++;
                        if($count < count($ext_campos)){
                            $field_list .= ", ";
                        }
                    }
                    $final_value = "";
                    $count_data = 0;
                    foreach($row_RegLog_Data as $registro){
                        $count_data++;
                        $count = 0;
                        $current_value = "";
                        foreach($registro as $campo=>$valor){
                            $current_value .= $valor;
                            $count++;
                            if($count < count($registro)){
                                $current_value .= ", ";
                            }
                        }
                        $current_value = "($current_value)";
                        $final_value .= $current_value;
                        if ($count_data < count($row_RegLog_Data)){
                            $final_value .= ", ";
                        }
                        $nRecord_Afect++;
                        //echo $current_value . "<br>";
                    }
                    $final_value = "VALUES($final_value)";
                    $final_data = "FIELDS($field_list) $final_value";
                    $cOld_Data_Record = $final_data;
                }
                else{
                    //echo "El array esta vacío";
                }
            }
        }

        //echo $nRecord_Afect . "<br>";
        //echo $cOld_Data_Record ."<br>";
        $id_user_log = isset($_SESSION["id_user"])?$_SESSION["id_user"]:0;
        if (strtoupper($log_action) == "UPDATE" || strtoupper($log_action)=="DELETE"){
            if ($nRecord_Afect != 0){
                $model = new connection();
                $connection = $model->fnConnect();
                $current_date = date("Y-m-d h-i-s");
                $result = $connection->prepare("INSERT INTO sys_logs (log_date, id_user, log_action, new_data, old_data, table_name) VALUES('$current_date', '$id_user_log', '$log_action', '$cNew_Data_Record', '$cOld_Data_Record', '$cTable_Afect')");
                $array = explode("|", $this->placeholder);
                $this->message = "Error al insertar";
                for ($i = 1; $i <= count($array); $i++)
                    $result->bindParam($i, $array[$i - 1]);
                if ($result) {
                    $result->execute();
                    //$this->message = "Registro Almacenado Correctamente!";
                    //return 1;
                }
            }
        }
        else{
            $model = new connection();
            $connection = $model->fnConnect();
            $current_date = date("Y-m-d h-i-s");
            $result = $connection->prepare("INSERT INTO sys_logs (log_date, id_user, log_action, new_data, old_data, table_name) VALUES('$current_date', '$id_user_log', '$log_action', '$cNew_Data_Record', '$cOld_Data_Record', '$cTable_Afect')");
            $array = explode("|", $this->placeholder);
            $this->message = "Error al insertar";
            for ($i = 1; $i <= count($array); $i++)
                $result->bindParam($i, $array[$i - 1]);
            if ($result) {
                $result->execute();
                //$this->message = "Registro Almacenado Correctamente!";
                //return 1;
            }

        }

    }

}
