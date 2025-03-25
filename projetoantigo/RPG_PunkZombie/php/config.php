<?php 

$hostName = 'localhost';
$userName = 'root';
$pass = '';
$bgName = 'rpg_punkzombie';

$conn = new mysqli($hostName, $userName, $pass, $bgName);


if ($conn -> connect_error) {
    die('erro de conexão');
}

$conn->set_charset("utf8mb4");

?>