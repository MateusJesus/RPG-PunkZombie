document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        verificacao()
    }, 100);
})


function listaSidebar() {
    var listaFichasSidebar = document.getElementById('listaFichasSidebar')
    listaFichasSidebar.classList.toggle('verLista')
    const setaFichasSidebar = document.getElementById('setaFichasSidebar');
    setaFichasSidebar.style.transform = setaFichasSidebar.style.transform === 'scaleY(-1)' ? 'scaleY(1)' : 'scaleY(-1)';
}
function listaSidebar2() {
    var listaFichasSidebar = document.getElementById('listaFichasSidebar2')
    listaFichasSidebar.classList.toggle('verLista')
    const setaFichasSidebar = document.getElementById('setaFichasSidebar2');
    setaFichasSidebar.style.transform = setaFichasSidebar.style.transform === 'scaleY(-1)' ? 'scaleY(1)' : 'scaleY(-1)';
}


////////////////////////////


var pericias = []

function statusNiv() {
    calcular()
}

document.getElementById('atributos').addEventListener('input', a => calcular())

function adicionarPER() {
    if (pericias.length < 40) {
        pericias.push({
            soma: '',
            pericia: '',
            selectAtr: '',
            outrosPer: ''
        })
        calcular()
    } else {
        alert('Calma aí jovem, você já possui muitas perícias. Terei que lhe nerfar!👺')
    }
}

function inputPer(index) {
    var periciaInput = document.getElementById("pericia" + index).value
    pericias[index].pericia = periciaInput
}

function selectAtri(index) {
    var atributoSelect = document.getElementById('selectAtr' + index)
    var option = atributoSelect.options[atributoSelect.selectedIndex]
    pericias[index].selectAtr = option.value
    pericias[index].optionAtr = option.id
    calcular()
}

function inputOutrosPer(index) {
    var inputOutrosPer = document.getElementById("inputOutrosPer" + index).value
    pericias[index].outrosPer = Number(inputOutrosPer)
    calcular()
}

function removerPer(index) {
    pericias.splice(index, 1)
    calcular()
}

function calcular() {
    var forInpAtr = document.getElementById('atri_for')
    var intInpAtr = document.getElementById('atri_int')
    var agiInpAtr = document.getElementById('atri_agi')
    var vigInpAtr = document.getElementById('atri_vig')
    var carInpAtr = document.getElementById('atri_car')
    pericias.forEach((linha, index) => {
        var valorAtr
        var atributoSel = String(linha.selectAtr)
        switch (atributoSel) {
            case 'for':
                valorAtr = forInpAtr.value
                break
            case 'int':
                valorAtr = intInpAtr.value
                break
            case 'agi':
                valorAtr = agiInpAtr.value
                break
            case 'vig':
                valorAtr = vigInpAtr.value
                break
            case 'car':
                valorAtr = carInpAtr.value
                break
            default:
                valorAtr = forInpAtr.value
                break
        }
        var somaTot = Number(valorAtr) + parseInt((status_niv.value / 2) || 0) + Number(pericias[index].outrosPer || 0) + 2
        pericias[index].soma = somaTot
    })
    mostrarPer()
    selectDefAtr()
}

function mostrarPer() {
    var forInpAtr = document.getElementById('atri_for')
    var agiInpAtr = document.getElementById('atri_agi')
    var carInpAtr = document.getElementById('atri_car')
    var vigInpAtr = document.getElementById('atri_vig')
    var intInpAtr = document.getElementById('atri_int')
    var status_niv = document.getElementById('status_niv')
    var tBoryPer = document.getElementById('tBodyPer')
    var linhaPer = ''
    pericias.forEach((linha, index) => {
        linhaPer =
            linhaPer +
            `
        <tr id=linha${index}>
            <td class='tdsoma'>
                <p id="soma${index}" class='soma'>${linha.soma || '2'}</p>
                <input type="hidden" name="totalPer${index}" id="totalPer${index}" value="${linha.soma || '2'}">
            </td>
            <td>
                <input value="${linha.pericia || ""}" oninput="inputPer(${index})" maxlength="14" class="inputDesc" type="text" name="pericia${index}" id="pericia${index}">
            </td>
            <td>
                <select onchange="selectAtri(${index})" name="selectAtr${index}" id="selectAtr${index}" class="form-select">
                    <option ${linha.selectAtr == 'for' ? "selected" : ''} id='forPer${index}' value='for'>FOR: ${forInpAtr.value || 0}</option>
                    <option ${linha.selectAtr == 'int' ? "selected" : ''} id='intPer${index}' value='int'>INT: ${intInpAtr.value || 0}</option>
                    <option ${linha.selectAtr == 'agi' ? "selected" : ''} id='agiPer${index}' value='agi'>AGI: ${agiInpAtr.value || 0}</option>
                    <option ${linha.selectAtr == 'vig' ? "selected" : ''} id='vigPer${index}' value='vig'>VIG: ${vigInpAtr.value || 0}</option>
                    <option ${linha.selectAtr == 'car' ? "selected" : ''} id='carPer${index}' value='car'>CAR: ${carInpAtr.value || 0}</option>
                </select>
            </td>
            <td>
                <p class="textDefRes" class="MetNivel" type="text" name="meioNivel${index}" id="meioNivel${index}">${parseInt(status_niv.value / 2) || 0}</p>
            </td>
            <td>
                <input value="${linha.outrosPer || ""}" oninput="inputOutrosPer(${index})" class="inputDesc" type="text" maxlength="2" name="inputOutrosPer${index}" id="inputOutrosPer${index}">
            </td>
            <td>
                <a onclick="removerPer(${index})" class="remove">
                    <i class="bi bi-dash"></i>
                </a>
            </td>
        </tr>
        
        `

    })
    //  const jsonData = JSON.stringify(pericias)
    // $.ajax({
    //     url: 'php/dadosFicha.php',
    //     type: 'POST',
    //     data: {
    //         'pericias': jsonData
    //     }
    // })
    tBoryPer.innerHTML = linhaPer
    document.getElementById('periciaScroll').scrollTop = document.getElementById('periciaScroll').scrollHeight;

}



//////////////////////////



var equipamentos = []

function adicionarEquip() {
    if (equipamentos.length < 99) {
        equipamentos.push({
            qnt: '',
            item: '',
            descricao: '',
            carga: '',
        })
    } else {
        alert('TÁ ACHANO QUE É BURRO DE CARGA É ?!?!?!?!?!🙄😶😑')
    }
    mostrarEquip()
}

function mostrarEquip() {
    var tbodyEQUIP_1 = document.getElementById('tbodyEQUIP_1')
    var linhaEquip = ''
    equipamentos.forEach((elementos, index) => {
        linhaEquip =
            linhaEquip +
            `
                <tr id="linhaEQUIP1_id${index}">
                    <td>
                        <input oninput='qntEquip(${index})' value='${elementos.qnt}' name="qntEquip${index}"  id="qntEquip${index}" class="inputDesc" maxlength="2" type="text" placeholder="1">
                    </td>
                    <td>
                        <input maxlength="20" oninput='itemEquip(${index})' value='${elementos.item}' name="itemEquip${index}"  id="itemEquip${index}" class="inputDesc">
                    </td>
                    <td>
                        <input maxlength="50" oninput='descEquip(${index})' value='${elementos.descricao}' name="descEquip${index}"  id="descEquip${index}" class="inputDesc">
                    </td>
                    <td>
                        <input maxlength="3" oninput='cargaEquip(${index})' value='${elementos.carga}' name="cargaEequip${index}"  id="cargaEequip${index}" class="inputDesc" type="text" placeholder=".5">
                    </td>
                    <td>
                        <a onclick="removeEquip(${index})" class="remove">
                            <i class="bi bi-dash"></i>
                        </a>
                    </td>
                </tr>
                `
    })
    tbodyEQUIP_1.innerHTML = linhaEquip
    document.getElementById('equipamentosScroll').scrollTop = document.getElementById('equipamentosScroll').scrollHeight;
    calcularCargaItem()
}

function qntEquip(index) {
    var qntinput = document.getElementById('qntEquip' + index)
    equipamentos[index].qnt = qntinput.value
    calcularCargaItem()
}

function itemEquip(index) {
    var itemEquip = document.getElementById('itemEquip' + index)
    equipamentos[index].item = itemEquip.value
}

function descEquip(index) {
    var descEquip = document.getElementById('descEquip' + index)
    equipamentos[index].descricao = descEquip.value
}

function cargaEquip(index) {
    var cargaEquip = document.getElementById('cargaEequip' + index)
    equipamentos[index].carga = cargaEquip.value
    calcularCargaItem()
}

function removeEquip(index) {
    equipamentos.splice(index, 1)
    mostrarEquip()
    calcularCargaItem()
}



//////////////////////////



var vestimenta = []
function adicionarVest() {
    if (vestimenta.length < 10) {
        vestimenta.push({
            roupa: '',
            descricao: '',
            carga: ''
        })
        mostrarVest()
    } else {
        alert('Calma ai pô!!🙄😶😑')
    }
}

function mostrarVest() {
    var tbodyVest = document.getElementById('tbodyVest')
    var linhaVest = ''
    vestimenta.forEach((elemento, index) => {
        linhaVest =
            linhaVest +
            `
                <tr>
                    <td>
                        <input type='text' maxlength="15" value="${elemento.roupa}" oninput='roupaVest(${index})' name="roupaInputVest${index}"  id="roupaInputVest${index}" class="inputDesc">
                    </td>
                    <td>
                        <input type='text' maxlength="15" value="${elemento.descricao}" oninput='descVest(${index})' name="descInputVest${index}"  id="descInputVest${index}" class="inputDesc">
                    </td>
                    <td>
                        <input type='text' maxlength="2" value="${elemento.carga}" oninput='cargaVest(${index})' name="cargaInputVest${index}"  id="cargaInputVest${index}" class="inputDesc" >
                    </td>
                    <td>
                        <a onclick="removeVest(${index})" class="remove">
                            <i class="bi bi-dash"></i>
                        </a>
                    </td>
                </tr>
    `
    })
    tbodyVest.innerHTML = linhaVest
    document.getElementById('equipamentosScroll').scrollTop = document.getElementById('equipamentosScroll').scrollHeight;
    calcularCargaItem()
}

function roupaVest(index) {
    var roupaInputVest = document.getElementById('roupaInputVest' + index)
    vestimenta[index].roupa = roupaInputVest.value
}

function descVest(index) {
    var descInputVest = document.getElementById('descInutVest' + index)
    vestimenta[index].descricao = descInputVest.value
}

function cargaVest(index) {
    var cargaInputVest = document.getElementById('cargaInputVest' + index)
    vestimenta[index].carga = cargaInputVest.value
    calcularCargaItem()
}

function removeVest(index) {
    vestimenta.splice(index, 1)
    mostrarVest()
    calcularCargaItem()
}


//////////////////////////


var armas = []

function adicionarArma() {
    if (armas.length < 10) {
        armas.push({
            arma: '',
            testeDano: '',
            critico: '',
            municao: '',
            carga: ''
        })
    } else {
        alert('Calma ai pô!!🙄😶😑')
    }
    mostrarArma()
}

function mostrarArma() {
    var tbodyArma = document.getElementById('tbodyArma')
    var linhaArma = ''
    armas.forEach((elemento, index) => {
        linhaArma =
            linhaArma +
            `<tr>
                <td>
                    <input value='${elemento.arma}' maxlength='15' name='armaArma${index}'  id='armaArma${index}' oninput='armaArma(${index})' class="inputDesc">
                </td>
                <td>
                    <input value='${elemento.testeDano}' maxlength="10" name='testeArma${index}'  id='testeArma${index}' oninput='testeArma(${index})' class="inputDesc">
                </td>
                <td>
                    <input value='${elemento.critico}' maxlength="10" name='criticoArma${index}'  id='criticoArma${index}' oninput='criticoArma(${index})' class="inputDesc">
                </td>
                <td>
                    <input value='${elemento.municao}' maxlength="10" name='municaoArma${index}'  id='municaoArma${index}' oninput='municaoArma(${index})' class="inputDesc">
                </td>
                <td>
                    <input value='${elemento.carga}' maxlength="2" name='cargaArma${index}'  id='cargaArma${index}' oninput='cargaArma(${index})' class="inputDesc">
                </td>
                <td>
                    <a onclick="removeArma(${index})" class="remove">
                        <i class="bi bi-dash"></i>
                    </a>
                </td>
            </tr>`
    })
    tbodyArma.innerHTML = linhaArma
    calcularCargaItem()
    document.getElementById('armaScroll').scrollTop = document.getElementById('armaScroll').scrollHeight;
}

function armaArma(index) {
    var armaArma = document.getElementById('armaArma' + index)
    armas[index].arma = armaArma.value
}

function testeArma(index) {
    var testeArma = document.getElementById('testeArma' + index)
    armas[index].testeDano = testeArma.value
}

function criticoArma(index) {
    var criticoArma = document.getElementById('criticoArma' + index)
    armas[index].critico = criticoArma.value
}

function municaoArma(index) {
    var municaoArma = document.getElementById('municaoArma' + index)
    armas[index].municao = municaoArma.value
}

function cargaArma(index) {
    var cargaArma = document.getElementById('cargaArma' + index)
    armas[index].carga = cargaArma.value
    calcularCargaItem()
}

function removeArma(index) {
    armas.splice(index, 1)
    mostrarArma()
    calcularCargaItem()
}


//////////////////////////


var proficiencias = []
function adicionarProf() {
    if (proficiencias.length < 99) {
        proficiencias.push({
            proficiencia: '',
        })
    } else {
        alert('Calma ai pô!!🙄😶😑')
    }
    mostrarProf()
}

function mostrarProf() {
    var tbodyProf = document.getElementById('tbodyProf')
    var linhaProf = ''
    proficiencias.forEach((elemento, index) => {
        linhaProf =
            linhaProf +
            `
            <tr id="linhaProf${index}">
                <td>
                    <input maxlength='20' value='${elemento.proficiencia || ''}' id='profInput${index}' name='profInput${index}' oninput='profInput(${index})' class="inputDesc">
                </td>   
                <td>    
                    <a onclick="removeProf(${index})" class="remove">
                        <i class="bi bi-dash"></i>
                    </a>
                </td>
            </tr>
            `
    })
    tbodyProf.innerHTML = linhaProf
    document.getElementById('proficienciaScroll').scrollTop = document.getElementById('proficienciaScroll').scrollHeight; equipamentos
}

function profInput(index) {
    proficiencias[index].proficiencia = document.getElementById('profInput' + index).value || ''
}

function removeProf(index) {
    proficiencias.splice(index, 1)
    mostrarProf()
}


//////////////////////////


var valorPontoDef = [0, 0, 0, 0]
var valorPenaDef = [0, 0]
var valorRedDano = [0, 0]
var cargaDef = [0, 0]

function defesa() {
    var inputPontosDefesa1 = document.getElementById('inputPontosDefesa1')
    valorPontoDef[0] = (Number(inputPontosDefesa1.value) || 0)

    var inputPontosDefesa2 = document.getElementById('inputPontosDefesa2')
    valorPontoDef[1] = (Number(inputPontosDefesa2.value) || 0)

    var inputRedDano1 = document.getElementById('inputRedDano1')
    valorRedDano[0] = Number(inputRedDano1.value) || 0

    var inputRedDano2 = document.getElementById('inputRedDano2')
    valorRedDano[1] = Number(inputRedDano2.value) || 0

    var inputPenaDefesa1 = document.getElementById('inputPenaDefesa1')
    valorPenaDef[0] = Number(inputPenaDefesa1.value) || 0

    var inputPenaDefesa2 = document.getElementById('inputPenaDefesa2')
    valorPenaDef[1] = Number(inputPenaDefesa2.value) || 0

    var inputCargaDefesa1 = document.getElementById('inputCargaDefesa1')
    cargaDef[0] = Number(inputCargaDefesa1.value) || 0

    var inputCargaDefesa2 = document.getElementById('inputCargaDefesa2')
    cargaDef[1] = Number(inputCargaDefesa2.value) || 0

    var outrosInputDef = document.getElementById('outrosInputDef')
    valorPontoDef[3] = Number(outrosInputDef.value) || 0

    mostrarPontosDef()
    selectDefAtr()
}

function mostrarPontosDef() {
    var res_defesa = document.getElementById('res_defesa')
    var defesatot = document.getElementById('defesatot')
    var resDefDef = document.getElementById('resDefDef')
    var armdDef = document.getElementById('armdDef')
    var escudDef = document.getElementById('escudDef')
    var resRedDano = document.getElementById('resRedDano')
    var resPenDef = document.getElementById('resPenDef')
    var somaPontos = Number(valorPontoDef.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0) + 10 || 0)
    armdDef.innerHTML = valorPontoDef[0] || 0
    escudDef.innerHTML = valorPontoDef[1] || 0
    resDefDef.innerHTML = somaPontos
    res_defesa.innerHTML = somaPontos
    defesatot.value = somaPontos

    var somaRedDano = Number(valorRedDano.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0) || 0)
    resRedDano.innerHTML = somaRedDano || 0

    var somaPenalidade = Number(valorPenaDef.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0) || 0)
    resPenDef.innerHTML = somaPenalidade || 0
    calcularCargaItem()
}

function selectDefAtr() {
    var opcãoSelecionadaDef = ''
    var selectDefesaAtr = document.getElementById('selectDefesaAtr')
    var forInpAtr = document.getElementById('atri_for')
    var agiInpAtr = document.getElementById('atri_agi')
    var carInpAtr = document.getElementById('atri_car')
    var vigInpAtr = document.getElementById('atri_vig')
    var intInpAtr = document.getElementById('atri_int')
    var atributoSel = String(selectDefesaAtr.value)
    var valorAtr
    function atualizarOptionsSel() {
        var optionsSelDef =
            `
        <option ${opcãoSelecionadaDef == 'forDef' ? "selected" : ''} id='forDef' value='forDef'>FOR: ${forInpAtr.value || 0}</option>
        <option ${opcãoSelecionadaDef == 'intDef' ? "selected" : ''} id='intDef' value='intDef'>INT: ${intInpAtr.value || 0}</option>
        <option ${opcãoSelecionadaDef == 'agiDef' ? "selected" : ''} id='agiDef' value='agiDef'>AGI: ${agiInpAtr.value || 0}</option>
        <option ${opcãoSelecionadaDef == 'vigDef' ? "selected" : ''} id='vigDef' value='vigDef'>VIG: ${vigInpAtr.value || 0}</option>
        <option ${opcãoSelecionadaDef == 'carDef' ? "selected" : ''} id='carDef' value='carDef'>CAR: ${carInpAtr.value || 0}</option>
        `
        selectDefesaAtr.innerHTML = optionsSelDef
    }

    switch (atributoSel) {
        case 'forDef':
            valorAtr = forInpAtr.value
            break
        case 'intDef':
            valorAtr = intInpAtr.value
            break
        case 'agiDef':
            valorAtr = agiInpAtr.value
            break
        case 'vigDef':
            valorAtr = vigInpAtr.value
            break
        case 'carDef':
            valorAtr = carInpAtr.value
            break
        default:
            valorAtr = forInpAtr.value
            break
    }
    opcãoSelecionadaDef = atributoSel
    valorPontoDef[2] = Number(valorAtr) || 0
    atualizarOptionsSel()
    mostrarPontosDef()
}



//////////////////////////




var campo3 = []
function adicionarCampo3() {
    if (campo3.length < 40) {
        campo3.push({
            titulo: '',
            texto: '',
            ativo: 'desativado',
            tamanhoTxt: 15
        })
    } else {
        alert('Calma ai pô!!🙄😶😑')
    }
    mostrarCampo3()
}

function mostrarCampo3() {
    var Campo3Hab = document.getElementById('Campo3Hab');
    var linhaCampo3 = ''
    campo3.forEach((elemento, index) => {
        linhaCampo3 =
            linhaCampo3 +
            `<div id="Campo3HabDiv3${index}" class="itemCampoHab">
            <div style='width:100%'>
                <div style='width:100%'>
                    <input maxlength="50" value='${elemento.titulo || ''}' name='tituloHab3${index}'  id='tituloHab3${index}' oninput='tituloHab3(${index})' class='tituloHab' type='text'>
                    <i style='transition: 1s;' id='setaCamp3${index}' onclick='mostrarTextCampo3(${index})' class="setaHab ${elemento.ativo === 'desativado' ? '' : 'setaVira'} bi-chevron-down"></i>
                </div>
                <textarea maxlength="2000" class='campoHabAberto' style="display: ${elemento.ativo === 'desativado' ? 'none' : 'block'}; height: ${elemento.tamanhoTxt}px;" oninput="textoHab3(${index})" name="Campo3HabTxt${index}" id="Campo3HabTxt${index}"  rows="1" cols="30">${elemento.texto || ''}</textarea>
                <input value='${elemento.ativo}' name='ativo3${index}' id='ativo3${index}' class='tituloHab' type='hidden'>
                <input value='${elemento.tamanhoTxt}' name='tamanhoTxt3${index}' id='tamanhoTxt3${index}' class='tituloHab' type='hidden'>
            </div>
            <td>
                <a onclick="removeHab3(${index})" class="remove">
                    <i class="bi bi-dash"></i>
                </a>
            </td>
        </div>`
    })
    Campo3Hab.innerHTML = linhaCampo3
    document.getElementById('camposHab3').scrollTop = document.getElementById('camposHab3').scrollHeight;
}

function tituloHab3(index) {
    var tituloHab3 = document.getElementById('tituloHab3' + index)
    campo3[index].titulo = tituloHab3.value
}

function textoHab3(index) {
    var textoHab3 = document.getElementById('Campo3HabTxt' + index)
    campo3[index].texto = textoHab3.value

    textoHab3.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight - 14) + 'px';
        campo3[index].tamanhoTxt = this.scrollHeight
        document.getElementById('tamanhoTxt3' + index).value = campo3[index].tamanhoTxt
    })
}

function mostrarTextCampo3(index) {
    var campo = document.getElementById('Campo3HabTxt' + index)
    var setaCamp3 = document.getElementById('setaCamp3' + index)
    setaCamp3.classList.toggle('setaVira')
    if (campo.attributes.style.value == 'display: none; height: ' + campo3[index].tamanhoTxt + 'px;') {
        campo.style = 'display: block; height: ' + campo3[index].tamanhoTxt + 'px'
        campo3[index].ativo = 'ativado'
        document.getElementById('ativo3' + index).value = campo3[index].ativo
    } else {
        campo.style = 'display: none; height: ' + campo3[index].tamanhoTxt + 'px'
        campo3[index].ativo = 'desativado'
        document.getElementById('ativo3' + index).value = campo3[index].ativo
    }
}

function removeHab3(index) {
    campo3.splice(index, 1)
    mostrarCampo3()
}


//////////////////////////




var campo4 = []
function adicionarCampo4() {
    if (campo4.length < 40) {
        campo4.push({
            titulo: '',
            texto: '',
            ativo: 'desativado',
            tamanhoTxt: 15
        })
    } else {
        alert('Calma ai pô!!🙄😶😑')
    }
    mostrarCampo4()
}

function mostrarCampo4() {
    var Campo4Hab = document.getElementById('Campo4Hab');
    var linhaCampo4 = ''
    campo4.forEach((elemento, index) => {
        linhaCampo4 =
            linhaCampo4 +
            `<div id="Campo4HabDiv4${index}" class="itemCampoHab">
            <div style='width:100%'>
                <div style='width:100%'>
                    <input maxlength="50" value='${elemento.titulo || ''}' name='tituloHab4${index}'  id='tituloHab4${index}' oninput='tituloHab4(${index})' class='tituloHab' type='text'>
                    <i style='transition: 1s;' id='setaCamp4${index}' onclick='mostrarTextCampo4(${index})' class="setaHab ${elemento.ativo === 'desativado' ? '' : 'setaVira'} bi-chevron-down"></i>
                </div>
                <textarea maxlength="2000" class='campoHabAberto' style="display: ${elemento.ativo === 'desativado' ? 'none' : 'block'}; height: ${elemento.tamanhoTxt}px;" oninput="textoHab4(${index})" name="Campo4HabTxt${index}" id="Campo4HabTxt${index}"  rows="1" cols="40">${elemento.texto || ''}</textarea>
                <input value='${elemento.ativo}' name='ativo4${index}' id='ativo4${index}' class='tituloHab' type='hidden'>
                <input value='${elemento.tamanhoTxt}' name='tamanhoTxt4${index}' id='tamanhoTxt4${index}' class='tituloHab' type='hidden'>
            </div>
            <td>
                <a onclick="removeHab4(${index})" class="remove">
                    <i class="bi bi-dash"></i>
                </a>
            </td>
        </div>`
    })
    Campo4Hab.innerHTML = linhaCampo4
    document.getElementById('camposHab4').scrollTop = document.getElementById('camposHab4').scrollHeight;
}

function tituloHab4(index) {
    var tituloHab4 = document.getElementById('tituloHab4' + index)
    campo4[index].titulo = tituloHab4.value
}

function textoHab4(index) {
    var textoHab4 = document.getElementById('Campo4HabTxt' + index)
    campo4[index].texto = textoHab4.value

    textoHab4.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight - 14) + 'px';
        campo4[index].tamanhoTxt = this.scrollHeight
        document.getElementById('tamanhoTxt4' + index).value = campo4[index].tamanhoTxt
    })
}

function mostrarTextCampo4(index) {
    var campo = document.getElementById('Campo4HabTxt' + index)
    var setaCamp4 = document.getElementById('setaCamp4' + index)
    setaCamp4.classList.toggle('setaVira')
    if (campo.attributes.style.value == 'display: none; height: ' + campo4[index].tamanhoTxt + 'px;') {
        campo.style = 'display: block; height: ' + campo4[index].tamanhoTxt + 'px'
        campo4[index].ativo = 'ativado'
        document.getElementById('ativo4' + index).value = campo4[index].ativo
    } else {
        campo.style = 'display: none; height: ' + campo4[index].tamanhoTxt + 'px'
        campo4[index].ativo = 'desativado'
        document.getElementById('ativo4' + index).value = campo4[index].ativo
    }
}

function removeHab4(index) {
    campo4.splice(index, 1)
    mostrarCampo4()
}



//////////////////////////

function cargatotal() {
    calcularCargaItem()
}

function calcularCargaItem() {
    soma = []
    equipamentos.forEach((elemento) => {
        soma.push(Number(elemento.qnt || 1) * Number(elemento.carga || .5))
    })
    vestimenta.forEach((elemento) => {
        soma.push(Number(elemento.carga))
    })
    armas.forEach((elemento) => {
        soma.push(Number(elemento.carga))
    })

    var somaCarga = cargaDef.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0) + soma.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0)

    respostaCarga(somaCarga)
}

function respostaCarga(valor) {
    var carga_total = Number(document.getElementById('carga_total').value) || 5
    var res_carga = document.getElementById('res_carga')
    var text_aviso = document.getElementById('text_aviso')
    if (valor > (carga_total + .5)) {
        text_aviso.innerHTML = '<h1 id="aviso_pesado" class="degrade">VOCÊ ESTÁ PESADO!</h1>'
        res_carga.innerHTML = valor;
    } else {
        text_aviso.innerHTML = ''
        res_carga.innerHTML = valor;
    }
}

function verificacao() {
    var index = 0
    while (document.getElementById('pericia' + index)) {
        pericias.push({
            soma: Number(document.getElementById('totalPer' + index)),
            pericia: document.getElementById('pericia' + index).value,
            selectAtr: document.getElementById('selectAtr' + index).value,
            outrosPer: Number(document.getElementById('inputOutrosPer' + index).value)
        })
        index++
    }

    var index = 0
    while (document.getElementById('qntEquip' + index)) {
        equipamentos.push({
            qnt: Number(document.getElementById('qntEquip' + index).value) || 1,
            item: document.getElementById('itemEquip' + index).value,
            descricao: document.getElementById('descEquip' + index).value,
            carga: Number(document.getElementById('cargaEequip' + index).value) || 0.5
        })
        index++
    }

    var index = 0
    while (document.getElementById('roupaInputVest' + index)) {
        vestimenta.push({
            roupa: document.getElementById('roupaInputVest' + index).value,
            descricao: document.getElementById('descInputVest' + index).value,
            carga: Number(document.getElementById('cargaInputVest' + index || 0).value),
        })
        index++
    }

    var index = 0
    while (document.getElementById('armaArma' + index)) {
        armas.push({
            arma: document.getElementById('armaArma' + index).value,
            testeDano: document.getElementById('testeArma' + index).value,
            critico: document.getElementById('criticoArma' + index || 0).value,
            municao: document.getElementById('municaoArma' + index || 0).value,
            carga: Number(document.getElementById('cargaArma' + index || 0).value),
        })
        index++
    }

    var index = 0
    while (document.getElementById('profInput' + index)) {
        proficiencias.push({
            proficiencia: document.getElementById('profInput' + index).value,
        })
        index++
    }

    var index = 0
    while (document.getElementById('tituloHab3' + index)) {
        campo3.push({
            titulo: document.getElementById('tituloHab3' + index).value,
            texto: document.getElementById('Campo3HabTxt' + index).value,
            ativo: document.getElementById('ativo3' + index).value,
            tamanhoTxt: document.getElementById('tamanhoTxt3' + index).value
        })
        index++
    }

    var index = 0
    while (document.getElementById('tituloHab4' + index)) {
        campo4.push({
            titulo: document.getElementById('tituloHab4' + index).value,
            texto: document.getElementById('Campo4HabTxt' + index).value,
            ativo: document.getElementById('ativo4' + index).value,
            tamanhoTxt: document.getElementById('tamanhoTxt4' + index).value
        })
        index++
    }
    mostrarCampo4()
    mostrarCampo3()
    defesa()
    calcularCargaItem()
}


///////////////////////////////



function crop(imagem) {
    return new Cropper(imagem, {
        dragMode: 'move',
        aspectRatio: 9 / 16,
    })
}

function verificarTamanhoArquivo(dataUrl, limite) {
    // Converta o data URL para uma string binária
    var binario = atob(dataUrl.split(',')[1]);
    // Obtenha o tamanho do arquivo em bytes
    var tamanho = binario.length;
    // Converta o tamanho do arquivo para kilobytes
    var tamanhoKB = tamanho / 1024;
    // Verifique se o tamanho do arquivo excede o limite especificado
    if (tamanhoKB > limite) {
        // Se exceder, retorne true
        return true;
    }
    // Caso contrário, retorne false
    return false;
}

function editarImg(id, imgProvisoria) {
    var loading = document.getElementById('loading')
    var previewImg = document.getElementById('previewImg')
    var previewBtn = document.getElementById('previewBtn')
    var imagemContainer = document.getElementById('imagemContainer')
    var img_personagem = document.getElementById('img_personagem')
    var customFileUpload = document.getElementById('customFileUpload')
    var fecharEditor = document.createElement('a')
    var prontoEditor = document.createElement('a')
    var pag3 = document.getElementById('pag3')

    loading.style.display = 'flex'
    pag3.style.display = 'flex'
    imgProvisoria.style.display = 'none'

    setTimeout(() => {
        loading.style.display = 'none'
        previewImg.appendChild(imgProvisoria)
        let cropper = crop(imgProvisoria)
        prontoEditor.innerHTML = 'Concluir'
        fecharEditor.innerHTML = 'Cancelar'
        prontoEditor.classList.add('botaoAdicionar')
        fecharEditor.classList.add('botaoAdicionar')
        previewBtn.appendChild(prontoEditor)
        previewBtn.appendChild(fecharEditor)

        fecharEditor.addEventListener('click', function () {
            pag3.style.display = 'none'
            imgProvisoria.remove()
            cropper.destroy()
            prontoEditor.remove()
            fecharEditor.remove()
            imagemContainer.appendChild(imgProvisoria)
        });

        prontoEditor.addEventListener('click', function () {
            var cropped = cropper.getCroppedCanvas().toDataURL('image/png')
            if (verificarTamanhoArquivo(cropped, 1024)) {
                alert("O arquivo é muito grande. Por favor, selecione uma imagem menor.");
                cropper.destroy()
                prontoEditor.remove()
                fecharEditor.remove()
                pag3.style.display = 'none'
                return;
            } else {
                document.getElementById('imagem').value = cropped
                img_personagem.src = cropped
                img_personagem.style.display = 'flex'
                imagemContainer.appendChild(imgProvisoria)
                cropper.destroy()
                prontoEditor.remove()
                fecharEditor.remove()
                customFileUpload.style.display = 'none'
                pag3.style.display = 'none'
            }

        });
    }, 2000)
}

var customFileUpload = document.getElementById('customFileUpload');
customFileUpload.addEventListener('dragover', function (e) {
    e.preventDefault();
    customFileUpload.classList.add('dragover');
});

customFileUpload.addEventListener('dragleave', function (e) {
    e.preventDefault();
    customFileUpload.classList.remove('dragover');
});

customFileUpload.addEventListener('drop', function (e) {
    e.preventDefault();
    customFileUpload.classList.remove('dragover');

    var files = e.dataTransfer.files;
    if (files) {
        var imagem = document.createElement('img')
        var previewImg = document.getElementById('previewImg');
        var reader = new FileReader();

        reader.onload = function (event) {
            imagem.id = 'imagem_preview'
            imagem.src = event.target.result
            imagem.style.height = '1em'
            imagem.style.width = '1em'
            imagem.style.display = 'none'
            previewImg.appendChild(imagem)
        };
        reader.readAsDataURL(files[0]);
        editarImg('img_personagem', imagem)
    }
});

customFileUpload.addEventListener('change', function (event) {
    if (event) {
        var imgProvisoria = document.createElement('img')
        var previewImg = document.getElementById('previewImg');
        var reader = new FileReader();

        reader.onload = function (event) {
            imgProvisoria.id = 'imgProvisoria'
            imgProvisoria.src = event.target.result
            previewImg.appendChild(imgProvisoria)
        };
        // Lê o conteúdo do arquivo como uma URL base64
        reader.readAsDataURL(event.target.files[0]);
        editarImg('img_personagem', imgProvisoria)
    }
});

document.getElementById('img_personagem').addEventListener('click', function () {
    var opcoesImagem = document.getElementById('opcoesImagem')
    var opcoesImagemBtns = document.getElementById('opcoesImagemBtns')
    
    var opcaoEditar = document.createElement('label')
    var opcaoAtualizarLabel = document.createElement('label')
    var opcaoAtualizar = document.createElement('input')
    var opcaoExcluir = document.createElement('label')

    opcoesImagem.style.display = 'flex';
    opcaoEditar.innerHTML = 'editar'
    opcaoAtualizar.id = 'atualizarImagem'
    opcaoAtualizarLabel.innerHTML = 'atualizar'
    opcaoExcluir.innerHTML = 'excluir'

    opcaoEditar.setAttribute('type', 'button')
    opcaoAtualizarLabel.setAttribute('for', 'atualizarImagem')
    opcaoAtualizar.setAttribute('type', 'file')
    opcaoAtualizar.setAttribute("accept", ".jpg, .jpeg, .png")
    opcaoExcluir.setAttribute('type', 'button')

    opcaoEditar.setAttribute('value', 'Editar')
    opcaoAtualizar.setAttribute('value', 'Atualizar')
    opcaoExcluir.setAttribute('value', 'Excluir')

    opcaoAtualizar.style.display = 'none';

    opcoesImagemBtns.appendChild(opcaoEditar)
    opcoesImagemBtns.appendChild(opcaoAtualizarLabel)
    opcaoAtualizarLabel.appendChild(opcaoAtualizar)
    opcoesImagemBtns.appendChild(opcaoExcluir)

    opcaoEditar.addEventListener('click', function () {
        var imgProvisoria = document.createElement('img')
        var previewImg = document.getElementById('previewImg');

        opcoesImagem.style.display = 'none';
        opcaoEditar.remove()
        opcaoAtualizarLabel.remove()
        opcaoAtualizar.remove()
        opcaoExcluir.remove()

        imgProvisoria.src = img_personagem.src
        previewImg.appendChild(imgProvisoria)
        editarImg('img_personagem', imgProvisoria)
    })

    opcaoAtualizar.addEventListener('change', function (event) {
        if (event) {
            var imgProvisoria = document.createElement('img')
            var previewImg = document.getElementById('previewImg');
            var reader = new FileReader();

            reader.onload = function (event) {
                imgProvisoria.id = 'imgProvisoria'
                imgProvisoria.src = event.target.result
                previewImg.appendChild(imgProvisoria)
            };
            // Lê o conteúdo do arquivo como uma URL base64
            reader.readAsDataURL(event.target.files[0]);
            editarImg('img_personagem', imgProvisoria)
        }
        opcoesImagem.style.display = 'none';
        opcaoEditar.remove()
        opcaoAtualizar.remove()
        opcaoAtualizarLabel.remove()
        opcaoExcluir.remove()
    })

    opcaoExcluir.addEventListener('click', function () {
        opcoesImagem.style.display = 'none';
        document.getElementById('img_personagem').style.display = 'none'
        document.getElementById('img_personagem').src = ''
        document.getElementById('imagem').value = 'excluida'
        opcaoEditar.remove()
        opcaoAtualizarLabel.remove()
        opcaoAtualizar.remove()
        opcaoExcluir.remove()
        document.getElementById('img_personagem').style.display = 'none'
        var customFileUpload = document.getElementById('customFileUpload')

        customFileUpload.style.display = 'flex'
    })

    opcoesImagem.addEventListener("click", function (event) {
        if (!opcoesImagemBtns.contains(event.target)) {
            opcoesImagem.style.display = 'none';
            opcaoEditar.remove()
            opcaoAtualizar.remove()
            opcaoAtualizarLabel.remove()
            opcaoExcluir.remove()
            opcoesImagem.style.display = 'none';
        }
    });

})