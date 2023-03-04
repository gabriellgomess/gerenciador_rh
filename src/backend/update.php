<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);


// Define as variáveis do $_POST
$id = $_POST['id'];
$admissao = $_POST['admissao'];
$demissao = $_POST['demissao'];
$agencia = $_POST['agencia'];
$bairro = $_POST['bairro'];
$cargaHoraria = $_POST['cargaHoraria'];
$cargo = $_POST['cargo'];
$registro = $_POST['registro'];
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

echo json_encode($_POST);

// Conexão com o banco de dados utilizando PDO
define('HOST', 'localhost');
define('USER', 'u362384337_root');
define('PASS', 'Isadopai12345@');
define('DBNAME', 'u362384337_hospital');

$sql = "UPDATE funcionarios SET admissao = '$admissao', demissao = '$demissao', agencia = '$agencia', bairro = '$bairro', cargaHoraria = '$cargaHoraria', cargo = '$cargo', registro = '$registro', cbo = '$cbo', ccusto = '$ccusto', celular = '$celular', cep = '$cep', cestaBasica = '$cestaBasica', cidade = '$cidade', conta = '$conta', cpf = '$cpf', descAgencia = '$descAgencia', email = '$email', escala = '$escala', estado = '$estado', linhaVT = '$linhaVT', matricula = '$matricula', nascimento = '$nascimento', nome = '$nome', numero = '$numero', pis = '$pis', planoOdonto = '$planoOdonto', planoSaude = '$planoSaude', quantidadeVT = '$quantidadeVT', refeitorio = '$refeitorio', rg = '$rg', rua = '$rua', salario = '$salario', situacao = '$situacao', telefone = '$telefone', tipoConta = '$tipoConta' WHERE matricula = '$matricula'";

try {
    $conn = new PDO('mysql:host=' . HOST . ';dbname=' . DBNAME, USER, PASS);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->exec($sql);
    echo "cadastro atualizado com sucesso";
} catch(PDOException $e) {
    echo $sql . "<br>" . $e->getMessage();
}

$conn = null;

?>
