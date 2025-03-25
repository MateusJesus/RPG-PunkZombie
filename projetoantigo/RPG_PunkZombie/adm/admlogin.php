<?php
session_start();
if ((isset($_SESSION['admusuario']) == true) and (isset($_SESSION['admsenha']) == true)) {
    header('Location: adm.php');
    die;
}
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/root.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.css" integrity="sha512-hvNR0F/e2J7zPPfLC9auFe3/SE0yG4aJCOd/qxew74NN7eyiSKjr7xJJMu1Jy2wf7FXITpWS1E/RY8yzuXN7VA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="../css/styleGeral.css">
    <link rel="stylesheet" href="../css/mediaqueries.css">
    <title>Login Adm | PunkZombie</title>
</head>


<body>
    <header>
        <a class="botaovoltar" href="../index.php"><i class="bi bi-arrow-left"></i></a>
    </header>

    <div class="login">
        <div class="box">
            <h1 class="title_content">Login adm</h1>
            <form action="admdadosLogin.php" method="POST">
                <div class="email">
                    <label for="admusuario">Usuario:</label><br>
                    <input maxlength="45" type="usuario" name="admusuario" placeholder="Digite seu usuario" required>
                </div>
                <div>
                    <label for="admsenha">Senha:</label><br>
                    <input maxlength="45" type="password" name="admsenha" placeholder="Digite sua senha" required>
                </div>
                <input class="botaoInput" type="submit" name="submit" value="Logar">
            </form>
        </div>
    </div>
</body>

</html>