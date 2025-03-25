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
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.css"
        integrity="sha512-hvNR0F/e2J7zPPfLC9auFe3/SE0yG4aJCOd/qxew74NN7eyiSKjr7xJJMu1Jy2wf7FXITpWS1E/RY8yzuXN7VA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="css/styleGeral.css">
    <link rel="stylesheet" href="css/mediaqueries.css">

    <title>RPG | PunkZombie</title>
</head>

<body>
    <div class="paginas">
        <div id="pag1" class="pagina ativo">
            <div class="pagina_inicial">
                <div id="area_fichas" class="area_fichas">
                </div>
                <a class="botaoAdicionar" href='login.php'>Logar</a>
                <a class="botaoAdicionar" href='cadastro.php'>Cadastre-se</a>
            </div>
        </div>
    </div>
</body>

</html>