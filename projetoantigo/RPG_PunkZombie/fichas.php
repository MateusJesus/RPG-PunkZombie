<?php
session_start();
include_once('php/config.php');
if ((!isset($_SESSION['usuario']) == true) and (!isset($_SESSION['senha']) == true)) {
    session_destroy();
    header("Location: index.php");
    exit();
}

if (isset($_GET['tema'])) {
    $tema = $_GET['tema'];
    $logado = $_SESSION['usuario'];
    $sqlver = "UPDATE usuarios SET tema='$tema' WHERE usuario = '$logado'";
    $resultver = $conn->query($sqlver);
    header("Location: fichas.php");
}

$logado = $_SESSION['usuario'];
$sqlver = "SELECT * FROM fichas WHERE usuario = '$logado'";
$resultver = $conn->query($sqlver);
date_default_timezone_set('America/Sao_Paulo');
?>

<!DOCTYPE html>
<html lang="pt-br" class="    
<?php
$logado = $_SESSION['usuario'];
$sqlvertema = "SELECT * FROM usuarios WHERE usuario = '$logado'";
$resultvertema = $conn->query($sqlvertema);
$rowtema = $resultvertema->fetch_assoc();
print_r($rowtema['tema'] == 'escuro' ? 'dark_mode' : '');
?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/root.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.css" integrity="sha512-hvNR0F/e2J7zPPfLC9auFe3/SE0yG4aJCOd/qxew74NN7eyiSKjr7xJJMu1Jy2wf7FXITpWS1E/RY8yzuXN7VA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="css/styleGeral.css">
    <link rel="stylesheet" href="css/mediaqueries.css">

    <title>Fichas | PunkZombie</title>
</head>



<!-- <header>
    <div class="cab">
        <a class="botaosair" href="php/sair.php"><i class="bi bi-box-arrow-left"></i></a>
    </div>
</header> -->

<body>

    <div class="sideBar">
        <div class="sideBarCOntent">
            <div class="botaoSidebar"><i class="bi bi-justify"></i></div>
            <a>
                <span><img src="assets/letreiro_punkzombie.png" alt="letreiro punkzombie"></span>
            </a>
            <hr>
            <div class="opSidebar">
                <ul class="opcoesSidebar">
                    <a href="https://docs.google.com/document/d/1jN-JCTJDC75_bRA9wwYY49Kt8M3fWQFQzQb2TTo_HuQ/edit?usp=sharing" target="_blank">
                        <li>
                            <i class="bi bi-file-text"> Link do Sistema</i>
                        </li>
                    </a>
                    <a>
                        <li onclick="listaSidebar2()">
                            <i class="bi bi-mask"> Tema</i><i id="setaFichasSidebar2" class="bi-chevron-down"></i>
                        </li>
                        <ul class="listaFichasSidebar" id="listaFichasSidebar2">
                            <a href="fichas.php?tema=escuro">
                                <li class="<?php print_r($rowtema['tema'] == 'escuro' ? 'ativo' : ''); ?>">
                                    <i class="bi bi-moon"> Modo escuro</i>
                                </li>
                            </a>
                            <a href="fichas.php?tema=claro">
                                <li class="<?php print_r($rowtema['tema'] == 'claro' ? 'ativo' : ''); ?>">
                                    <i class="bi bi-sun"> Modo claro</i>
                                </li>
                            </a>
                        </ul>
                    </a>
                    <a>
                        <li onclick="listaSidebar()">
                            <i class="bi bi-view-list"> Fichas</i><i id="setaFichasSidebar" class="bi-chevron-down"></i>
                        </li>
                        <ul class="listaFichasSidebar overflow" id="listaFichasSidebar">
                            <?php
                            $logado = $_SESSION['usuario'];
                            $sqlver = "SELECT * FROM fichas WHERE usuario = '$logado'";
                            $resultver = $conn->query($sqlver);
                            if ($resultver->num_rows > 0) {
                                while ($row = $resultver->fetch_assoc()) {
                                    $dadosArray = json_decode($row["informacoes"], true); ?>
                                    <a href="editarFicha.php?id=<?php echo $row['id_ficha'] ?>">
                                        <li class="itemListaSidebar">
                                            <?php print_r(isset($dadosArray['nome_personagem']) ? $dadosArray['nome_personagem'] : 'Sem nome'); ?>
                                        </li>
                                    </a>
                            <?php }
                            } ?>
                        </ul>
                    </a>
                </ul>
                <ul class="opcoesSidebar">
                    <a class="botaosair" href="php/sair.php">
                        <li class="">
                            <i class="bi bi-box-arrow-left"> Sair</i>
                        </li>
                    </a>
                </ul>
            </div>
        </div>
    </div>
    <div class="pagina_inicial">
        <div class="ciacaoficha">
            <div class="sep">
                <div class="areacriar">
                    <img src="./assets/letreiro_punkzombie.png" alt="letreiro do rpg punkzombie">
                    <a class="botaoAdicionar" href='ficha.php'>Criar ficha</a>
                </div>
            </div>
            <div class="sep">
                <div class="box areaficha overflow">
                    <div class="areafichalista">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Nome Personagem:</th>
                                    <th>Data e Hora(Brasília):</th>
                                    <th class="thUltimo"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php if ($resultver->num_rows > 0) {
                                    $logado = $_SESSION['usuario'];
                                    $sqlver = "SELECT * FROM fichas WHERE usuario = '$logado'";
                                    $resultver = $conn->query($sqlver);
                                    while ($row = $resultver->fetch_assoc()) {
                                        $dadosArray = json_decode($row["informacoes"], true); ?>
                                        <tr class="trficha">
                                            <td>
                                                <p>
                                                    <?php print_r(isset($dadosArray['nome_personagem']) ? $dadosArray['nome_personagem'] : 'Sem nome'); ?>
                                                </p>
                                            </td>
                                            <td>
                                                <p>
                                                    <?php print_r($row['data_hora'] == '' ? 'Sem data e hora' : $row['data_hora']); ?>
                                                </p>
                                            </td>
                                            <td>
                                                <a class="botaoMensagem editar" href="editarFicha.php?id=<?php echo $row['id_ficha'] ?>"><i class="bi bi-pencil-square"></i></a>
                                                <a class="botaoMensagem excluir" href="php/deletarFicha.php?id=<?php echo $row['id_ficha'] ?>"><i class="bi bi-trash"></i></a>
                                            </td>
                                        </tr>

                                <?php }
                                } ?>
                            </tbody>
                        </table>
                        <?php if ($resultver->num_rows == 0) { ?>
                            <div class="semficha">
                                <p>Nenhuma ficha criada!<br><i class="bi bi-clipboard   "></i></p>
                            </div>
                        <?php } ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script src="./index.js"></script>
</body>

</html>