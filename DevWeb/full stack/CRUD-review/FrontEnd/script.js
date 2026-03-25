const STORAGE_KEY = "crud-saep-alunos";

const form = document.getElementById("alunoForm");
const alunoIdInput = document.getElementById("alunoId");
const nomeInput = document.getElementById("nome");
const idadeInput = document.getElementById("idade");
const cursoInput = document.getElementById("curso");
const buscaInput = document.getElementById("busca");
const tabelaAlunos = document.getElementById("tabelaAlunos");
const totalAlunos = document.getElementById("totalAlunos");
const mensagemLista = document.getElementById("mensagemLista");
const formStatus = document.getElementById("formStatus");
const submitButton = document.getElementById("submitButton");
const cancelarEdicaoButton = document.getElementById("cancelarEdicao");

let alunos = carregarAlunos();

function carregarAlunos() {
    const alunosSalvos = localStorage.getItem(STORAGE_KEY);
    return alunosSalvos ? JSON.parse(alunosSalvos) : [];
}

function salvarAlunos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alunos));
}

function gerarNovoId() {
    if (alunos.length === 0) {
        return 1;
    }

    const ultimoId = Math.max(...alunos.map((aluno) => aluno.id));
    return ultimoId + 1;
}

function limparFormulario() {
    form.reset();
    alunoIdInput.value = "";
    submitButton.textContent = "Cadastrar";
    formStatus.textContent = "Preencha os campos para cadastrar um aluno.";
}

function preencherFormulario(aluno) {
    alunoIdInput.value = aluno.id;
    nomeInput.value = aluno.nome;
    idadeInput.value = aluno.idade;
    cursoInput.value = aluno.curso;
    submitButton.textContent = "Salvar edicao";
    formStatus.textContent = `Editando o aluno ID ${aluno.id}.`;
    nomeInput.focus();
}

function validarFormulario(nome, idade, curso) {
    if (!nome || !idade || !curso) {
        alert("Preencha todos os campos.");
        return false;
    }

    if (nome.length < 3) {
        alert("O nome deve ter pelo menos 3 caracteres.");
        return false;
    }

    if (Number(idade) < 1 || Number(idade) > 120) {
        alert("Digite uma idade valida entre 1 e 120.");
        return false;
    }

    return true;
}

function renderizarTabela(lista = alunos) {
    tabelaAlunos.innerHTML = "";

    if (lista.length === 0) {
        mensagemLista.classList.remove("hidden");
        mensagemLista.textContent = alunos.length === 0
            ? "Nenhum aluno cadastrado ainda."
            : "Nenhum aluno encontrado para a busca informada.";
    } else {
        mensagemLista.classList.add("hidden");
    }

    lista.forEach((aluno) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${aluno.id}</td>
            <td>${aluno.nome}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.curso}</td>
            <td class="actions-cell">
                <button class="btn btn-edit" data-acao="editar" data-id="${aluno.id}">Editar</button>
                <button class="btn btn-delete" data-acao="excluir" data-id="${aluno.id}">Excluir</button>
            </td>
        `;

        tabelaAlunos.appendChild(linha);
    });

    totalAlunos.textContent = alunos.length;
}

function cadastrarAluno(dadosAluno) {
    alunos.push({
        id: gerarNovoId(),
        ...dadosAluno
    });

    salvarAlunos();
    renderizarTabela(filtrarAlunos(buscaInput.value));
    limparFormulario();
}

function atualizarAluno(id, dadosAtualizados) {
    alunos = alunos.map((aluno) => {
        if (aluno.id === id) {
            return { id, ...dadosAtualizados };
        }

        return aluno;
    });

    salvarAlunos();
    renderizarTabela(filtrarAlunos(buscaInput.value));
    limparFormulario();
}

function excluirAluno(id) {
    const confirmou = confirm("Deseja realmente excluir este aluno?");

    if (!confirmou) {
        return;
    }

    alunos = alunos.filter((aluno) => aluno.id !== id);
    salvarAlunos();
    renderizarTabela(filtrarAlunos(buscaInput.value));

    if (Number(alunoIdInput.value) === id) {
        limparFormulario();
    }
}

function filtrarAlunos(termo) {
    const termoNormalizado = termo.trim().toLowerCase();

    if (!termoNormalizado) {
        return alunos;
    }

    return alunos.filter((aluno) =>
        aluno.nome.toLowerCase().includes(termoNormalizado) ||
        aluno.curso.toLowerCase().includes(termoNormalizado)
    );
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = nomeInput.value.trim();
    const idade = Number(idadeInput.value);
    const curso = cursoInput.value.trim();

    if (!validarFormulario(nome, idade, curso)) {
        return;
    }

    const dadosAluno = { nome, idade, curso };
    const alunoId = Number(alunoIdInput.value);

    if (alunoId) {
        atualizarAluno(alunoId, dadosAluno);
        return;
    }

    cadastrarAluno(dadosAluno);
});

cancelarEdicaoButton.addEventListener("click", limparFormulario);

buscaInput.addEventListener("input", () => {
    renderizarTabela(filtrarAlunos(buscaInput.value));
});

tabelaAlunos.addEventListener("click", (event) => {
    const botao = event.target.closest("button");

    if (!botao) {
        return;
    }

    const id = Number(botao.dataset.id);
    const acao = botao.dataset.acao;
    const alunoSelecionado = alunos.find((aluno) => aluno.id === id);

    if (!alunoSelecionado) {
        return;
    }

    if (acao === "editar") {
        preencherFormulario(alunoSelecionado);
    }

    if (acao === "excluir") {
        excluirAluno(id);
    }
});

renderizarTabela();
limparFormulario();
