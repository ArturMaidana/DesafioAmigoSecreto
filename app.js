const inputAmigo = document.getElementById('amigo');
const btnAdicionar = document.getElementById('btnAdicionar');
const listaAmigos = document.getElementById('listaAmigos');
const btnSortear = document.getElementById('btnSortear');
const resultadoSorteio = document.getElementById('resultadoSorteio');
const amigoSorteado = document.getElementById('amigoSorteado');
const btnFecharResultado = document.getElementById('btnFecharResultado');
const naoRepetir = document.getElementById('naoRepetir');
const animacaoContagem = document.getElementById('animacaoContagem');
const contagemRegressiva = document.getElementById('contagemRegressiva');
const numeroContagem = document.getElementById('numeroContagem');
const modalEditar = document.getElementById('modalEditar');
const inputEditarNome = document.getElementById('inputEditarNome');
const btnSalvarEdicao = document.getElementById('btnSalvarEdicao');
const btnFecharModal = document.getElementById('btnFecharModal');
const btnResetar = document.getElementById('btnResetar');


let amigos = [];
let indiceEdicao = null;

function adicionarAmigo() {
    const nome = inputAmigo.value.trim();

    if (!nome) {
        return;
    }

    if (naoRepetir.checked && amigos.includes(nome)) {
        alert('Este nome já foi adicionado!');
        return;
    }

    amigos.push(nome);
    renderizarLista();
    inputAmigo.value = '';
    inputAmigo.focus();
    verificarBotaoSortear();
}

function renderizarLista() {
    listaAmigos.innerHTML = '';
    amigos.forEach((nome, index) => {
        const li = document.createElement('li');
        li.className = 'participant-item';

        const icon = document.createElement('span');
        icon.className = 'participant-icon';
        icon.textContent = '✎';
        icon.onclick = function () {
            abrirModalEdicao(index);
        };
        li.appendChild(icon);

        const nomeSpan = document.createElement('span');
        nomeSpan.textContent = nome;
        nomeSpan.className = 'participant-name';
        li.appendChild(nomeSpan);

        const btnRemover = document.createElement('button');
        btnRemover.className = 'remove-participant';
        btnRemover.textContent = '✕';
        btnRemover.onclick = function () {
            amigos.splice(index, 1);
            renderizarLista();
            verificarBotaoSortear();
        };
        li.appendChild(btnRemover);

        listaAmigos.appendChild(li);
    });
}

function abrirModalEdicao(index) {
    indiceEdicao = index;
    inputEditarNome.value = amigos[index];
    modalEditar.classList.remove('hidden');
}

btnSalvarEdicao.addEventListener('click', function () {
    const novoNome = inputEditarNome.value.trim();
    if (novoNome !== '' && (!naoRepetir.checked || !amigos.includes(novoNome))) {
        amigos[indiceEdicao] = novoNome;
        renderizarLista();
        modalEditar.classList.add('hidden');
    } else {
        alert('Nome inválido ou já existente!');
    }
});

btnFecharModal.addEventListener('click', function () {
    modalEditar.classList.add('hidden');
});

function verificarBotaoSortear() {
    btnSortear.disabled = amigos.length < 2;
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert('Adicione pelo menos 2 participantes para iniciar o sorteio!');
        return;
    }

    if (animacaoContagem.checked) {
        contagemRegressiva.classList.remove('hidden');
        let contador = 3;
        numeroContagem.textContent = contador;
        const intervalo = setInterval(() => {
            contador--;
            if (contador > 0) {
                numeroContagem.textContent = contador;
            } else {
                clearInterval(intervalo);
                contagemRegressiva.classList.add('hidden');
                mostrarResultado();
            }
        }, 1000);
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    amigoSorteado.textContent = amigos[indiceAleatorio];
    resultadoSorteio.classList.remove('hidden');
}

function fecharResultado() {
    resultadoSorteio.classList.add('hidden');
}

btnAdicionar.addEventListener('click', adicionarAmigo);
btnSortear.addEventListener('click', sortearAmigo);
btnFecharResultado.addEventListener('click', fecharResultado);
inputAmigo.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        adicionarAmigo();
    }
});

verificarBotaoSortear();

function resetarSorteio() {
    amigos = [];
    indiceEdicao = null;
    listaAmigos.innerHTML = '';
    amigoSorteado.textContent = '';
    resultadoSorteio.classList.add('hidden');
    verificarBotaoSortear();
}

btnResetar.addEventListener('click', resetarSorteio);