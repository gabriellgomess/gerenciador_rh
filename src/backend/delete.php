<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$cpf = $_POST['cpf'];

define('HOST', 'localhost');
define('USER', 'u362384337_root');
define('PASS', 'Isadopai12345@');
define('DBNAME', 'u362384337_hospital');

$sql = "DELETE FROM `funcionarios` WHERE `cpf` = '$cpf'";

try {
    $conn = new PDO('mysql:host=' . HOST . ';dbname=' . DBNAME, USER, PASS);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->exec($sql);
    echo "Record deleted successfully";
} catch (PDOException $e) {
    echo 'ERROR: ' . $e->getMessage();
}

?>