<?php
    session_start();
    if(isset($_POST['submit']) && !empty($_POST['admusuario']) && !empty($_POST['admsenha']))
    {
        include_once('../php/config.php');
        $usuario = $_POST['admusuario'];
        $senha = $_POST['admsenha'];

        $sql = "SELECT * FROM usuarios WHERE usuario = '$usuario' and senha = '$senha' and adm = 'sim'";

        $result = $conn->query($sql);

        if(mysqli_num_rows($result) < 1)
        {
            unset($_SESSION['admusuario']);
            unset($_SESSION['admsenha']);
            header('Location: admlogin.php');
            session_destroy();
        }
        else
        {
            $_SESSION['admusuario'] = $usuario;
            $_SESSION['admsenha'] = $senha;
            header('Location: adm.php');
        }
    }
    else
    {
        unset($_SESSION['admusuario']);
        unset($_SESSION['admsenha']);
        header('Location: admlogin.php');
        session_destroy();
    }
?>