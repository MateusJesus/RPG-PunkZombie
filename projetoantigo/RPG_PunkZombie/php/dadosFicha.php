<?php
session_start();
date_default_timezone_set('America/Sao_Paulo');
include_once('config.php');
if ((!isset($_SESSION['usuario']) == true) and (!isset($_SESSION['senha']) == true)) {
    session_destroy();
    header("Location: ../index.php");
    exit();
}

$informacoes = array(
    'nome_jogador' => $_POST['nome_jogador'],
    'nome_personagem' => $_POST['nome_personagem'],
    'variante' => $_POST['variante'],
    'origem' => $_POST['origem'],
    'classe' => $_POST['classe']
);

$status = array(
    'status_niv' => $_POST['status_niv'],
    'status_sta' => $_POST['status_sta'],
    'status_statot' => $_POST['status_statot'],
    'status_pdi' => $_POST['status_pdi'],
    'status_pditot' => $_POST['status_pditot'],
    'status_pdv' => $_POST['status_pdv'],
    'status_pdvtot' => $_POST['status_pdvtot'],
    'resist_perso' => $_POST['resist_perso'],
);

$caracteristicas = array(
    'aparencia' => $_POST['aparencia'],
    'personalidade' => $_POST['personalidade'],
);

$atributos = array(
    'atri_for' => $_POST['atri_for'],
    'atri_int' => $_POST['atri_int'],
    'atri_agi' => $_POST['atri_agi'],
    'atri_vig' => $_POST['atri_vig'],
    'atri_car' => $_POST['atri_car'],
);

$a = 0;
$pericias = array();
if (isset($_POST['pericia' . $a])) {
    while ($a <= isset(($_POST['pericia' . $a]))) {
        $pericias['pericia' . $a] = $_POST['pericia' . $a];
        $pericias['selectAtr' . $a] = $_POST['selectAtr' . $a];
        $pericias['inputOutrosPer' . $a] = $_POST['inputOutrosPer' . $a];
        $pericias['totalPer' . $a] = $_POST['totalPer' . $a];
        $a++;
    }
}

$carga_total = $_POST['carga_total'];

$a = 0;
$equipamentos = array();
if (isset($_POST['qntEquip' . $a])) {
    while ($a <= isset(($_POST['qntEquip' . $a]))) {
        $equipamentos['qntEquip' . $a] = $_POST['qntEquip' . $a];
        $equipamentos['itemEquip' . $a] = $_POST['itemEquip' . $a];
        $equipamentos['descEquip' . $a] = $_POST['descEquip' . $a];
        $equipamentos['cargaEequip' . $a] = $_POST['cargaEequip' . $a];
        $a++;
    }
}

$a = 0;
$vestimentas = array();
if (isset($_POST['roupaInputVest' . $a])) {
    while ($a <= isset(($_POST['roupaInputVest' . $a]))) {
        $vestimentas['roupaInputVest' . $a] = $_POST['roupaInputVest' . $a];
        $vestimentas['descInputVest' . $a] = $_POST['descInputVest' . $a];
        $vestimentas['cargaInputVest' . $a] = $_POST['cargaInputVest' . $a];
        $a++;
    }
}

$a = 0;
$armas = array();
if (isset($_POST['armaArma' . $a])) {
    while ($a <= isset(($_POST['armaArma' . $a]))) {
        $armas['armaArma' . $a] = $_POST['armaArma' . $a];
        $armas['testeArma' . $a] = $_POST['testeArma' . $a];
        $armas['criticoArma' . $a] = $_POST['criticoArma' . $a];
        $armas['municaoArma' . $a] = $_POST['municaoArma' . $a];
        $armas['cargaArma' . $a] = $_POST['cargaArma' . $a];
        $a++;
    }
}

$a = 0;
$proficiencia = array();
if (isset($_POST['profInput' . $a])) {
    while ($a <= isset(($_POST['profInput' . $a]))) {
        $proficiencia['profInput' . $a] = $_POST['profInput' . $a];
        $a++;
    }
}

$defesa = array();
if (isset($_POST['nomeprotecao1'])) {
    $defesa['nomeprotecao1'] = $_POST['nomeprotecao1'];
    $defesa['inputPontosDefesa1'] = $_POST['inputPontosDefesa1'];
    $defesa['inputRedDano1'] = $_POST['inputRedDano1'];
    $defesa['inputPenaDefesa1'] = $_POST['inputPenaDefesa1'];
    $defesa['inputCargaDefesa1'] = $_POST['inputCargaDefesa1'];
    $defesa['nomeprotecao2'] = $_POST['nomeprotecao2'];
    $defesa['inputPontosDefesa2'] = $_POST['inputPontosDefesa2'];
    $defesa['inputRedDano2'] = $_POST['inputRedDano2'];
    $defesa['inputPenaDefesa2'] = $_POST['inputPenaDefesa2'];
    $defesa['inputCargaDefesa2'] = $_POST['inputCargaDefesa2'];
    $defesa['selectDefesaAtr'] = $_POST['selectDefesaAtr'];
    $defesa['outrosInputDef'] = $_POST['outrosInputDef'];
    $defesa['defesatot'] = $_POST['defesatot'];
}

// Recebendo os dados do formulário
$camp1_camp2 = array();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $camp1_camp2['titleCamp1'] = $_POST['titleCamp1'] ?? '';
    $camp1_camp2['textCamp1'] = $_POST['textCamp1'] ?? '';
    $camp1_camp2['titleCamp2'] = $_POST['titleCamp2'] ?? '';
    $camp1_camp2['textCamp2'] = $_POST['textCamp2'] ?? '';
}

$a = 0;
$camp3 = array();
if (isset($_POST['tituloHab3' . $a])) {
    $camp3['titleCamp3'] = $_POST['titleCamp3'];
    while ($a <= isset(($_POST['tituloHab3' . $a]))) {
        $camp3['tituloHab3' . $a] = $_POST['tituloHab3' . $a];
        $camp3['Campo3HabTxt' . $a] = $_POST['Campo3HabTxt' . $a];
        $camp3['ativo3' . $a] = $_POST['ativo3' . $a];
        $camp3['tamanhoTxt3' . $a] = $_POST['tamanhoTxt3' . $a];
        $a++;
    }
}

$a = 0;
$camp4 = array();
if (isset($_POST['tituloHab4' . $a])) {
    $camp4['titleCamp4'] = $_POST['titleCamp4'];
    while ($a <= isset(($_POST['tituloHab4' . $a]))) {
        $camp4['tituloHab4' . $a] = $_POST['tituloHab4' . $a];
        $camp4['Campo4HabTxt' . $a] = $_POST['Campo4HabTxt' . $a];
        $camp4['ativo4' . $a] = $_POST['ativo4' . $a];
        $camp4['tamanhoTxt4' . $a] = $_POST['tamanhoTxt4' . $a];
        $a++;
    }
}

$usuario = $_SESSION['usuario'];
$informacoesJson = json_encode($informacoes, JSON_UNESCAPED_UNICODE);
$statusJson = json_encode($status, JSON_UNESCAPED_UNICODE);
$caracteristicasJson = json_encode($caracteristicas, JSON_UNESCAPED_UNICODE);
$atributosJson = json_encode($atributos, JSON_UNESCAPED_UNICODE);
$periciasJson = json_encode($pericias, JSON_UNESCAPED_UNICODE);
$equipamentosJson = json_encode($equipamentos, JSON_UNESCAPED_UNICODE);
$vestimentasJson = json_encode($vestimentas, JSON_UNESCAPED_UNICODE);
$armasJson = json_encode($armas, JSON_UNESCAPED_UNICODE);
$proficienciaJson = json_encode($proficiencia, JSON_UNESCAPED_UNICODE);
$defesaJson = json_encode($defesa, JSON_UNESCAPED_UNICODE);
$camp1_camp2Json = json_encode($camp1_camp2, JSON_UNESCAPED_UNICODE);
$camp3Json = json_encode($camp3, JSON_UNESCAPED_UNICODE);
$camp4Json = json_encode($camp4, JSON_UNESCAPED_UNICODE);
$data = date('d/m/Y');
$hora = date('H:i:s');

$camp3String = mysqli_real_escape_string($conn, $camp3Json);
$camp4String = mysqli_real_escape_string($conn, $camp4Json);
$caracteristicasString = mysqli_real_escape_string($conn, $caracteristicasJson);
$camp1_camp2String = mysqli_real_escape_string($conn, $camp1_camp2Json);

$imagem = $_POST['imagem'];
if (!empty($imagem)) {
    if ($imagem == 'excluida') {
        echo "<br><br>Imagem rebebida com objetivo de ser excluida!!<br>";
    } else {
        list($type, $imagem) = explode(';', $imagem);
        list(, $imagem) = explode(',', $imagem);
        $imagem = base64_decode($imagem);
        $idimagem = date('YmdHis');
        $imagem_nome = $_SESSION['usuario'] . '_' . $idimagem . '.png';
        $dir = '../assets/imgPerso/' . $imagem_nome;
        $dirImagem = 'assets/imgPerso/' . $imagem_nome;
        file_put_contents($dir, $imagem);
        echo "<br><br>Imagem rebebida com sucesso, e será enviada!!<br>";
    }
} else {
    echo "<br><br>Nenhuma imagem rebebida!!<br>";
}

//echo (($informacoesJson == "[]") ? 'vazio' : 'cheio'); 

if (isset($_SESSION['usuario'])) {
    if (isset($_POST['id_ficha'])) {
        $id_ficha = $_POST['id_ficha'];
        $sqlVer = "SELECT * FROM fichas WHERE usuario='$usuario' and id_ficha='$id_ficha'";
        $result = $conn->query($sqlVer);
        $ficha = $result->fetch_assoc();
        if (!empty($ficha['imagem']) && isset($dirImagem)) {
            $caminhoImagemAntiga = "../" . $ficha['imagem'];
            $caminhoImagemNova = "../" . $dirImagem;
            if (file_exists($caminhoImagemAntiga)) {
                print_r('<br><br>Imagem encontrada, e será substituída por essa. <br> <img style="height: 100px" src="' . $caminhoImagemNova . '"><br>');
                unlink($caminhoImagemAntiga);
            } else {
                echo '<br><br>Imagem antiga não foi encontrada.<br>';
            }
        } elseif (!empty($ficha['imagem']) && $imagem == 'excluida') {
            $caminhoImagemAntiga = "../" . $ficha['imagem'];
            unlink($caminhoImagemAntiga);
        } else {
            echo '<br><br>Caminho da imagem não encontrada.<br>';
        }
        $sql = "UPDATE fichas SET 
                data_hora = '$data às $hora',
                " . (($informacoesJson == "[]") ? "" : "informacoes='$informacoesJson',") . "
                " . (($statusJson == "[]") ? "" : "status='$statusJson',") . "
                " . (($caracteristicasJson == "[]") ? "" : "caracteristicas='$caracteristicasString',") . "
                " . (($atributosJson == "[]") ? "" : "atributos='$atributosJson',") . "
                " . (($periciasJson == "[]") ? "" : "pericias='$periciasJson',") . "
                " . (($carga_total == "[]") ? "" : "carga='$carga_total',") . "
                " . (($equipamentosJson == "[]") ? "" : "equipamentos='$equipamentosJson',") . "
                " . (($vestimentasJson == "[]") ? "" : "vestimentas='$vestimentasJson',") . "
                " . (($armasJson == "[]") ? "" : "armas='$armasJson',") . "
                " . (($proficienciaJson == "[]") ? "" : "proficiencia='$proficienciaJson',") . "
                " . (($defesaJson == "[]") ? "" : "defesa='$defesaJson',") . "
                " . (($camp3Json == "[]") ? "" : "camp3='$camp3String',") . "
                " . (($camp4Json == "[]") ? "" : "camp4='$camp4String',") . "
                " . (($imagem == "" || $imagem == "excluida") ? (($imagem == "excluida") ? "imagem=''," : "") : "imagem='$dirImagem',") . "
                " . (($camp1_camp2Json == "[]") ? "" : "camp1_camp2='$camp1_camp2String'") . "
                WHERE usuario='$usuario' and id_ficha='$id_ficha'";
        $conn->query($sql);
        if ($conn->query($sql) === TRUE) {
            echo "<br><br>Ficha atualizada com sucesso!";
        } else {
            echo "<br><br>Erro ao atualizar a ficha: " . $conn->error;
        }
    } else {
        $sql = "INSERT INTO fichas 
        (usuario, 
        data_hora,
        informacoes, 
        status, 
        caracteristicas, 
        atributos, 
        pericias, 
        carga, 
        equipamentos, 
        vestimentas, 
        armas, 
        proficiencia, 
        defesa, 
        camp3, 
        camp4, 
        camp1_camp2" . 
        (!empty($imagem) && $imagem != 'excluida' ? ", imagem" : "") . ") 
    VALUES (
        '$usuario', 
        '$data às $hora',
        '$informacoesJson', 
        '$statusJson', 
        '$caracteristicasJson', 
        '$atributosJson',
        '$periciasJson',
        '$carga_total',
        '$equipamentosJson',
        '$vestimentasJson',
        '$armasJson',
        '$proficienciaJson',
        '$defesaJson', 
        '$camp3Json', 
        '$camp4Json', 
        '$camp1_camp2Json'" . 
        (!empty($imagem) && $imagem != 'excluida' ? ", '$dirImagem'" : "") . ")";
    

        if ($conn->query($sql) === TRUE) {
            echo "<br><br>Ficha nova enviada com sucesso!";
        } else {
            echo "<br><br>Erro ao enviar a ficha nova: " . $conn->error;
        }
    }
}

header("Location: ../fichas.php");

// list($type, $imagem) = explode(';', $imagem);
// list(, $imagem) = explode(',', $imagem);

// $imagem = base64_decode($imagem);
// $hora = date('YmdHis'); 
// $imagem_nome = $_SESSION['usuario'].'_'. $hora.'.png';
// $dir = '../assets/imgPerso/';

// file_put_contents($dir . $imagem_nome, $imagem);


// $sqlver = "SELECT status FROM fichas";
// $result = $conn->query($sqlver);

// if ($result->num_rows > 0) {
//     while($row = $result->fetch_assoc()) {
//         $dadosArray = json_decode($row["status"], true); // Decodifica JSON para array
//         print_r($dadosArray); // Exibe o array
//     }
// } else {
//     echo "0 resultados";
// }