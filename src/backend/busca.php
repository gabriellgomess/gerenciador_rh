<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");


// Conexão com o banco de dados utilizando PDO
define('HOST', 'localhost');
define('USER', 'u362384337_root');
define('PASS', 'Isadopai12345@');
define('DBNAME', 'u362384337_hospital');

// Busca 

$sql = "SELECT * FROM funcionarios";

try {
    $conn = new PDO('mysql:host=' . HOST . ';dbname=' . DBNAME, USER, PASS);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($result);
} catch (PDOException $e) {
    echo 'ERROR: ' . $e->getMessage();
}



?>