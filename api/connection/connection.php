<?php
class connection {
    #FIELDS
    private static $dbHost = "localhost", $dbUser = "root", $dbPass = "khriz";
    private $dbName = "rating_app", $query = "", $connection;
    //private $dbName = "pn", $query = "", $connection;
    #PROPERTIES
    protected function getDbName(){ return $this->dbName; }
    protected function setDbName($pValue){ $this->dbName = $pValue; }
    protected function getQuery(){ return $this->query; }
    protected function setQuery($pValue){ $this->query = $pValue; }
    #METODOS
    #CONNECT
    public function fnConnect(){
        try{
            $this->connection = new PDO("mysql:host=".self::$dbHost.";dbname=$this->dbName;charset=utf8",self::$dbUser,self::$dbPass);//no estabas definiendo el charset a UTF8
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch(PDOException $ex) {
            echo "Error de Conexion a la Base de Datos: \n" . $ex->getMessage();
            die();
        }
        return $this->connection;
    }
    #DISCONNECT
    public function fnDisconnect(){ $this->connection = null; }
}
