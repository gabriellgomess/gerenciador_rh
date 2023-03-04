<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);


// Define as variáveis do $_POST
$usuario = $_POST['email'];
$senha = $_POST['password'];

// Conexão com o banco de dados utilizando PDO
define('HOST', 'localhost');
define('USER', 'u362384337_root');
define('PASS', 'Isadopai12345@');
define('DBNAME', 'u362384337_hospital');

// Busca od dados do banco de dados

$sql = "SELECT * FROM usuarios WHERE usuario = '$usuario' AND senha = '$senha'";

// Verificando quantos registros foram encontrados

try {
    $conn = new PDO('mysql:host=' . HOST . ';dbname=' . DBNAME, USER, PASS);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $count = $stmt->rowCount();
    if ($count == 1) {
        echo json_encode($result);
    } else {
        echo "Usuário ou senha incorretos";
    }
} catch (PDOException $e) {
    echo 'ERROR: ' . $e->getMessage();
}

$conn = null;

?>