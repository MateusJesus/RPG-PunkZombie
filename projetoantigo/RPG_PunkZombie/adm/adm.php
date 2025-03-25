<?php
session_start();
include_once('../php/config.php');
if ((!isset($_SESSION['admusuario']) == true)) {
  unset($_SESSION['admusuario']);
  unset($_SESSION['admsenha']);
  header('Location: admlogin.php');
  exit;
}

$ordenar = isset($_GET['ordenar']) ? $_GET['ordenar'] : 'id';
switch ($ordenar) {
  case 'id':
    $sql = 'SELECT * FROM `fichas` ORDER BY `fichas`.`id_ficha` ASC';
    break;
  case 'usuario':
    $sql = 'SELECT * FROM `fichas` ORDER BY `fichas`.`usuario` ASC';
    break;
  case 'personagem':
    $sql = "SELECT *
            FROM fichas 
            ORDER BY JSON_UNQUOTE(JSON_EXTRACT(informacoes, '$.nome_personagem')) ASC";
    break;
  case 'data':
    $sql = 'SELECT * FROM `fichas` ORDER BY `fichas`.`data_hora` ASC';
    break;
  default:
    $sql = 'SELECT * FROM `fichas` ORDER BY `fichas`.`data_hora` ASC';
    break;
}

$result = $conn->query($sql);


if (isset($_GET['tema'])) {
  $tema = $_GET['tema'];
  $logadotema = $_SESSION['admusuario'];
  $sqlvertema = "UPDATE usuarios SET tema='$tema' WHERE usuario = '$logadotema'";
  $resultvertema = $conn->query($sqlvertema);
}

?>

<!DOCTYPE html>
<html lang="pt-br" class="
<?php
$logadotema = $_SESSION['admusuario'];
$sqlvertema = "SELECT * FROM usuarios WHERE usuario = '$logadotema'";
$resultvertema = $conn->query($sqlvertema);
$rowtema = $resultvertema->fetch_assoc();
print_r($rowtema['tema'] == 'escuro' ? 'dark_mode' : '');
?>">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
  <link rel="stylesheet" href="../css/reset.css">
  <link rel="stylesheet" href="../css/root.css">
  <link rel="stylesheet" href="../css/styleGeral.css">
  <link rel="stylesheet" href="../css/mediaqueries.css">
  <title>Fichas | PunkZombie</title>
  <style>
    th {
      height: 3em;
      transition: ease-in-out .2s;
    }

    th:hover {
      background-color: var(--color-2);
    }

    .visualizarficha {
      cursor: pointer;
      height: 3em;
      transition: ease-in-out .1s;
    }

    .visualizarficha:hover {
      background-color: var(--color-2);
    }

    .table {
      border-spacing: 0em;
    }

    .thNumber {
      width: 8.5em;
      cursor: pointer;
    }

    .thTxt {
      width: 25em;
      cursor: pointer;
    }
  </style>
</head>

<body>
  <div class="sideBar">
    <div class="sideBarCOntent">
      <div class="botaoSidebar"><i class="bi bi-justify"></i></div>
      <a>
        <span><img src="../assets/letreiro_punkzombie.png" alt="letreiro punkzombie"></span>
      </a>
      <hr>
      <ul class="opcoesSidebar">
        <a href="adm.php">
          <li>
            <i class="bi bi-house"> Início</i>
          </li>
        </a>
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
            <a href="adm.php?tema=escuro">
              <li class="<?php print_r($rowtema['tema'] == 'escuro' ? 'ativo' : ''); ?>">
                <i class="bi bi-moon"> Modo escuro</i>
              </li>
            </a>
            <a href="adm.php?tema=claro">
              <li class="<?php print_r($rowtema['tema'] == 'claro' ? 'ativo' : ''); ?>">
                <i class="bi bi-sun"> Modo claro</i>
              </li>
            </a>
          </ul>
        </a>
      </ul>
      <ul class="opcoesSidebar">
        <a class="botaosair" href="../php/sair.php">
          <li class="">
            <i class="bi bi-box-arrow-left"> Sair</i>
          </li>
        </a>
      </ul>
    </div>
  </div>
  <div id="pag2">
    <section>
      <div class="box">
        <table class="table">
          <thead>
            <th onclick="window.location.href='adm.php?ordenar=id';" class="thNumber">#</th>
            <th class="thTxt" onclick="window.location.href='adm.php?ordenar=usuario'">Usuario</th>
            <th class="thTxt" onclick="window.location.href='adm.php?ordenar=personagem'">Nome Personagem</th>
            <th class="thNumber">PV</th>
            <th class="thNumber">STA</th>
            <th class="thNumber">PDI</th>
            <th class="thNumber">DEF</th>
            <th class="thTxt" onclick="window.location.href='adm.php?ordenar=data'">Criação da ficha</th>

          </thead>
          <tbody>
            <?php while ($rows = $result->fetch_assoc()) { ?>
              <tr class="visualizarficha" onclick="window.open('admficha.php?id=<?php echo $rows['id_ficha'] ?>', '_blank');">
                <td scope="row"><?php echo $rows['id_ficha'] ?></td>
                <td><?php echo $rows['usuario'] ?></td>
                <td>
                  <?php
                  $informacoes = json_decode($rows["informacoes"], true);
                  $status = json_decode($rows["status"], true);
                  $defesa = json_decode($rows["defesa"], true);
                  $informacoes = json_decode($rows["informacoes"], true);
                  print_r(isset($informacoes['nome_personagem']) ? $informacoes['nome_personagem'] : 'Sem nome'); ?>
                </td>
                <td>
                  <?php print_r(isset($status['status_pdv']) ? $status['status_pdv'] . ' / ' . $status['status_pdvtot']  : 'Não informado.'); ?>
                </td>
                <td><?php print_r(isset($status['status_sta']) ? $status['status_sta'] . ' / ' . $status['status_statot']  : 'Não informado.'); ?></td>
                <td><?php print_r(isset($status['status_pdi']) ? $status['status_pdi'] . ' / ' . $status['status_pditot']  : 'Não informado.'); ?></td>
                <td><?php print_r(isset($defesa['defesatot']) ? $defesa['defesatot']  : 'Não informado.'); ?></td>
                <td><?php echo $rows['data_hora'] ?></td>
              </tr>
            <?php } ?>
          </tbody>
        </table>
      </div>
    </section>
  </div>
  <script src="../index.js"></script>
</body>

</html>