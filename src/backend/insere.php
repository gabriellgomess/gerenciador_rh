<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);


// Define as variáveis do $_POST
$admissao = $_POST['admissao'];
$agencia = $_POST['agencia'];
$bairro = $_POST['bairro'];
$cargaHoraria = $_POST['cargaHoraria'];
$cargo = $_POST['cargo'];
$cbo = $_POST['cbo'];
$ccusto = $_POST['ccusto'];
$celular = $_POST['celular'];
$cep = $_POST['cep'];
$cestaBasica = $_POST['cestaBasica'];
$cidade = $_POST['cidade'];
$conta = $_POST['conta'];
$cpf = $_POST['cpf'];
$descAgencia = $_POST['descAgencia'];
$email = $_POST['email'];
$escala = $_POST['escala'];
$estado = $_POST['estado'];
$linhaVT = $_POST['linhaVT'];
$matricula = $_POST['matricula'];
$nascimento = $_POST['nascimento'];
$nome = $_POST['nome'];
$numero = $_POST['numero'];
$pis = $_POST['pis'];
$planoOdonto = $_POST['planoOdonto'];
$planoSaude = $_POST['planoSaude'];
$quantidadeVT = $_POST['quantidadeVT'];
$refeitorio = $_POST['refeitorio'];
$rg = $_POST['rg'];
$rua = $_POST['rua'];
$salario = $_POST['salario'];
$situacao = $_POST['situacao'];
$telefone = $_POST['telefone'];
$tipoConta = $_POST['tipoConta'];



// Conexão com o banco de dados utilizando PDO
define('HOST', 'localhost');
define('USER', 'u362384337_root');
define('PASS', 'Isadopai12345@');
define('DBNAME', 'u362384337_hospital');
if($matricula != '' && $nome != ''){
   $sql = "INSERT INTO `funcionarios` (`admissao`, `agencia`, `bairro`, `cargaHoraria`, `cargo`, `cbo`, `ccusto`, `celular`, `cep`, `cestaBasica`, `cidade`, `conta`, `cpf`, `descAgencia`, `email`, `escala`, `estado`, `linhaVT`, `matricula`, `nascimento`, `nome`, `numero`, `pis`, `planoOdonto`, `planoSaude`, `quantidadeVT`, `refeitorio`, `rg`, `rua`, `salario`, `situacao`, `telefone`, `tipoConta`) VALUES ('$admissao', '$agencia', '$bairro', '$cargaHoraria', '$cargo', '$cbo', '$ccusto', '$celular', '$cep', '$cestaBasica', '$cidade', '$conta', '$cpf', '$descAgencia', '$email', '$escala', '$estado', '$linhaVT', '$matricula', '$nascimento', '$nome', '$numero', '$pis', '$planoOdonto', '$planoSaude', '$quantidadeVT', '$refeitorio', '$rg', '$rua', '$salario', '$situacao', '$telefone', '$tipoConta');";

try {
    $conn = new PDO('mysql:host=' . HOST . ';dbname=' . DBNAME, USER, PASS);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->exec($sql);
    echo "New record created successfully";
} catch(PDOException $e) {
    echo $sql . "<br>" . $e->getMessage();
} 
}



$conn = null;

?>



