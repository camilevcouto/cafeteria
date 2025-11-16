<?php
session_start();
include "conexao.php";

$email = isset($_POST['email']) ? $conn->real_escape_string($_POST['email']) : '';
$senha_raw = isset($_POST['senha']) ? $_POST['senha'] : '';
$senha = md5($senha_raw); 

$sql = "SELECT * FROM usuarios WHERE email='$email' AND senha='$senha' LIMIT 1";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $_SESSION['logado'] = true;
    header("Location: painel.php");
    exit;
} else {
    
    header("Location: login.html?erro=1");
    exit;
}
?>