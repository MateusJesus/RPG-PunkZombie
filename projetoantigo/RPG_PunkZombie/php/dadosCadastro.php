<?php

include_once('config.php');
date_default_timezone_set('America/Sao_Paulo');
if (!empty($_POST['nome']) && !empty($_POST['usuario']) && !empty($_POST['senha'])) {

    $nome = $_POST['nome'];
    $usuario = $_POST['usuario'];
    $senha = $_POST['senha'];
    $data = date('d/m/Y');
    $hora = date('H:i:s');
    $sqlVer = "SELECT usuario FROM usuarios WHERE usuario = '$usuario'";

    $smtpVer = $conn->query($sqlVer);

    if (mysqli_num_rows($smtpVer) != 0) {
        header('Location: ../cadastro.php');
        die;
    }

    $sql = "INSERT INTO usuarios (nome, usuario, senha, data, hora) VALUES ('$nome', '$usuario', '$senha', '$data', '$hora')";

    $smtp = $conn->query($sql);

    if ($smtp) {
        header('Location: ../login.php');
    } else {
        echo 'Erro';
    }
} else {
    header('Location: ../cadastro.php');
}
