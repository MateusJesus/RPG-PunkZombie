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
    $logadotema = $_SESSION['usuario'];
    $sqlvertema = "UPDATE usuarios SET tema='$tema' WHERE usuario = '$logadotema'";
    $resultvertema = $conn->query($sqlvertema);
    header("Location: ficha.php");
}
?>

<!DOCTYPE html>
<html lang="pt-br" class="
<?php
$logado = $_SESSION['usuario'];
$sqlver = "SELECT * FROM usuarios WHERE usuario = '$logado'";
$resultver = $conn->query($sqlver);
$row = $resultver->fetch_assoc();
print_r($row['tema'] == 'escuro' ? 'dark_mode' : '');
?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/root.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.css" integrity="sha512-hvNR0F/e2J7zPPfLC9auFe3/SE0yG4aJCOd/qxew74NN7eyiSKjr7xJJMu1Jy2wf7FXITpWS1E/RY8yzuXN7VA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="css/styleGeral.css">
    <link rel="stylesheet" href="css/personagem.css">
    <link rel="stylesheet" href="css/inventario.css">
    <link rel="stylesheet" href="css/habilidades.css">
    <link rel="stylesheet" href="css/mediaqueries.css">

    <title>RPG | PunkZombie</title>
</head>

<body>
<div class="sideBar">
        <div class="sideBarCOntent">
            <div class="botaoSidebar"><i class="bi bi-justify"></i></div>
            <a>
                <span><img src="assets/letreiro_punkzombie.png" alt="letreiro punkzombie"></span>
            </a>
            <hr>
            <ul class="opcoesSidebar">
                <a href="fichas.php">
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
                        <a href="ficha.php?tema=escuro">
                            <li class="<?php print_r($rowtema['tema'] == 'escuro' ? 'ativo' : ''); ?>">
                                <i class="bi bi-moon"> Modo escuro</i>
                            </li>
                        </a>
                        <a href="ficha.php?tema=claro">
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
                </a>
                <ul class="listaFichasSidebar overflow" id="listaFichasSidebar">
                    <?php
                    $logadolista = $_SESSION['usuario'];
                    $sqlverlista = "SELECT * FROM fichas WHERE usuario = '$logadolista'";
                    $resultverlista = $conn->query($sqlverlista);
                    if ($resultverlista->num_rows > 0) {
                        while ($rowlista = $resultverlista->fetch_assoc()) {
                            $dadosArray = json_decode($rowlista["informacoes"], true); ?>
                            <a href="editarFicha.php?id=<?php echo $rowlista['id_ficha'] ?>">
                                <li class="itemListaSidebar  <?php print_r($rowlista['id_ficha'] == $id_ficha ? 'ativo' : ''); ?>">
                                    <?php print_r(isset($dadosArray['nome_personagem']) ? $dadosArray['nome_personagem'] : 'Sem nome'); ?>
                                </li>
                            </a>
                    <?php }
                    } ?>
                </ul>
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
    <form action="php/dadosFicha.php" method="post">
        <header>
            <div class="cab">
                <button class="botaoAdicionar" type="submit">CRIAR FICHA</button>
            </div>
        </header>
        <div id="pag2">

            <input type="hidden" name="imagem" id="imagem" value="">
            <section id="personagem" class="section personagem">
                <h2 class="title_content">Personagem</h2>
                <div class="sobre_personagem">
                    <div class="informacoes_status">
                        <div class="div-inf_stat">
                            <div class="informacoes_perso box">
                                <h2 class="title_content">Informações</h2>
                                <div class="content_perso">
                                    <div class="inf_item">
                                        <label for="nome_jogador">Nome do Jogador:</label>
                                        <input maxlength="20" id="nome_jogador" name="nome_jogador" type="text">
                                    </div>
                                    <div class="inf_item">
                                        <label for="nome_personagem">Nome do personagem:</label>
                                        <input maxlength="30" id="nome_personagem" name="nome_personagem" type="text">
                                    </div>
                                    <div class="inf_item">
                                        <label for="variante">variante:</label>
                                        <input maxlength="15" id="variante" name="variante" type="text">
                                    </div>
                                    <div class="inf_item">
                                        <label for="origem">Origem:</label>
                                        <input id="origem" name="origem" type="text">
                                    </div>
                                    <div class="inf_item">
                                        <label for="classe">Classe:</label>
                                        <input id="classe" name="classe" type="text">
                                    </div>

                                </div>
                            </div>
                            <div class="status">
                                <div class="status_content">
                                    <div class="if_status box">
                                        <h2 class="title_content">NIV</h2>
                                        <div class="content">
                                            <input maxlength="2" class="input_num" type="text" name="status_niv" id="status_niv" oninput="statusNiv()">
                                        </div>
                                    </div>
                                    <div class="if_status box">
                                        <h2 class="title_content">PV</h2>
                                        <div class="content">
                                            <input maxlength="2" class="input_num" type="text" name="status_pdv" id="status_pdv">
                                            <hr>
                                            <input maxlength="2" class="input_num" type="text" name="status_pdvtot" id="status_pdvtot">
                                        </div>
                                    </div>
                                    <div class="if_status box">
                                        <h2 class="title_content">STA</h2>
                                        <div class="content">
                                            <input maxlength="2" class="input_num" type="text" name="status_sta" id="status_sta">
                                            <hr>
                                            <input maxlength="2" class="input_num" type="text" name="status_statot" id="status_statot">
                                        </div>
                                    </div>
                                    <div class="if_status box">
                                        <h2 class="title_content">PDI</h2>
                                        <div class="content">
                                            <input maxlength="2" class="input_num" type="text" name="status_pdi" id="status_pdi">
                                            <hr>
                                            <input maxlength="2" class="input_num" type="text" name="status_pditot" id="status_pditot">
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
                                <textarea name="aparencia" id="aparencia" cols="30" rows="5"></textarea>
                            </div>
                            <div class="caracteristica box">
                                <h2 class="title_content">personalidade</h2>
                                <textarea name="personalidade" id="personalidade" cols="30" rows="5"></textarea>
                            </div>
                        </div>

                    </div>

                    <div class="resistencia_foto">
                        <div class="resistencia box">
                            <h2 class="title_content">resistência</h2>
                            <input type="text" name="resist_perso" id="resist_perso">
                        </div>
                        <div class="imagem_perso box">
                            <div id="text_aviso">
                                <!-- <h1 id="aviso_pesado" class="pagina degrade">opa tu ta pesado</h1> -->
                            </div>
                            <div id="imagemContainer">
                                <img id="img_personagem" src="">
                                <label for="inputImgPerso" id="customFileUpload" class="custom-file-upload">
                                    <span id="spanFileUpload">Clique ou arraste e
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
                                <input type="text" maxlength="2" name="atri_for" id="atri_for">
                            </div>

                            <div class="atributo box">
                                <h2 class="title_content">INT</h2>
                                <input type="text" maxlength="2" name="atri_int" id="atri_int">
                            </div>

                            <div class="atributo box">
                                <h2 class="title_content">AGI</h2>
                                <input type="text" maxlength="2" name="atri_agi" id="atri_agi">
                            </div>

                            <div class="atributo box">
                                <h2 class="title_content">VIG</h2>
                                <input type="text" maxlength="2" name="atri_vig" id="atri_vig">
                            </div>

                            <div class="atributo box">
                                <h2 class="title_content">CAR</h2>
                                <input type="text" maxlength="2" name="atri_car" id="atri_car">
                            </div>
                        </div>
                        <div class="pericias box">
                            <h2 class="title_content">perícias</h2>
                            <div id="periciaScroll" class="pericia_content overflow">
                                <table class="table tablePer" id="tablePer">
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
                                        <!-- <tr >
                                    <td id="soma">0</td>
                                    <td><input type="text" name="" id="pericia"></td>
                                    <td>
                                        <select id="select" class="form-select" aria-label="Default select example">
                                            <option value="0">Selecione...</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="number" name="" id="meioNivel">
                                    </td>
                                    <td>
                                        <input type="number" name="" id="outros">
                                    </td>
                                    <td>
                                        <div class="menos">
                                            <i class="fa fa-minus"></i>
                                        </div>
                                    </td>
                                </tr> -->
                                    </tbody>
                                </table>
                                <a class="botaoAdicionar" onclick="adicionarPER()">
                                    <strong>
                                        ADICIONAR PERÍCIA
                                    </strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="inventario" class="section inventario">
                <h1 class="title_content">inventário</h1>
                <div class="TUDOinventario">
                    <div class="carga_prof">
                        <div class="carga box">
                            <h2 class="title_content">carga</h2>
                            <div class="carga_content">
                                <p class="res_carga" id="res_carga"></p>
                                <hr>
                                <input type="text" name="carga_total" id="carga_total" maxlength="4" placeholder="5" oninput="carga_total()">
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
                                                    <input id="nomeprotecao1" name="nomeprotecao1" placeholder="Armadura" maxlength="15" class="inputDesc" type="text">
                                                </td>
                                                <td>
                                                    <input id="inputPontosDefesa1" name="inputPontosDefesa1" class="inputDesc" type="text" maxlength="3">
                                                </td>
                                                <td>
                                                    <input id="inputRedDano1" name="inputRedDano1" class="inputDesc" type="text" maxlength="3">
                                                </td>
                                                <td>
                                                    <input id="inputPenaDefesa1" name="inputPenaDefesa1" class="inputDesc" type="text" maxlength="3">
                                                </td>
                                                <td>
                                                    <input id="inputCargaDefesa1" name="inputCargaDefesa1" class="inputDesc" type="text" maxlength="3">
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input id="nomeprotecao2" name="nomeprotecao2" placeholder="Escudo" maxlength="15" class="inputDesc" type="text">
                                                </td>
                                                <td>
                                                    <input id="inputPontosDefesa2" name="inputPontosDefesa2" class="inputDesc" type="text" maxlength="2">
                                                </td>
                                                <td>
                                                    <input id="inputRedDano2" name="inputRedDano2" class="inputDesc" type="text" maxlength="3">
                                                </td>
                                                <td>
                                                    <input id="inputPenaDefesa2" name="inputPenaDefesa2" class="inputDesc" type="text" maxlength="2">
                                                </td>
                                                <td>
                                                    <input id="inputCargaDefesa2" name="inputCargaDefesa2" class="inputDesc" type="text" maxlength="2">
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
                                                </td>
                                                <td>
                                                    <input id="outrosInputDef" name="outrosInputDef" class="inputDesc" type="text" maxlength="2" oninput="outrosDef()">
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
            <section id="habilidades" class="section habilidades">
                <h2 class="title_content">habilidades</h2>
                <div class="divhab">
                    <div class="camposHab">
                        <div class="campoHab box">
                            <input maxlength="30" class="titleCamp" type="text" name="titleCamp1" id="titleCamp1">
                            <textarea maxlength="1000" class="campoTxt" name="textCamp1" id="textCamp1" cols="30" rows="10"></textarea>
                        </div>
                        <div class="campoHab box">
                            <input maxlength="30" class="titleCamp" type="text" name="titleCamp2" id="titleCamp2">
                            <textarea maxlength="1000" class="campoTxt" name="textCamp2" id="textCamp2" cols="30" rows="10"></textarea>
                        </div>
                    </div>
                    <div class="overflow camposHab box">
                        <input maxlength="30" class="titleCamp" type="text" name="titleCamp3" id="titleCamp3" oninput="titleCamp3()">
                        <div id="camposHab3" class="overflow campHab_content">
                            <div id="Campo3Hab"></div>
                            <a class="botaoAdicionar" onclick="adicionarCampo3()">adicionar</a>
                        </div>
                    </div>
                    <div class="overflow camposHab box">
                        <input maxlength="30" class="titleCamp" type="text" name="titleCamp4" id="titleCamp4" oninput="titleCamp4()">
                        <div id="camposHab4" class="overflow campHab_content">
                            <div id="Campo4Hab"></div>
                            <a class="botaoAdicionar" onclick="adicionarCampo4()">adicionar</a>
                        </div>
                    </div>
                </div>
            </section>
    </form>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.js" integrity="sha512-9KkIqdfN7ipEW6B6k+Aq20PV31bjODg4AA52W+tYtAE0jE0kMx49bjJ3FgvS56wzmyfMUHbQ4Km2b7l9+Y/+Eg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="index.js"></script>
</body>

</html>