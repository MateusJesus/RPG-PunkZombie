
var perso
console.log(perso)

function salvarLocalmente(key, elemento) {
    localStorage.setItem(key, elemento);
}

function pegarLocalmente(key) {
    return localStorage.getItem(key);
}

function gerarId() {
    let idCounter = parseInt(pegarLocalmente('idCounter')) || 1;
    const novoId = idCounter;
    idCounter++;
    localStorage.setItem('idCounter', idCounter);
    return novoId;
}

function criarFicha() {
    var id = gerarId();
    salvarLocalmente('nome_personagem_' + id, document.getElementById('nome_personagem').value);
    mostrarListaFichas()
    visualizarFicha(id)
}

function loadingFicha(id) {
    var loadingFicha = document.getElementById('loadingFicha')
    var pag1 = document.getElementById('pag1');
    pag1.style.display = 'none'
    var pag2 = document.getElementById('pag2');
    pag2.style.display = 'none'
    loadingFicha.style.display = 'flex'
    setTimeout(() => {
        loadingFicha.style.display = 'none'
        var pag2 = document.getElementById('pag2');
        pag2.style.display = 'block'
    }, 2000)
}

function visualizarFicha(id) {
    perso = id
    window.location.hash = '#pag2';

    var pag1 = document.getElementById('pag1');
    pag1.style.display = 'none'
    var pag2 = document.getElementById('pag2');
    pag2.style.display = 'block'

    var customFileUpload = document.getElementById('customFileUpload')
    customFileUpload.style.display = 'none'

    document.getElementById('nome_jogador').value = pegarLocalmente('nome_jogador_' + id);
    document.getElementById('nome_personagem').value = pegarLocalmente('nome_personagem_' + id);
    document.getElementById('variante').value = pegarLocalmente('variante_' + id);
    document.getElementById('origem').value = pegarLocalmente('origem_' + id);
    document.getElementById('classe').value = pegarLocalmente('classe_' + id);

    document.getElementById('status_niv').value = pegarLocalmente('status_niv_' + id);
    document.getElementById('status_sta').value = pegarLocalmente('status_sta_' + id);
    document.getElementById('status_statot').value = pegarLocalmente('status_statot_' + id);
    document.getElementById('status_pdi').value = pegarLocalmente('status_pdi_' + id);
    document.getElementById('status_pditot').value = pegarLocalmente('status_pditot_' + id);
    document.getElementById('status_pdv').value = pegarLocalmente('status_pdv_' + id);
    document.getElementById('status_pdvtot').value = pegarLocalmente('status_pdvtot_' + id);

    document.getElementById('aparencia').value = pegarLocalmente('aparencia_' + id)
    document.getElementById('personalidade').value = pegarLocalmente('personalidade_' + id)

    document.getElementById('resist_perso').value = pegarLocalmente('resist_perso_' + id)
    document.getElementById('img_personagem').src = pegarLocalmente('img_personagem_' + id) || ''

    document.getElementById('atri_for').value = pegarLocalmente('atri_for_' + id)
    document.getElementById('atri_int').value = pegarLocalmente('atri_int_' + id)
    document.getElementById('atri_agi').value = pegarLocalmente('atri_agi_' + id)
    document.getElementById('atri_vig').value = pegarLocalmente('atri_vig_' + id)
    document.getElementById('atri_car').value = pegarLocalmente('atri_car_' + id)

    var fotoPerso = pegarLocalmente('img_personagem_' + id) || ''
    if (fotoPerso == '') {
        var customFileUpload = document.getElementById('customFileUpload')
        customFileUpload.style.display = 'flex'
    }

    recarregarDefesa()
    document.getElementById('inputPontosDefesa1').value = valorPontoDef[0]
    document.getElementById('inputPontosDefesa2').value = valorPontoDef[1]
    document.getElementById('outrosInputDef').value = valorPontoDef[3]

    document.getElementById('inputPenaDefesa1').value = valorPenaDef[0]
    document.getElementById('inputPenaDefesa2').value = valorPenaDef[1]

    document.getElementById('inputCargaDefesa1').value = cargaDef[0]
    document.getElementById('inputCargaDefesa2').value = cargaDef[1]

    document.getElementById('carga_total').value = pegarLocalmente('totalCarga_' + id)


    document.getElementById('nomeprotecao1').value = pegarLocalmente('nomeprotecao1_' + id)
    document.getElementById('nomeprotecao2').value = pegarLocalmente('nomeprotecao2_' + id)

    recarregarPer()
    recarregarProf()
    recarregarEquip()
    recarregarVest()
    recarregarArma()
    calcularCargaItem()
    atualizarOptionsSel()

    document.getElementById('titleCamp1').value = pegarLocalmente('titleCamp1_' + id)
    document.getElementById('textCamp1').value = pegarLocalmente('textCamp1_' + id)

    document.getElementById('titleCamp2').value = pegarLocalmente('titleCamp2_' + id)
    document.getElementById('textCamp2').value = pegarLocalmente('textCamp2_' + id)

    recarregarCampo3()
    document.getElementById('titleCamp3').value = pegarLocalmente('titleCamp3_' + id)

    recarregarCampo4()
    document.getElementById('titleCamp4').value = pegarLocalmente('titleCamp4_' + id)
}

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
    var fecharEditor = document.createElement('button')
    var prontoEditor = document.createElement('button')
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
                img_personagem.src = cropped
                img_personagem.style.display = 'flex'
                imagemContainer.appendChild(imgProvisoria)
                salvarLocalmente(id, cropped);
                cropper.destroy()
                prontoEditor.remove()
                fecharEditor.remove()
                customFileUpload.style.display = 'none'
                pag3.style.display = 'none'
            }

        });
    }, 2000)
}

function mostrarListaFichas() {
    var listaFichasSidebar = document.getElementById('listaFichasSidebar')
    listaFichasSidebar.innerHTML = ''; // Limpa o conteúdo atual

    // Itera sobre as chaves do localStorage
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.startsWith('nome_personagem_')) {
            var id = key.replace('nome_personagem_', '');
            var nome_personagem = pegarLocalmente(key);

            // Crie elementos HTML para exibir as informações da ficha
            var itemFichas = document.createElement('li'); itemFichas.classList.add('itemListaSidebar')
            var iconItemFichas = document.createElement('i');
            iconItemFichas.classList.add("bi", "bi-person-vcard")

            var textFicha = document.createElement('a');
            textFicha.innerText = ` ${nome_personagem || ' (Sem Nome)'}`

            var removerItemFicha = document.createElement('i');
            removerItemFicha.classList.add("bi", "bi-trash")
            removerItemFicha.setAttribute('onclick', 'removerFicha(' + id + ')')

            textFicha.setAttribute('onclick', 'loadingFicha(' + id + ')')

            // Adicione a ficha à área de fichas na interface do usuário
            iconItemFichas.appendChild(textFicha)
            itemFichas.appendChild(iconItemFichas);
            itemFichas.appendChild(removerItemFicha);
            listaFichasSidebar.appendChild(itemFichas);
        }
    }

}

function listaSidebar() {
    var listaFichasSidebar = document.getElementById('listaFichasSidebar')
    listaFichasSidebar.classList.toggle('verLista')
    const setaFichasSidebar = document.getElementById('setaFichasSidebar');
    setaFichasSidebar.style.transform = setaFichasSidebar.style.transform === 'scaleY(-1)' ? 'scaleY(1)' : 'scaleY(-1)';
}

function removerFicha(id) {
    // Cria um array para armazenar as chaves a serem removidas
    if (id == perso) {
        pag1.style.display = 'block'
        pag2.style.display = 'none'
    }
    var chavesParaRemover = [];
    // Itera sobre todas as chaves do localStorage
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        // Verifica se a chave termina com o ID especificado
        if (key.endsWith('_' + id)) {
            // Adiciona a chave ao array de chaves a serem removidas
            chavesParaRemover.push(key);
        }
    }

    // Itera sobre o array de chaves a serem removidas e remove cada uma
    chavesParaRemover.forEach(function (key) {
        localStorage.removeItem(key);
    });
    mostrarListaFichas();
}

function voltarPagInicial() {
    pag1.style.display = 'block'
    pag2.style.display = 'none'
}

document.getElementById('nome_jogador').addEventListener('input', function () {
    salvarLocalmente('nome_jogador_' + perso, document.getElementById('nome_jogador').value);
});
document.getElementById('nome_personagem').addEventListener('input', function () {
    salvarLocalmente('nome_personagem_' + perso, document.getElementById('nome_personagem').value);
    mostrarListaFichas()
});
document.getElementById('variante').addEventListener('input', function () {
    salvarLocalmente('variante_' + perso, document.getElementById('variante').value);
});
document.getElementById('origem').addEventListener('input', function () {
    salvarLocalmente('origem_' + perso, document.getElementById('origem').value);
});
document.getElementById('classe').addEventListener('input', function () {
    salvarLocalmente('classe_' + perso, document.getElementById('classe').value);
});

document.getElementById('aparencia').addEventListener('input', function () {
    salvarLocalmente('aparencia_' + perso, document.getElementById('aparencia').value);
});
document.getElementById('personalidade').addEventListener('input', function () {
    salvarLocalmente('personalidade_' + perso, document.getElementById('personalidade').value);
});

document.getElementById('status_niv').addEventListener('input', function () {
    salvarLocalmente('status_niv_' + perso, document.getElementById('status_niv').value);
});
document.getElementById('status_sta').addEventListener('input', function () {
    salvarLocalmente('status_sta_' + perso, document.getElementById('status_sta').value);
});
document.getElementById('status_statot').addEventListener('input', function () {
    salvarLocalmente('status_statot_' + perso, document.getElementById('status_statot').value);
});
document.getElementById('status_pdi').addEventListener('input', function () {
    salvarLocalmente('status_pdi_' + perso, document.getElementById('status_pdi').value);
});
document.getElementById('status_pditot').addEventListener('input', function () {
    salvarLocalmente('status_pditot_' + perso, document.getElementById('status_pditot').value);
});
document.getElementById('status_pdv').addEventListener('input', function () {
    salvarLocalmente('status_pdv_' + perso, document.getElementById('status_pdv').value);
});
document.getElementById('status_pdvtot').addEventListener('input', function () {
    salvarLocalmente('status_pdvtot_' + perso, document.getElementById('status_pdvtot').value);
});

document.getElementById('resist_perso').addEventListener('input', function () {
    salvarLocalmente('resist_perso_' + perso, document.getElementById('resist_perso').value);
});
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
        editarImg('img_personagem_' + perso, imagem)
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
        editarImg('img_personagem_' + perso, imgProvisoria)
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
        editarImg('img_personagem_' + perso, imgProvisoria)
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
            editarImg('img_personagem_' + perso, imgProvisoria)
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
        opcaoEditar.remove()
        opcaoAtualizarLabel.remove()
        opcaoAtualizar.remove()
        opcaoExcluir.remove()
        salvarLocalmente('img_personagem_' + perso, '')
        document.getElementById('img_personagem').style.display = 'none'
        var customFileUpload = document.getElementById('customFileUpload')
        var spanFileUpload = document.getElementById('spanFileUpload')

        customFileUpload.style.display = 'flex'
        spanFileUpload.style.display = 'flex'
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

var pericias = []

function adicionarPER() {
    pericias.push({
        soma: '',
        pericia: '',
        selectAtr: '',
        optionAtr: '',
        metNivel: '',
        outrosPer: ''
    })
    forInp()
}

var forInpAtr = document.getElementById('atri_for')
var agiInpAtr = document.getElementById('atri_agi')
var carInpAtr = document.getElementById('atri_car')
var vigInpAtr = document.getElementById('atri_vig')
var intInpAtr = document.getElementById('atri_int')
var status_niv = document.getElementById('status_niv')

function statusNiv() {
    mostrarPer()
    calcular()
}

function forInp() {
    salvarLocalmente('atri_for_' + perso, document.getElementById('atri_for').value);
    selectDefAtr()
    mostrarPer()
    atualizarValorSelecionado()
    selectDefAtr()
}
function intInp() {
    salvarLocalmente('atri_int_' + perso, document.getElementById('atri_int').value);
    selectDefAtr()
    mostrarPer()
    atualizarValorSelecionado()
    selectDefAtr()
}
function agiInp() {
    salvarLocalmente('atri_agi_' + perso, document.getElementById('atri_agi').value);
    selectDefAtr()
    mostrarPer()
    atualizarValorSelecionado()
    selectDefAtr()
}
function vigInp() {
    salvarLocalmente('atri_vig_' + perso, document.getElementById('atri_vig').value);
    selectDefAtr()
    mostrarPer()
    atualizarValorSelecionado()
    selectDefAtr()
}
function carInp() {
    salvarLocalmente('atri_car_' + perso, document.getElementById('atri_car').value);
    selectDefAtr()
    mostrarPer()
    atualizarValorSelecionado()
    selectDefAtr()
}

function mostrarPer() {
    var tBoryPer = document.getElementById('tBodyPer')
    var linhaPer = ''
    pericias.forEach((linha, index) => {
        linhaPer =
            linhaPer +
            `
        <tr id=linha${index}>
            <td class='tdsoma'>
                <p id="soma${index}" class='soma'>${linha.soma || '2'}</p>
            </td>
            <td>
                <input value="${linha.pericia || ""}" oninput="inputPer(${index})" maxlength:'14' class='inputDesc' type="text" name="pericia${index}" id="pericia${index}">
            </td>
            <td>
                <select onchange="selectAtri(${index})" name="selectAtr${index}" id="selectAtr${index}" class="form-select">
                    <option ${linha.optionAtr == 'forPer' + index ? "selected" : ''} id='forPer${index}' value='${forInpAtr.value || 0}'>FOR: ${forInpAtr.value || 0}</option>
                    <option ${linha.optionAtr == 'intPer' + index ? "selected" : ''} id='intPer${index}' value='${intInpAtr.value || 0}'>INT: ${intInpAtr.value || 0}</option>
                    <option ${linha.optionAtr == 'agiPer' + index ? "selected" : ''} id='agiPer${index}' value='${agiInpAtr.value || 0}'>AGI: ${agiInpAtr.value || 0}</option>
                    <option ${linha.optionAtr == 'vigPer' + index ? "selected" : ''} id='vigPer${index}' value='${vigInpAtr.value || 0}'>VIG: ${vigInpAtr.value || 0}</option>
                    <option ${linha.optionAtr == 'carPer' + index ? "selected" : ''} id='carPer${index}' value='${carInpAtr.value || 0}'>CAR: ${carInpAtr.value || 0}</option>
                </select>
            </td>
            <td>
                <p class="textDefRes" class="MetNivel" type="text" name="meioNivel${index}" id="meioNivel${index}">${parseInt(status_niv.value / 2) || 0}</p>
            </td>
            <td>
                <input value="${linha.outrosPer || ""}" oninput="inputOutrosPer(${index})" class="inputDesc"  type="text" name="inputOutrosPer${index}" id="inputOutrosPer${index}">
            </td>
            <td>
                <a onclick="removerPer(${index})" class="remove">
                    <i class="bi bi-dash"></i>
                </a>
            </td>
        </tr>
        
        `
    })
    salvarLocalmente('pericia_' + perso, JSON.stringify(pericias))
    tBoryPer.innerHTML = linhaPer
}

function inputPer(index) {
    var periciaInput = document.getElementById("pericia" + index).value
    pericias[index].pericia = periciaInput
    salvarLocalmente('pericia_' + perso, JSON.stringify(pericias))
}

function selectAtri(index) {
    var atributoSelect = document.getElementById('selectAtr' + index)
    if (atributoSelect) {
        var option = atributoSelect.options[atributoSelect.selectedIndex]
        pericias[index].selectAtr = Number(option.value)
        pericias[index].optionAtr = option.id
        calcular()
    }
    salvarLocalmente('pericia_' + perso, JSON.stringify(pericias))
}

function atualizarValorSelecionado() {
    pericias.forEach((linha, index) => {
        selectAtri(index)
        calcular()
    })
}

function inputOutrosPer(index) {
    var inputOutrosPer = document.getElementById("inputOutrosPer" + index).value
    pericias[index].outrosPer = Number(inputOutrosPer)
    calcular()
    salvarLocalmente('pericia_' + perso, JSON.stringify(pericias))
}

function calcular() {
    pericias.forEach((linha, index) => {
        var somaTot = Number(pericias[index].selectAtr || 0) + parseInt((status_niv.value / 2) || 0) + Number(pericias[index].outrosPer || 0) + 2
        pericias[index].soma = somaTot
    })
    mostrarPer()
}

function recarregarPer() {
    const periciasLocalmente = localStorage.getItem('pericia_' + perso)

    if (periciasLocalmente) {
        pericias = JSON.parse(periciasLocalmente)
    }
    mostrarPer()
}

function removerPer(index) {
    pericias.splice(index, 1)
    mostrarPer()
}


var proficiencia = []
function adicionarProf() {
    proficiencia.push({
        proficienciaItem: '',
    })
    mostrarProf()
}


function mostrarProf() {
    var tbodyProf = document.getElementById('tbodyProf')
    var linhaProf = ''
    proficiencia.forEach((elemento, index) => {
        linhaProf =
            linhaProf +
            `
            <tr id="linhaProf${index}">
                <td>
                    <input maxlength='20' value='${elemento.proficienciaItem || ''}' id='profInput${index}' oninput='profInput(${index})' class="inputDesc">
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
    salvarLocalmente('proficiencia_' + perso, JSON.stringify(proficiencia))
}

function profInput(index) {
    proficiencia[index].proficienciaItem = document.getElementById('profInput' + index).value || ''
    salvarLocalmente('proficiencia_' + perso, JSON.stringify(proficiencia))
}

function recarregarProf() {
    const proficienciaLocalmente = pegarLocalmente('proficiencia_' + perso)
    if (proficienciaLocalmente) {
        proficiencia = JSON.parse(proficienciaLocalmente)
    }
    mostrarProf()
}

function removeProf(index) {
    proficiencia.splice(index, 1)
    mostrarProf()
}

//////////////////

var equipamentos = []

function adicionarEquip() {
    equipamentos.push({
        qnt: '',
        item: '',
        descricao: '',
        carga: '',
    })
    mostrarEquip()
    calcularCargaItem()
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
    salvarLocalmente('equipamentos_' + perso, JSON.stringify(equipamentos))
}

function qntEquip(index) {
    var qntinput = document.getElementById('qntEquip' + index)
    equipamentos[index].qnt = qntinput.value
    calcularCargaItem()
    salvarLocalmente('equipamentos_' + perso, JSON.stringify(equipamentos))
}

function itemEquip(index) {
    var itemEquip = document.getElementById('itemEquip' + index)
    equipamentos[index].item = itemEquip.value
    salvarLocalmente('equipamentos_' + perso, JSON.stringify(equipamentos))
}

function descEquip(index) {
    var descEquip = document.getElementById('descEquip' + index)
    equipamentos[index].descricao = descEquip.value
    salvarLocalmente('equipamentos_' + perso, JSON.stringify(equipamentos))
}

function cargaEquip(index) {
    var cargaEquip = document.getElementById('cargaEequip' + index)
    equipamentos[index].carga = cargaEquip.value
    calcularCargaItem()
    salvarLocalmente('equipamentos_' + perso, JSON.stringify(equipamentos))
}

function recarregarEquip() {
    const equipamentosLocal = pegarLocalmente('equipamentos_' + perso)
    if (equipamentosLocal) {
        equipamentos = JSON.parse(equipamentosLocal)
    }
    mostrarEquip()
}

function removeEquip(index) {
    equipamentos.splice(index, 1)
    mostrarEquip()
    calcularCargaItem()
}



var vestimenta = []
function adicionarVest() {
    vestimenta.push({
        roupa: '',
        descricao: '',
        carga: ''
    })
    mostrarVest()
    calcularCargaItem()
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
                <input type='text' maxlength="15" value="${elemento.descricao}" oninput='descVest(${index})' name="descInutVest${index}"  id="descInutVest${index}" class="inputDesc">
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
    salvarLocalmente('vestimentas_' + perso, JSON.stringify(vestimenta))
}

function roupaVest(index) {
    var roupaInputVest = document.getElementById('roupaInputVest' + index)
    vestimenta[index].roupa = roupaInputVest.value
    salvarLocalmente('vestimentas_' + perso, JSON.stringify(vestimenta))
}

function descVest(index) {
    var descInputVest = document.getElementById('descInutVest' + index)
    vestimenta[index].descricao = descInputVest.value
    salvarLocalmente('vestimentas_' + perso, JSON.stringify(vestimenta))
}

function cargaVest(index) {
    var cargaInputVest = document.getElementById('cargaInputVest' + index)
    vestimenta[index].carga = cargaInputVest.value
    calcularCargaItem()
    salvarLocalmente('vestimentas_' + perso, JSON.stringify(vestimenta))
}

function recarregarVest() {
    const vestimentaLocal = localStorage.getItem('vestimentas_' + perso)
    if (vestimentaLocal) {
        vestimenta = JSON.parse(vestimentaLocal)
    }
    mostrarVest()
}

function removeVest(index) {
    vestimenta.splice(index, 1)
    mostrarVest()
    calcularCargaItem()
}


//////////////////

var armas = []

function adicionarArma() {
    armas.push({
        arma: '',
        testeDano: '',
        critico: '',
        municao: '',
        carga: ''
    })
    mostrarArma()
    calcularCargaItem()
}

var valorCargaArma = []
var valorCargaArmaTot = []

var tbodyArma = document.getElementById('tbodyArma')

function mostrarArma() {
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
    salvarLocalmente('armas_' + perso, JSON.stringify(armas))
}

function armaArma(index) {
    var armaArma = document.getElementById('armaArma' + index)
    armas[index].arma = armaArma.value
    salvarLocalmente('armas_' + perso, JSON.stringify(armas))
}

function testeArma(index) {
    var testeArma = document.getElementById('testeArma' + index)
    armas[index].testeDano = testeArma.value
    salvarLocalmente('armas_' + perso, JSON.stringify(armas))
}

function criticoArma(index) {
    var criticoArma = document.getElementById('criticoArma' + index)
    armas[index].critico = criticoArma.value
    salvarLocalmente('armas_' + perso, JSON.stringify(armas))
}

function municaoArma(index) {
    var municaoArma = document.getElementById('municaoArma' + index)
    armas[index].municao = municaoArma.value
    salvarLocalmente('armas_' + perso, JSON.stringify(armas))
}

function cargaArma(index) {
    var cargaArma = document.getElementById('cargaArma' + index)
    armas[index].carga = cargaArma.value
    calcularCargaItem()
    salvarLocalmente('armas_' + perso, JSON.stringify(armas))
}

function recarregarArma() {
    const armasLocal = localStorage.getItem('armas_' + perso)
    if (armasLocal) {
        armas = JSON.parse(armasLocal)
    }
    mostrarArma()
}

function removeArma(index) {
    armas.splice(index, 1)
    mostrarArma()
    calcularCargaItem()
}


///////////////////

document.getElementById('nomeprotecao1').addEventListener('input', function () {
    salvarLocalmente('nomeprotecao1_' + perso, this.value)
})

document.getElementById('nomeprotecao2').addEventListener('input', function () {
    salvarLocalmente('nomeprotecao2_' + perso, this.value)
})

var valorPontoDef = ['', '', '', '']
var valorPenaDef = ['', '']
var cargaDef = ['', '']

var res_defesa = document.getElementById('res_defesa')
var resDefDef = document.getElementById('resDefDef')
var armdDef = document.getElementById('armdDef')
var escudDef = document.getElementById('escudDef')
var resPenDef = document.getElementById('resPenDef')



function mostrarPontosDef() {
    valorPontoDef.forEach((elemento, index) => {
        var somaPontos = calcularPontosDef()
        armdDef.innerHTML = valorPontoDef[0] || 0
        escudDef.innerHTML = valorPontoDef[1] || 0
        resDefDef.innerHTML = somaPontos
        res_defesa.innerHTML = somaPontos
    })
    valorPenaDef.forEach((elemento) => {
        var somaPenalidade = calcularPenaDef()
        resPenDef.innerHTML = somaPenalidade || 0
    })
    salvarLocalmente('pontos_defesa_' + perso, JSON.stringify(valorPontoDef))
    salvarLocalmente('pontos_defesa_penalidade_' + perso, JSON.stringify(valorPenaDef))
}

var inputPontosDefesa1 = document.getElementById('inputPontosDefesa1')
function inputPontosDef1() {
    valorPontoDef[0] = (Number(inputPontosDefesa1.value) || 0)
    salvarLocalmente('pontos_defesa_' + perso, JSON.stringify(valorPontoDef))
    mostrarPontosDef()
}

var inputPontosDefesa2 = document.getElementById('inputPontosDefesa2')
function inputPontosDef2() {
    valorPontoDef[1] = (Number(inputPontosDefesa2.value) || 0)
    salvarLocalmente('pontos_defesa_' + perso, JSON.stringify(valorPontoDef))
    mostrarPontosDef()
}

var inputPenaDefesa1 = document.getElementById('inputPenaDefesa1')
function inputPenaDef1() {
    valorPenaDef[0] = Number(inputPenaDefesa1.value) || 0
    salvarLocalmente('pontos_defesa_penalidade_' + perso, JSON.stringify(valorPenaDef))
    mostrarPontosDef()
}

var inputPenaDefesa2 = document.getElementById('inputPenaDefesa2')
function inputPenaDef2() {
    valorPenaDef[1] = Number(inputPenaDefesa2.value) || 0
    salvarLocalmente('pontos_defesa_penalidade_' + perso, JSON.stringify(valorPenaDef))
    mostrarPontosDef()
}

var opcãoSelecionadaDef = ''
var selectDefesaAtr = document.getElementById('selectDefesaAtr')
function atualizarOptionsSel() {
    var optionsSelDef =
        `
        <option ${opcãoSelecionadaDef == 'forPer' ? "selected" : ''} id='forPer' value='${forInpAtr.value || 0}'>FOR: ${forInpAtr.value || 0}</option>
        <option ${opcãoSelecionadaDef == 'intPer' ? "selected" : ''} id='intPer' value='${intInpAtr.value || 0}'>INT: ${intInpAtr.value || 0}</option>
        <option ${opcãoSelecionadaDef == 'agiPer' ? "selected" : ''} id='agiPer' value='${agiInpAtr.value || 0}'>AGI: ${agiInpAtr.value || 0}</option>
        <option ${opcãoSelecionadaDef == 'vigPer' ? "selected" : ''} id='vigPer' value='${vigInpAtr.value || 0}'>VIG: ${vigInpAtr.value || 0}</option>
        <option ${opcãoSelecionadaDef == 'carPer' ? "selected" : ''} id='carPer' value='${carInpAtr.value || 0}'>CAR: ${carInpAtr.value || 0}</option>
    `
    selectDefesaAtr.innerHTML = optionsSelDef
}

function selectDefAtr() {
    var option = selectDefesaAtr.options[selectDefesaAtr.selectedIndex]
    opcãoSelecionadaDef = option.id
    valorPontoDef[2] = Number(selectDefesaAtr.value) || 0
    salvarLocalmente('pontos_defesa_' + perso, JSON.stringify(valorPontoDef))
    salvarLocalmente('selOptionDef_' + perso, opcãoSelecionadaDef)
    atualizarOptionsSel()
    mostrarPontosDef()
}

function outrosDef() {
    var outrosInputDef = document.getElementById('outrosInputDef')
    valorPontoDef[3] = Number(outrosInputDef.value) || 0
    salvarLocalmente('pontos_defesa_' + perso, JSON.stringify(valorPontoDef))
    mostrarPontosDef()
}

function inputCargaDef1() {
    var inputCargaDefesa1 = document.getElementById('inputCargaDefesa1')
    cargaDef[0] = Number(inputCargaDefesa1.value) || 0
    salvarLocalmente('carga_defesa_' + perso, cargaDef)
    calcularCargaItem()
}

function inputCargaDef2() {
    var inputCargaDefesa2 = document.getElementById('inputCargaDefesa2')
    cargaDef[1] = Number(inputCargaDefesa2.value) || 0
    salvarLocalmente('carga_defesa_' + perso, JSON.stringify(cargaDef))
    calcularCargaItem()
}

function calcularPontosDef() {
    var valor1 = valorPontoDef[0] || 0
    var valor2 = valorPontoDef[1] || 0
    var valor3 = valorPontoDef[2] || 0
    var valor4 = valorPontoDef[3] || 0

    var soma = valor1 + valor2 + valor3 + valor4 + 10

    return soma
}

function calcularPenaDef() {
    var valor1 = valorPenaDef[0] || 0
    var valor2 = valorPenaDef[1] || 0
    var soma = valor1 + valor2
    return soma
}

function calcularPontosDef() {
    var valor1 = valorPontoDef[0] || 0
    var valor2 = valorPontoDef[1] || 0
    var valor3 = valorPontoDef[2] || 0
    var valor4 = valorPontoDef[3] || 0

    var soma = valor1 + valor2 + valor3 + valor4 + 10
    return soma
}

function calcularCargaItem() {
    soma = []
    equipamentos.forEach((elemento) => {
        soma.push(Number(elemento.qnt || 1) * Number(elemento.carga || .5))
    })
    armas.forEach((elemento) => {
        soma.push(Number(elemento.carga))
    })
    vestimenta.forEach((elemento) => {
        soma.push(Number(elemento.carga))
    })

    var somaCargaDef = cargaDef.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0)

    respostaCarga(soma.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0) + Number(somaCargaDef) || 0)
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

function recarregarDefesa() {
    var pontosDefLocalmente = pegarLocalmente('pontos_defesa_' + perso)
    if (pontosDefLocalmente) {
        valorPontoDef = JSON.parse(pontosDefLocalmente)
    }
    var opcaoSelLocalmente = pegarLocalmente('selOptionDef_' + perso)
    if (opcaoSelLocalmente) {
        opcãoSelecionadaDef = opcaoSelLocalmente
    }

    var pontosPenalidadeLocalmente = pegarLocalmente('pontos_defesa_penalidade_' + perso)
    if (pontosPenalidadeLocalmente) {
        valorPenaDef = JSON.parse(pontosPenalidadeLocalmente)
    }

    var cargaDefLocalmente = pegarLocalmente('carga_defesa_' + perso)
    if (cargaDefLocalmente) {
        cargaDef = JSON.parse(cargaDefLocalmente)
    }
    atualizarOptionsSel()
    mostrarPontosDef()
}

document.getElementById('carga_total').addEventListener('input', function () {
    calcularCargaItem()
    salvarLocalmente('totalCarga_' + perso, document.getElementById('carga_total').value)
})










document.getElementById('titleCamp1').addEventListener('input', function () {
    salvarLocalmente('titleCamp1_' + perso, this.value)
})

document.getElementById('textCamp1').addEventListener('input', function () {
    salvarLocalmente('textCamp1_' + perso, this.value)
})

document.getElementById('titleCamp2').addEventListener('input', function () {
    salvarLocalmente('titleCamp2_' + perso, this.value)
})

document.getElementById('textCamp2').addEventListener('input', function () {
    salvarLocalmente('textCamp2_' + perso, this.value)
})



var campo3 = []
function adicionarCampo3() {
    campo3.push({
        titulo: '',
        texto: '',
        ativo: 'desativado',
        tamanhoTxt: 15
    })
    mostrarCampo3()
}

function mostrarCampo3() {
    var Campo3Hab = document.getElementById('Campo3Hab');
    var linhaCampo3 = ''
    campo3.forEach((elemento, index) => {
        linhaCampo3 =
            linhaCampo3 +
            `<div id="Campo3HabDiv1" class="itemCampoHab">
            <div style='width:100%'>
                <div style='width:100%'>
                    <input value='${elemento.titulo || ''}' name='tituloHab3${index}'  id='tituloHab3${index}' oninput='tituloHab3(${index})' class='tituloHab' type='text'>
                    <i style='transition: 1s;' id='setaCamp3${index}' onclick='mostrarTextCampo3(${index})' class="setaHab ${elemento.ativo === 'desativado' ? '' : 'setaVira'} bi-chevron-down"></i>
                </div>
                <textarea class='campoHabAberto' style="display: ${elemento.ativo === 'desativado' ? 'none' : 'block'}; height: ${elemento.tamanhoTxt}px;" oninput="textoHab3(${index})" 
                name="Campo3HabTxt${index}" id="Campo3HabTxt${index}"  rows="1" cols="30">${elemento.texto || ''}</textarea>
            </div>
            <td>
                <a onclick="removeHab3(${index})" class="remove">
                    <i class="bi bi-dash"></i>
                </a>
            </td>
        </div>`
    })
    salvarLocalmente('Campo3_' + perso, JSON.stringify(campo3))
    Campo3Hab.innerHTML = linhaCampo3
}

function titleCamp3() {
    var titleCamp3 = document.getElementById('titleCamp3')
    salvarLocalmente('titleCamp3_' + perso, titleCamp3.value)
}

function tituloHab3(index) {
    var tituloHab3 = document.getElementById('tituloHab3' + index)
    campo3[index].titulo = tituloHab3.value
    salvarLocalmente('Campo3_' + perso, JSON.stringify(campo3))
}

function textoHab3(index) {
    var textoHab3 = document.getElementById('Campo3HabTxt' + index)
    campo3[index].texto = textoHab3.value

    textoHab3.addEventListener('input', function () {
        if (this.scrollHeight = this.offsetHeight) {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
            campo3[index].tamanhoTxt = this.scrollHeight
        }
    })
    salvarLocalmente('Campo3_' + perso, JSON.stringify(campo3))
}

function mostrarTextCampo3(index) {
    var campo = document.getElementById('Campo3HabTxt' + index)
    var setaCamp3 = document.getElementById('setaCamp3' + index)
    setaCamp3.classList.toggle('setaVira')
    if (campo.attributes.style.value == 'display: none; height: ' + campo3[index].tamanhoTxt + 'px;') {
        campo.style = 'display: block; height: ' + campo3[index].tamanhoTxt + 'px'
        campo3[index].ativo = 'ativado'
    } else {
        campo.style = 'display: none; height: ' + campo3[index].tamanhoTxt + 'px'
        campo3[index].ativo = 'desativado'
    }
    salvarLocalmente('Campo3_' + perso, JSON.stringify(campo3))
}

function removeHab3(index) {
    campo3.splice(index, 1)
    mostrarCampo3()
}

function recarregarCampo3() {
    var campo3Localmente = pegarLocalmente('Campo3_' + perso)
    if (campo3Localmente) {
        campo3 = JSON.parse(campo3Localmente)
    }
    mostrarCampo3()
}





var campo4 = []
function adicionarCampo4() {
    campo4.push({
        titulo: '',
        texto: '',
        ativo: 'desativado',
        tamanhoTxt: 15
    })
    mostrarCampo4()
}

function mostrarCampo4() {
    var Campo4Hab = document.getElementById('Campo4Hab');
    var linhaCampo4 = ''
    campo4.forEach((elemento, index) => {
        linhaCampo4 =
            linhaCampo4 +
            `<div id="Campo4HabDiv1" class="itemCampoHab">
            <div style='width:100%'>
                <div style='width:100%'>
                    <input value='${elemento.titulo || ''}' name='tituloHab4${index}'  id='tituloHab4${index}' oninput='tituloHab4(${index})' class='tituloHab' type='text'>
                    <i style='transition: 1s;' id='setaCamp4${index}' onclick='mostrarTextCampo4(${index})' class="setaHab ${elemento.ativo === 'desativado' ? '' : 'setaVira'} bi-chevron-down"></i>
                </div>
                <textarea class='campoHabAberto' style="display: ${elemento.ativo === 'desativado' ? 'none' : 'block'}; height: ${elemento.tamanhoTxt}px;" oninput="textoHab4(${index})" 
                name="Campo4HabTxt${index}" id="Campo4HabTxt${index}" rows="1" cols="30">${elemento.texto || ''}</textarea>
            </div>
            <td>
                <a onclick="removeHab4(${index})" class="remove">
                    <i class="bi bi-dash"></i>
                </a>
            </td>
        </div>`
    })
    salvarLocalmente('Campo4_' + perso, JSON.stringify(campo4))
    Campo4Hab.innerHTML = linhaCampo4
}

function titleCamp4() {
    var titleCamp4 = document.getElementById('titleCamp4')
    salvarLocalmente('titleCamp4_' + perso, titleCamp4.value)
}

function tituloHab4(index) {
    var tituloHab4 = document.getElementById('tituloHab4' + index)
    campo4[index].titulo = tituloHab4.value
    salvarLocalmente('Campo4_' + perso, JSON.stringify(campo4))
}

function textoHab4(index) {
    var textoHab4 = document.getElementById('Campo4HabTxt' + index)
    campo4[index].texto = textoHab4.value

    textoHab4.addEventListener('input', function () {
        if (this.scrollHeight = this.offsetHeight) {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
            campo4[index].tamanhoTxt = this.scrollHeight
        }
    })
    salvarLocalmente('Campo4_' + perso, JSON.stringify(campo4))
}

function mostrarTextCampo4(index) {
    var campo = document.getElementById('Campo4HabTxt' + index)
    var setaCamp4 = document.getElementById('setaCamp4' + index)
    setaCamp4.classList.toggle('setaVira')
    if (campo.attributes.style.value == 'display: none; height: ' + campo4[index].tamanhoTxt + 'px;') {
        campo.style = 'display: block; height: ' + campo4[index].tamanhoTxt + 'px'
        campo4[index].ativo = 'ativado'
    } else {
        campo.style = 'display: none; height: ' + campo4[index].tamanhoTxt + 'px'
        campo4[index].ativo = 'desativado'
    }
    salvarLocalmente('Campo4_' + perso, JSON.stringify(campo4))
}

function removeHab4(index) {
    campo4.splice(index, 1)
    mostrarCampo4()
}

function recarregarCampo4() {
    var campo4Localmente = pegarLocalmente('Campo4_' + perso)
    if (campo4Localmente) {
        campo4 = JSON.parse(campo4Localmente)
    }
    mostrarCampo4()
}
