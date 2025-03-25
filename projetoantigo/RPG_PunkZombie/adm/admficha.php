<?php
session_start();

include_once('../php/config.php');
if ((!isset($_SESSION['admusuario']) == true)) {
  unset($_SESSION['admusuario']);
  unset($_SESSION['admsenha']);
  header('Location: admlogin.php');
  exit;
}

if (isset($_GET['id'])) {
    $id_ficha = $_GET['id'];
    $sqlEdit = "SELECT * FROM fichas WHERE id_ficha = '$id_ficha'";
    $result = $conn->query($sqlEdit);

    if (mysqli_num_rows($result) == 0) {
        echo 'caiu aqui';
    } else {
        $row = $result->fetch_assoc();
        $informacoes = json_decode($row["informacoes"], true);
        $status = json_decode($row["status"], true);
        $caracteristicas = json_decode($row["caracteristicas"], true);
        $atributos = json_decode($row["atributos"], true);
        $pericias = json_decode($row["pericias"], true);
        $equipamentos = json_decode($row["equipamentos"], true);
        $vestimentas = json_decode($row["vestimentas"], true);
        $armas = json_decode($row["armas"], true);
        $proficiencias = json_decode($row["proficiencia"], true);
        $defesa = json_decode($row["defesa"], true);
        $carga = $row["carga"];
        $camp1_camp2 = json_decode($row["camp1_camp2"], true);
        $camp3 = json_decode($row["camp3"], true);
        $camp4 = json_decode($row["camp4"], true);
        $imagem = $row["imagem"];
    }    
} else {
    header('Location: adm.php');
}    
if (isset($_GET['tema'])) {
        $tema = $_GET['tema'];
        $logadotema = $_SESSION['admusuario'];
        $sqlvertema = "UPDATE usuarios SET tema='$tema' WHERE usuario = '$logadotema'";
        $resultvertema = $conn->query($sqlvertema);
        header("Location: admficha.php?id=".urlencode($id_ficha));
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
    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/root.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.css" integrity="sha512-hvNR0F/e2J7zPPfLC9auFe3/SE0yG4aJCOd/qxew74NN7eyiSKjr7xJJMu1Jy2wf7FXITpWS1E/RY8yzuXN7VA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="../css/styleGeral.css">
    <link rel="stylesheet" href="../css/personagem.css">
    <link rel="stylesheet" href="../css/inventario.css">
    <link rel="stylesheet" href="../css/habilidades.css">
    <link rel="stylesheet" href="../css/mediaqueries.css">
    <title>RPG | <?php echo (isset($informacoes['nome_personagem']) ? $informacoes['nome_personagem'] : ''); ?></title>
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
                        <a href="admficha.php?id=<?php print_r($id_ficha) ?>&tema=escuro">
                            <li class="<?php print_r($rowtema['tema'] == 'escuro' ? 'ativo' : ''); ?>">
                                <i class="bi bi-moon"> Modo escuro</i>
                            </li>
                        </a>
                        <a href="admficha.php?id=<?php print_r($id_ficha) ?>&tema=claro">
                            <li class="<?php print_r($rowtema['tema'] == 'claro' ? 'ativo' : ''); ?>">
                                <i class="bi bi-sun"> Modo claro</i>
                            </li>
                        </a>
                    </ul>
                </a>
            </ul>
        </div>
    </div>

    <div id="pag3" class="pagEditar">
        <div id="editor_img" class="editor_img box">
            <div class="previewImg" id="previewImg">
                <div id="loading" class="loading"></div>
            </div>
            <div id="previewBtn">
            </div>
        </div>
    </div>

    <div id="opcoesImagem" class="opcoesImagem">
        <div id="opcoesImagemBtns" class="opcoesImagemBtns box">
        </div>
    </div>
    <form action="admdadosFicha.php" method="post" enctype="multipart/form-data">
        <header>
            <div class="cab">
                <button class="botaoAdicionar" type="submit">SALVAR DADOS</button>
            </div>
        </header>
        <div id="pag2">
            <input type="hidden" name="id_ficha" id="id_ficha" value="<?php echo $row['id_ficha'] ?>">
            <input type="hidden" name="imagem" id="imagem" value="">
            <section id="personagem" class="personagem">
                <h2 class="title_content">Personagem</h2>
                <div class="sobre_personagem">
                    <div class="informacoes_status">
                        <div class="div-inf_stat">
                            <div class="informacoes_perso box">
                                <h2 class="title_content">Informações</h2>
                                <div class="content_perso">
                                    <div class="inf_item">
                                        <label for="nome_jogador">Nome do Jogador:</label>
                                        <input maxlength="20" id="nome_jogador" name="nome_jogador" type="text" value="<?php echo (isset($informacoes['nome_jogador']) ? $informacoes['nome_jogador'] : ''); ?>">
                                    </div>
                                    <div class="inf_item">
                                        <label for="nome_personagem">Nome do personagem:</label>
                                        <input maxlength="30" id="nome_personagem" name="nome_personagem" type="text" value="<?php echo (isset($informacoes['nome_personagem']) ? $informacoes['nome_personagem'] : ''); ?>">
                                    </div>
                                    <div class="inf_item">
                                        <label for="variante">variante:</label>
                                        <input maxlength="15" id="variante" name="variante" type="text" value="<?php echo (isset($informacoes['variante']) ? $informacoes['variante'] : ''); ?>">
                                    </div>
                                    <div class="inf_item">
                                        <label for="origem">Origem:</label>
                                        <input id="origem" name="origem" type="text" value="<?php echo (isset($informacoes['origem']) ? $informacoes['origem'] : ''); ?>">
                                    </div>
                                    <div class="inf_item">
                                        <label for="classe">Classe:</label>
                                        <input id="classe" name="classe" type="text" value="<?php echo (isset($informacoes['classe']) ? $informacoes['classe'] : ''); ?>">
                                    </div>

                                </div>
                            </div>
                            <div class="status">
                                <div class="status_content">
                                    <div class="if_status box">
                                        <h2 class="title_content">NIV</h2>
                                        <div class="content">
                                            <input maxlength="2" class="input_num" type="text" name="status_niv" id="status_niv" value="<?php echo (isset($status['status_niv']) ? $status['status_niv'] : ''); ?>" oninput="statusNiv()">
                                        </div>
                                    </div>
                                    <div class="if_status box">
                                        <h2 class="title_content">PV</h2>
                                        <div class="content">
                                            <input maxlength="2" class="input_num" type="text" name="status_pdv" id="status_pdv" value="<?php echo (isset($status['status_pdv']) ? $status['status_pdv'] : ''); ?>">
                                            <hr>
                                            <input maxlength="2" class="input_num" type="text" name="status_pdvtot" id="status_pdvtot" value="<?php echo (isset($status['status_pdvtot']) ? $status['status_pdvtot'] : ''); ?>">
                                        </div>
                                    </div>
                                    <div class="if_status box">
                                        <h2 class="title_content">STA</h2>
                                        <div class="content">
                                            <input maxlength="2" class="input_num" type="text" name="status_sta" id="status_sta" value="<?php echo (isset($status['status_sta']) ? $status['status_sta'] : ''); ?>">
                                            <hr>
                                            <input maxlength="2" class="input_num" type="text" name="status_statot" id="status_statot" value="<?php echo (isset($status['status_statot']) ? $status['status_statot'] : ''); ?>">
                                        </div>
                                    </div>
                                    <div class="if_status box">
                                        <h2 class="title_content">PDI</h2>
                                        <div class="content">
                                            <input maxlength="2" class="input_num" type="text" name="status_pdi" id="status_pdi" value="<?php echo (isset($status['status_pdi']) ? $status['status_pdi'] : ''); ?>">
                                            <hr>
                                            <input maxlength="2" class="input_num" type="text" name="status_pditot" id="status_pditot" value="<?php echo (isset($status['status_pditot']) ? $status['status_pditot'] : ''); ?>">
                                        </div>
                                    </div>

                                    <div class="if_status box">
                                        <h2 class="title_content">DEF</h2>
                                        <div class="content">
                                            <p class="res_carga" id="res_defesa">10</p>
                                            <input type="hidden" name="defesatot" id="defesatot">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="carac_personagem">
                            <div class="caracteristica box">
                                <h2 class="title_content">Aparência</h2>
                                <textarea name="aparencia" id="aparencia" cols="30" rows="5"><?php echo (isset($caracteristicas['aparencia']) ? $caracteristicas['aparencia'] : ''); ?></textarea>
                            </div>
                            <div class="caracteristica box">
                                <h2 class="title_content">personalidade</h2>
                                <textarea name="personalidade" id="personalidade" cols="30" rows="5"><?php echo (isset($caracteristicas['personalidade']) ? $caracteristicas['personalidade'] : ''); ?></textarea>
                            </div>
                        </div>

                    </div>

                    <div class="resistencia_foto">
                        <div class="resistencia box">
                            <h2 class="title_content">resistência</h2>
                            <input type="text" name="resist_perso" id="resist_perso" value="<?php echo (isset($status['resist_perso']) ? $status['resist_perso'] : ''); ?>">
                        </div>
                        <div class="imagem_perso box">
                            <div id="text_aviso">
                                <!-- <h1 id="aviso_pesado" class="pagina degrade">opa tu ta pesado</h1> -->
                            </div>
                            <div id="imagemContainer">
                                <img id="img_personagem" src="<?php echo (!empty($imagem) ? '../'.$imagem : ''); ?>">
                                <label style="display: <?php echo (!empty($imagem) ? 'none' : 'flex'); ?>;" for="inputImgPerso" id="customFileUpload" class="custom-file-upload">
                                    <span id="spanFileUpload">
                                        Clique ou arraste e
                                        <br>
                                        solte sua imagem aqui.
                                        <br>
                                        <i class="bi bi-box-arrow-in-down"></i>
                                    </span>
                                    <input type="file" name="inputImgPerso" id="inputImgPerso" accept=".jpg, .jpeg, .png">
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="atri_peri">
                        <div id="atributos" class="atributos">
                            <div class="atributo box">
                                <h2 class="title_content">FOR</h2>
                                <input type="text" maxlength="2" name="atri_for" id="atri_for" value="<?php echo (isset($atributos['atri_for']) ? $atributos['atri_for'] : ''); ?>">
                            </div>

                            <div class="atributo box">
                                <h2 class="title_content">INT</h2>
                                <input type="text" maxlength="2" name="atri_int" id="atri_int" value="<?php echo (isset($atributos['atri_int']) ? $atributos['atri_int'] : ''); ?>">
                            </div>

                            <div class="atributo box">
                                <h2 class="title_content">AGI</h2>
                                <input type="text" maxlength="2" name="atri_agi" id="atri_agi" value="<?php echo (isset($atributos['atri_agi']) ? $atributos['atri_agi'] : ''); ?>">
                            </div>

                            <div class="atributo box">
                                <h2 class="title_content">VIG</h2>
                                <input type="text" maxlength="2" name="atri_vig" id="atri_vig" value="<?php echo (isset($atributos['atri_vig']) ? $atributos['atri_vig'] : ''); ?>">
                            </div>

                            <div class="atributo box">
                                <h2 class="title_content">CAR</h2>
                                <input type="text" maxlength="2" name="atri_car" id="atri_car" value="<?php echo (isset($atributos['atri_car']) ? $atributos['atri_car'] : ''); ?>">
                            </div>
                        </div>

                        <div class="pericias box">
                            <h2 class="title_content">perícias</h2>
                            <div id="periciaScroll" class="pericia_content overflow">
                                <table class="table" id="tablePer">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th class="thNumber">Total</th>
                                            <th class="thPer">Perícia</th>
                                            <th class="thAtr">Atributos</th>
                                            <th class="thNumber">1/2<br>Nível</th>
                                            <th class="thNumber">Outros</th>
                                            <th class="thNumber thUltimo"></th>
                                        </tr>
                                    </thead>
                                    <tbody id="tBodyPer">
                                        <?php
                                        $a = 0;
                                        if (isset($pericias['pericia' . $a])) {
                                            while ($a <= isset($pericias['pericia' . $a])) {
                                                echo '
                                                <tr id="linha' . $a . '">
                                                    <td class="tdsoma">
                                                        <p id="soma' . $a . '" class="soma">' . $pericias['totalPer' . $a] . '</p>
                                                        <input type="hidden" name="totalPer' . $a . '" id="totalPer' . $a . '" value="' . $pericias['totalPer' . $a] . '">
                                                    </td>
                                                    <td>
                                                        <input value="' . $pericias['pericia' . $a] . '" oninput="inputPer(' . $a . ')" maxlength="14" class="inputDesc" type="text" name="pericia' . $a . '" id="pericia' . $a . '">
                                                    </td>
                                                    <td>
                                                        <select onchange="selectAtri(' . $a . ')" name="selectAtr' . $a . '" id="selectAtr' . $a . '" class="form-select">
                                                            <option ' . ($pericias['selectAtr' . $a] == 'for' ? 'selected' : '') . ' id="forPer' . $a . '" value="for">FOR: ' . $atributos['atri_for'] . '</option>
                                                            <option ' . ($pericias['selectAtr' . $a] == 'int' ? 'selected' : '') . ' id="intPer' . $a . '" value="int">INT: ' . $atributos['atri_int'] . '</option>
                                                            <option ' . ($pericias['selectAtr' . $a] == 'agi' ? 'selected' : '') . ' id="agiPer' . $a . '" value="agi">AGI: ' . $atributos['atri_agi'] . '</option>
                                                            <option ' . ($pericias['selectAtr' . $a] == 'vig' ? 'selected' : '') . ' id="vigPer' . $a . '" value="vig">VIG: ' . $atributos['atri_vig'] . '</option>
                                                            <option ' . ($pericias['selectAtr' . $a] == 'car' ? 'selected' : '') . ' id="carPer' . $a . '" value="car">CAR: ' . $atributos['atri_car'] . '</option>
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <p class="textDefRes" type="text" name="meioNivel' . $a . '" id="meioNivel' . $a . '">' . (intdiv(intval($status['status_niv']), 2)) . '</p>
                                                    </td>
                                                    <td>
                                                        <input value="' . $pericias['inputOutrosPer' . $a] . '" oninput="inputOutrosPer(' . $a . ')" class="inputDesc" type="text" maxlength="2" name="inputOutrosPer' . $a . '" id="inputOutrosPer' . $a . '">
                                                    </td>
                                                    <td>
                                                        <a onclick="removerPer(' . $a . ')" class="remove">
                                                            <i class="bi bi-dash"></i>
                                                        </a>
                                                    </td>
                                                    </tr>
                                                
                                                ';
                                                $a++;
                                            }
                                        }

                                        ?>
                                    </tbody>
                                </table>
                                <a class="botaoAdicionar" onclick="adicionarPER()">ADICIONAR PERÍCIA</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="inventario" class="inventario">
                <h1 class="title_content">iventário</h1>
                <div class="TUDOinventario">
                    <div class="carga_prof">
                        <div class="carga box">
                            <h2 class="title_content">carga</h2>
                            <div class="carga_content">
                                <p class="res_carga" id="res_carga"></p>
                                <hr>
                                <input value="<?php echo $carga ?>" type="text" name="carga_total" id="carga_total" maxlength="4" placeholder="5" oninput="cargatotal()">
                            </div>
                        </div>
                        <div class="proficiencia box">
                            <h2 class="title_content">proficiência</h2>
                            <div id="proficienciaScroll" class="proficiencia_content overflow">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>proficiência</th>
                                            <th class="thUltimo thNumber"></th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyProf">
                                        <?php
                                        $a = 0;
                                        if (isset($proficiencias['profInput' . $a])) {
                                            while ($a <= isset($proficiencias['profInput' . $a])) {
                                                echo '
                                                    <tr id="linhaProf' . $a . '">
                                                        <td>
                                                            <input maxlength="20" value="' . $proficiencias['profInput' . $a] . '" id="profInput' . $a . '" name="profInput' . $a . '" oninput="profInput(' . $a . ')" class="inputDesc">
                                                        </td>
                                                        <td>
                                                            <a onclick="removeProf(' . $a . ')" class="remove">
                                                                <i class="bi bi-dash"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ';
                                                $a++;
                                            }
                                        }
                                        ?>
                                    </tbody>
                                </table>
                                <a class="botaoAdicionar" onclick="adicionarProf()">ADICIONAR proficiência</a>
                            </div>
                        </div>
                    </div>
                    <div class="equi_arma">
                        <div class="equipamento box">
                            <h2 class="title_content">Equipamentos</h2>
                            <div id="equipamentosScroll" class="equipamentos overflow">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th class="thNumber">qnt.</th>
                                            <th class="thName">item</th>
                                            <th class="thDesc">descrição</th>
                                            <th class="thNumber">carga</th>
                                            <th class="thUltimo thNumber"></th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyEQUIP_1">
                                        <?php
                                        $a = 0;
                                        if (isset($equipamentos['qntEquip' . $a])) {
                                            while ($a <= isset($equipamentos['qntEquip' . $a])) {
                                                echo '                      
                                                <tr id="linhaEQUIP1_id' . $a . '">
                                                    <td>
                                                        <input oninput="qntEquip(' . $a . ')" value="' . $equipamentos['qntEquip' . $a] . '" name="qntEquip' . $a . '" id="qntEquip' . $a . '" class="inputDesc" maxlength="2" type="text" placeholder="1">
                                                    </td>
                                                    <td>
                                                        <input maxlength="20" oninput="itemEquip(' . $a . ')" value="' . $equipamentos['itemEquip' . $a] . '" name="itemEquip' . $a . '" id="itemEquip' . $a . '" class="inputDesc">
                                                    </td>
                                                    <td>
                                                        <input maxlength="50" oninput="descEquip(' . $a . ')" value="' . $equipamentos['descEquip' . $a] . '" name="descEquip' . $a . '" id="descEquip' . $a . '" class="inputDesc">
                                                    </td>
                                                    <td>
                                                        <input maxlength="3" oninput="cargaEquip(' . $a . ')" value="' . $equipamentos['cargaEequip' . $a] . '" name="cargaEequip' . $a . '" id="cargaEequip' . $a . '" class="inputDesc" type="text" placeholder=".5">
                                                    </td>
                                                    <td>
                                                        <a onclick="removeEquip(' . $a . ')" class="remove">
                                                            <i class="bi bi-dash"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                
                                                ';
                                                $a++;
                                            }
                                        }
                                        ?>
                                    </tbody>
                                </table>
                                <a class="botaoAdicionar" onclick="adicionarEquip()">
                                    ADICIONAR EQUIPAMENTO
                                </a>
                            </div>
                        </div>
                        <div class="arma box">
                            <h2 class="title_content">armas</h2>
                            <div id="armaScroll" class="arma_content overflow">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>arma</th>
                                            <th class="thDado">teste de dano</th>
                                            <th class="thDado">crítico</th>
                                            <th class="thDado">munição</th>
                                            <th class="thNumber">carga</th>
                                            <th class="thNumber thUltimo"></th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyArma">
                                        <?php
                                        $a = 0;
                                        if (isset($armas['armaArma' . $a])) {
                                            while ($a <= isset($armas['armaArma' . $a])) {
                                                echo '
                                                <tr>
                                                    <td>
                                                        <input value="' . $armas['armaArma' . $a] . '" maxlength="15" name="armaArma' . $a . '" id="armaArma' . $a . '" oninput="armaArma(' . $a . ')" class="inputDesc">
                                                    </td>
                                                    <td>
                                                        <input value="' . $armas['testeArma' . $a] . '" maxlength="10" name="testeArma' . $a . '" id="testeArma' . $a . '" oninput="testeArma(' . $a . ')" class="inputDesc">
                                                    </td>
                                                    <td>
                                                        <input value="' . $armas['criticoArma' . $a] . '" maxlength="10" name="criticoArma' . $a . '" id="criticoArma' . $a . '" oninput="criticoArma(' . $a . ')" class="inputDesc">
                                                    </td>
                                                    <td>
                                                        <input value="' . $armas['municaoArma' . $a] . '" maxlength="10" name="municaoArma' . $a . '" id="municaoArma' . $a . '" oninput="municaoArma(' . $a . ')" class="inputDesc">
                                                    </td>
                                                    <td>
                                                        <input value="' . $armas['cargaArma' . $a] . '" maxlength="2" name="cargaArma' . $a . '" id="cargaArma' . $a . '" oninput="cargaArma(' . $a . ')" class="inputDesc">
                                                    </td>
                                                    <td>
                                                        <a onclick="removeArma(' . $a . ')" class="remove">
                                                            <i class="bi bi-dash"></i>
                                                        </a>
                                                    </td>
                                                </tr>
                                                
                                                ';
                                                $a++;
                                            }
                                        }
                                        ?>
                                    </tbody>
                                </table>
                                <a class="botaoAdicionar" onclick="adicionarArma()">ADICIONAR arma</a>
                            </div>
                        </div>
                    </div>
                    <div class="vest_def">
                        <div class="vestimenta box">
                            <h2 class="title_content">vestimenta</h2>
                            <div id="vestimentaScroll" class="vestimenta_content overflow">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th class="thNameVest">roupa</th>
                                            <th class="thBonusVest">bônus</th>
                                            <th class="thNumber">carga</th>
                                            <th class="thUltimo thNumber"></th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyVest">
                                        <?php
                                        $a = 0;
                                        if (isset($vestimentas['roupaInputVest' . $a])) {
                                            while ($a <= isset($vestimentas['roupaInputVest' . $a])) {
                                                echo
                                                '
                                                    <tr>
                                                        <td>
                                                            <input type="text" maxlength="15" value="' . $vestimentas['roupaInputVest' . $a] . '" oninput="roupaVest(' . $a . ')" name="roupaInputVest' . $a . '" id="roupaInputVest' . $a . '" class="inputDesc">
                                                        </td>
                                                        <td>
                                                            <input type="text" maxlength="15" value="' . $vestimentas['descInputVest' . $a] . '" oninput="descVest(' . $a . ')" name="descInputVest' . $a . '" id="descInputVest' . $a . '" class="inputDesc">
                                                        </td>
                                                        <td>
                                                            <input type="text" maxlength="2" value="' . $vestimentas['cargaInputVest' . $a] . '" oninput="cargaVest(' . $a . ')" name="cargaInputVest' . $a . '" id="cargaInputVest' . $a . '" class="inputDesc">
                                                        </td>
                                                        <td>
                                                            <a onclick="removeVest(' . $a . ')" class="remove">
                                                                <i class="bi bi-dash"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ';
                                                $a++;
                                            }
                                        }
                                        ?>
                                    </tbody>
                                </table>
                                <a class="botaoAdicionar" onclick="adicionarVest()">ADICIONAR roupa</a>
                            </div>
                        </div>
                        <div class="defesa box">
                            <h2 class="title_content">defesa</h2>
                            <div oninput="defesa()" class="defesa_content">
                                <div>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>proteção</th>
                                                <th class="thNumber">def.</th>
                                                <th class="thNumber">rd.</th>
                                                <th class="thNumber">pena</th>
                                                <th class="thNumber">carga</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input value="<?php echo (isset($defesa['nomeprotecao1']) ? $defesa['nomeprotecao1'] : ''); ?>" id="nomeprotecao1" name="nomeprotecao1" placeholder="Armadura" maxlength="15" class="inputDesc" type="text">
                                                </td>
                                                <td>
                                                    <input value="<?php echo (isset($defesa['inputPontosDefesa1']) ? $defesa['inputPontosDefesa1'] : ''); ?>" id="inputPontosDefesa1" name="inputPontosDefesa1" class="inputDesc" type="text" maxlength="3">
                                                </td>
                                                <td>
                                                    <input value="<?php echo (isset($defesa['inputRedDano1']) ? $defesa['inputRedDano1'] : ''); ?>" id="inputRedDano1" name="inputRedDano1" class="inputDesc" type="text" maxlength="3">
                                                </td>
                                                <td>
                                                    <input value="<?php echo (isset($defesa['inputPenaDefesa1']) ? $defesa['inputPenaDefesa1'] : ''); ?>" id="inputPenaDefesa1" name="inputPenaDefesa1" class="inputDesc" type="text" maxlength="3">
                                                </td>
                                                <td>
                                                    <input value="<?php echo (isset($defesa['inputCargaDefesa1']) ? $defesa['inputCargaDefesa1'] : ''); ?>" id="inputCargaDefesa1" name="inputCargaDefesa1" class="inputDesc" type="text" maxlength="3">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input value="<?php echo (isset($defesa['nomeprotecao2']) ? $defesa['nomeprotecao2'] : ''); ?>" id="nomeprotecao2" name="nomeprotecao2" placeholder="Escudo" maxlength="15" class="inputDesc" type="text">
                                                </td>
                                                <td>
                                                    <input value="<?php echo (isset($defesa['inputPontosDefesa2']) ? $defesa['inputPontosDefesa2'] : ''); ?>" id="inputPontosDefesa2" name="inputPontosDefesa2" class="inputDesc" type="text" maxlength="2">
                                                </td>
                                                <td>
                                                    <input value="<?php echo (isset($defesa['inputRedDano2']) ? $defesa['inputRedDano2'] : ''); ?>" id="inputRedDano2" name="inputRedDano2" class="inputDesc" type="text" maxlength="3">
                                                </td>
                                                <td>
                                                    <input value="<?php echo (isset($defesa['inputPenaDefesa2']) ? $defesa['inputPenaDefesa2'] : ''); ?>" id="inputPenaDefesa2" name="inputPenaDefesa2" class="inputDesc" type="text" maxlength="2">
                                                </td>
                                                <td>
                                                    <input value="<?php echo (isset($defesa['inputCargaDefesa2']) ? $defesa['inputCargaDefesa2'] : ''); ?>" id="inputCargaDefesa2" name="inputCargaDefesa2" class="inputDesc" type="text" maxlength="2">
                                                </td>
                                            </tr>


                                        </tbody>
                                    </table>
                                </div>
                                <hr class="hrDef">
                                <div class="defesa_res">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th class="thNumber">armad.</th>
                                                <th class="thNumber">escudo</th>
                                                <th>atributo</th>
                                                <th class="thNumber">outros</th>
                                                <th class="thNumber">base</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p id="armdDef" class="textDefRes">0</p>
                                                </td>
                                                <td>
                                                    <p id="escudDef" class="textDefRes">0</p>
                                                </td>
                                                <td id="selectDef">
                                                    <select id="selectDefesaAtr" name="selectDefesaAtr" class="form-select" onchange="selectDefAtr()">
                                                        <?php
                                                        echo
                                                        '<option ' . ($defesa['selectDefesaAtr'] == 'forDef' ? 'selected' : '') . ' id="forDef" value="forDef">FOR: ' . $atributos['atri_for'] . '</option>
                                                    <option ' . ($defesa['selectDefesaAtr'] == 'intDef' ? 'selected' : '') . ' id="intDef" value="intDef">INT: ' . $atributos['atri_int'] . '</option>
                                                    <option ' . ($defesa['selectDefesaAtr'] == 'agiDef' ? 'selected' : '') . ' id="agiDef" value="agiDef">AGI: ' . $atributos['atri_agi'] . '</option>
                                                    <option ' . ($defesa['selectDefesaAtr'] == 'vigDef' ? 'selected' : '') . ' id="vigDef" value="vigDef">VIG: ' . $atributos['atri_vig'] . '</option>
                                                    <option ' . ($defesa['selectDefesaAtr'] == 'carDef' ? 'selected' : '') . ' id="carDef" value="carDef">CAR: ' . $atributos['atri_car'] . '</option>'
                                                        ?>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input value="<?php echo $defesa['outrosInputDef']; ?>" id="outrosInputDef" name="outrosInputDef" class="inputDesc" type="text" maxlength="2" oninput="outrosDef()">
                                                </td>
                                                <td>
                                                    <p class="textDefRes">10</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p id="resDefDef">10</p>
                                </div>
                                <div class="defesa_res">
                                    <p class="textPenDef">Redução de Dano Sofrido:</p>
                                    <p id="resRedDano">0</p>
                                </div>
                                <div class="defesa_res">
                                    <p class="textPenDef">Penalidade total de Armadura:</p>
                                    <p id="resPenDef">0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="habilidades" class="habilidades">
                <h2 class="title_content">habilidades</h2>
                <div class="divhab">
                    <div class="camposHab">
                        <div class="campoHab box">
                            <input value="<?php echo htmlspecialchars($camp1_camp2['titleCamp1'] ?? '', ENT_QUOTES, 'UTF-8'); ?>" maxlength="30" class="titleCamp" type="text" name="titleCamp1" id="titleCamp1">
                            <textarea maxlength="1000" class="campoTxt" name="textCamp1" id="textCamp1" rows="10"><?php echo htmlspecialchars($camp1_camp2['textCamp1'] ?? '', ENT_QUOTES, 'UTF-8'); ?></textarea>
                        </div>
                        <div class="campoHab box">
                            <input value="<?php echo htmlspecialchars($camp1_camp2['titleCamp2'] ?? ''); ?>" maxlength="30" class="titleCamp" type="text" name="titleCamp2" id="titleCamp2">
                            <textarea maxlength="1000" class="campoTxt" name="textCamp2" id="textCamp2" rows="10"><?php echo htmlspecialchars($camp1_camp2['textCamp2'] ?? ''); ?></textarea>
                        </div>
                    </div>
                    <div class="camposHab box">
                        <input maxlength="30" class="titleCamp" type="text" value="<?php echo (isset($camp3['titleCamp3']) ? $camp3['titleCamp3'] : ''); ?>" name="titleCamp3" id="titleCamp3" oninput="titleCamp3()">
                        <div id="camposHab3" class="overflow campHab_content">
                            <div id="Campo3Hab">
                                <?php
                                $a = 0;
                                if (isset($camp3['tituloHab3' . $a])) {
                                    while ($a <= isset($camp3['tituloHab3' . $a])) {
                                        echo
                                        '
                                    <div id="Campo3HabDiv3' . $a . '" class="itemCampoHab">
                                        <div style="width:100%">
                                            <div style="width:100%">
                                                <input maxlength="50" value="' . $camp3['tituloHab3' . $a] . '" name="tituloHab3' . $a . '" id="tituloHab3' . $a . '" oninput="tituloHab3(' . $a . ')" class="tituloHab" type="text">
                                                <i style="transition: 1s;" id="setaCamp3' . $a . '" onclick="mostrarTextCampo3(' . $a . ')" class="setaHab bi-chevron-down" ></i>
                                            </div>
                                            <textarea maxlength="2000" class="campoHabAberto" style="display: block; height: ' . $camp3['tamanhoTxt3' . $a] . 'px;" oninput="textoHab3(' . $a . ')" name="Campo3HabTxt' . $a . '" id="Campo3HabTxt' . $a . '" rows="1" cols="30">' . $camp3['Campo3HabTxt' . $a] . '</textarea>
                                            <input value="' . $camp3['ativo3' . $a] . '" name="ativo3' . $a . '" id="ativo3' . $a . '" class="tituloHab" type="hidden">
                                            <input value="' . $camp3['tamanhoTxt3' . $a] . '" name="tamanhoTxt3' . $a . '" id="tamanhoTxt3' . $a . '" class="tituloHab" type="hidden">
                                        </div>
                                            <a onclick="removeHab3(' . $a . ')" class="remove">
                                                <i class="bi bi-dash"></i>
                                            </a>
                                    </div>
                                    ';
                                        $a++;
                                    }
                                }
                                ?>
                            </div>
                            <a class="botaoAdicionar" onclick="adicionarCampo3()">adicionar</a>
                        </div>
                    </div>
                    <div class="camposHab box">
                        <input maxlength="30" class="titleCamp" type="text" value="<?php echo (isset($camp4['titleCamp4']) ? $camp4['titleCamp4'] : ''); ?>" name="titleCamp4" id="titleCamp4" oninput="titleCamp4()">
                        <div id="camposHab4" class="overflow campHab_content">
                            <div id="Campo4Hab">
                                <?php

                                $a = 0;
                                if (isset($camp4['tituloHab4' . $a])) {
                                    while ($a <= isset($camp4['tituloHab4' . $a])) {
                                        echo
                                        '
                                    <div id="Campo4HabDiv4' . $a . '" class="itemCampoHab">
                                        <div style="width:100%">
                                            <div style="width:100%">
                                                <input maxlength="50" value="' . $camp4['tituloHab4' . $a] . '" name="tituloHab4' . $a . '" id="tituloHab4' . $a . '" oninput="tituloHab4(' . $a . ')" class="tituloHab" type="text">
                                                <i style="transition: 1s;" id="setaCamp4' . $a . '" onclick="mostrarTextCampo4(' . $a . ')" class="setaHab bi-chevron-down" ></i>
                                            </div>
                                            <textarea maxlength="2000" class="campoHabAberto" style="display: block; height: ' . $camp4['tamanhoTxt4' . $a] . 'px;" oninput="textoHab4(' . $a . ')" name="Campo4HabTxt' . $a . '" id="Campo4HabTxt' . $a . '" rows="1" cols="30">' . $camp4['Campo4HabTxt' . $a] . '</textarea>
                                            <input value="' . $camp4['ativo4' . $a] . '" name="ativo4' . $a . '" id="ativo4' . $a . '" class="tituloHab" type="hidden">
                                            <input value="' . $camp4['tamanhoTxt4' . $a] . '" name="tamanhoTxt4' . $a . '" id="tamanhoTxt4' . $a . '" class="tituloHab" type="hidden">
                                        </div>
                                            <a onclick="removeHab4(' . $a . ')" class="remove">
                                                <i class="bi bi-dash"></i>
                                            </a>
                                    </div>
                                    ';
                                        $a++;
                                    }
                                }
                                ?>
                            </div>
                            <a class="botaoAdicionar" onclick="adicionarCampo4()">adicionar</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </form>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.js" integrity="sha512-9KkIqdfN7ipEW6B6k+Aq20PV31bjODg4AA52W+tYtAE0jE0kMx49bjJ3FgvS56wzmyfMUHbQ4Km2b7l9+Y/+Eg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="../index.js"></script>
</body>

</html>