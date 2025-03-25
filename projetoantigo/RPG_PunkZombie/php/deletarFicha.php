<?php
session_start();
include_once('config.php');
if ((!isset($_SESSION['usuario']) == true) and (!isset($_SESSION['senha']) == true)) {
    session_destroy();
    header("Location: ../index.php");
    exit();
}else{
    $id = $_GET['id'];
    $usuario = $_SESSION['usuario'];
    
    $sqlVer = "SELECT * FROM fichas WHERE id_ficha='$id'";
    $result = $conn->query($sqlVer);
    $ficha = $result->fetch_assoc();
    $caminhoImagemAntiga = "../" . $ficha['imagem'];
    if (file_exists($caminhoImagemAntiga)) {
        unlink($caminhoImagemAntiga);
    }

    $sql = "DELETE FROM fichas WHERE id_ficha = '$id' and usuario = '$usuario'";

    $conn->query($sql);

    header('Location: ../fichas.php');
}
?>