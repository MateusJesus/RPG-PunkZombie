<?php 

session_start();
if ((isset($_SESSION['usuario']) == true) and (isset($_SESSION['senha']) == true)) {
    header('Location: fichas.php');
    die;
}
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/root.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="css/styleGeral.css">
    <link rel="stylesheet" href="css/mediaqueries.css">
    <title>Cadastro | PunkZombie</title>
</head>

<header>
    <a class="botaovoltar" href="index.php"><i class="bi bi-arrow-left"></i></a>
</header>

<body>
    <div class="login">
        <div class="box">
            <h1 class="title_content">Cadastre-se</h1>
            <form action="php/dadosCadastro.php" method="POST">
                <div class="email">
                    <label for="nome">Nome:</label><br>
                    <input maxlength="45" type="text" name="nome" placeholder="Digite seu nome" required>
                </div>
                <div>
                    <label for="usuario">Usuario:</label><br>
                    <input maxlength="45" type="text" name="usuario" placeholder="Digite seu usuario" required>
                </div>
                <div>
                    <label for="senha">Senha:</label><br>
                    <input maxlength="45" type="password" name="senha" placeholder="Digite sua senha" required>
                </div>
                <input class="botaoInput" type="submit" name="submit" value="Cadastrar">
            </form>
        </div>
    </div>
</body>

</html>