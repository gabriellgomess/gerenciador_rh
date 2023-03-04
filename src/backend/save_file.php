<?php

$cpf = $_POST['cpf'];
// Verifica se algum arquivo foi enviado pelo formulário
if ($_FILES) {
  
  // Nome da pasta onde os arquivos serão armazenados
  $upload_dir = 'arquivos/'.$cpf;
  
  // Cria a pasta caso ela não exista
  if (!file_exists($upload_dir)) {
    mkdir($upload_dir, 0777, true);
  }
  
  // Percorre cada arquivo enviado
  foreach ($_FILES['arquivos']['error'] as $key => $error) {
    
    // Se não houve erro no envio do arquivo
    if ($error == UPLOAD_ERR_OK) {
      
      // Obtém o nome original do arquivo
      $name = $_FILES['arquivos']['name'][$key];
      
      // Obtém o nome temporário do arquivo
      $tmp_name = $_FILES['arquivos']['tmp_name'][$key];
      
      // Define o caminho onde o arquivo será armazenado
      $path = $upload_dir . basename($name);
      
      // Move o arquivo para o caminho definido
      move_uploaded_file($tmp_name, $path);
      
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
      
    } else {
      echo 'Erro no envio do arquivo ' . $_FILES['arquivos']['name'][$key] . ': ' . $error . '<br>';
    }
    
  }
  
}
?>