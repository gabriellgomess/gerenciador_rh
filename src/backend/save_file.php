<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");


$cpf = $_POST['cpf'];
mkdir("arquivos/".$cpf, 0777, true);

$countfiles = count($_FILES['file']['name']);

for($i=0;$i<$countfiles;$i++){
  $filename = $_FILES['file']['name'][$i];
  
  // Upload file
  move_uploaded_file($_FILES['file']['tmp_name'][$i],'./arquivos/'.$cpf.'/' . $filename);   
}

// ***************************************************
// Conexão com o banco de dados utilizando PDO
define('HOST', 'localhost');
define('USER', 'u362384337_root');
define('PASS', 'Isadopai12345@');
define('DBNAME', 'u362384337_hospital');

$sql = "INSERT INTO `documentos` (`cpf`, `path`, `criacao`) VALUES ('$cpf', '$path', NOW());";

try {
    $conn = new PDO('mysql:host=' . HOST . ';dbname=' . DBNAME, USER, PASS);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->exec($sql);
    echo "New record created successfully";
} catch(PDOException $e) {
    echo $sql . "<br>" . $e->getMessage();
} 

// ***************************************************
  


?>