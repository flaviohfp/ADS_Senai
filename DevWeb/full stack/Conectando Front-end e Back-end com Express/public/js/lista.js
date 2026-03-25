const lista = document.getElementById("lista");
const mensagem = document.getElementById("mensagem");
const botao = document.getElementById("btnAtualizar");
const totalUsuarios = document.getElementById("totalUsuarios");
const totalUsuario = document.getElementById("total-usuario");

let modalExcluir = null;
let usuarioParaExcluir = null;

async function contarUsuarios() {
    try {
        const resposta = await fetch("/api/usuarios/total");

        if (!resposta.ok) {
            throw new Error("Erro ao contar usuarios");
        }

        const dados = await resposta.json();
        const total = Number(dados.total || 0);

        if (totalUsuarios) {
            totalUsuarios.textContent = total;
            totalUsuarios.style.color = total > 0 ? "green" : "red";

            if (totalUsuarios.parentElement) {
                totalUsuarios.parentElement.style.background = total > 0
                    ? "rgba(0, 128, 0, 0.1)"
                    : "rgba(255, 0, 0, 0.1)";
            }
        }

        if (totalUsuario) {
            totalUsuario.textContent = total;
        }
    } catch (erro) {
        console.error("Erro ao contar usuarios:", erro);

        if (totalUsuarios) {
            totalUsuarios.textContent = "0";
            totalUsuarios.style.color = "red";
        }

        if (totalUsuario) {
            totalUsuario.textContent = "0";
        }
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    modalExcluir = new bootstrap.Modal(document.getElementById("modalExcluir"));
    await Promise.all([carregarUsuarios(), contarUsuarios()]);
});

botao.addEventListener("click", carregarUsuarios);

async function carregarUsuarios() {
    mensagem.textContent = "Carregando...";
    mensagem.className = "alert alert-info text-center";
    mensagem.style.display = "block";

    try {
        const resposta = await fetch("/api/usuarios");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar usuarios");
        }

        const usuarios = await resposta.json();

        renderizarUsuarios(usuarios);
        await contarUsuarios();
        mensagem.style.display = "none";
    } catch (erro) {
        mensagem.textContent = "Erro ao carregar usuarios: " + erro.message;
        mensagem.className = "alert alert-danger text-center";
        mensagem.style.display = "block";
        console.error(erro);
    }
}

function renderizarUsuarios(usuarios) {
    lista.innerHTML = "";

    if (usuarios.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted py-4">
                    <i class="bi bi-inbox" style="font-size: 2rem;"></i>
                    <p class="mb-0 mt-2">Nenhum usuario cadastrado</p>
                </td>
            </tr>
        `;
        return;
    }

    usuarios.forEach((usuario) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.idade} anos</td>
            <td>${usuario.email}</td>
            <td>
                <a href="/editar/${usuario.id}" class="btn btn-sm btn-warning me-1">
                    <i class="bi bi-pencil"></i> Editar
                </a>
                <button class="btn btn-sm btn-danger" onclick="confirmarExclusao(${usuario.id}, '${usuario.nome}')">
                    <i class="bi bi-trash"></i> Excluir
                </button>
            </td>
        `;
        lista.appendChild(tr);
    });
}

function confirmarExclusao(id, nome) {
    usuarioParaExcluir = id;
    document.getElementById("nomeExcluir").textContent = nome;
    modalExcluir.show();
}

document.getElementById("btnConfirmarExclusao").addEventListener("click", async function () {
    if (!usuarioParaExcluir) {
        return;
    }

    try {
        const resposta = await fetch(`/api/usuarios/${usuarioParaExcluir}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.erro || "Erro ao excluir usuario");
        }

        modalExcluir.hide();
        mensagem.textContent = "Usuario excluido com sucesso!";
        mensagem.className = "alert alert-success text-center";
        mensagem.style.display = "block";

        await carregarUsuarios();
    } catch (erro) {
        mensagem.textContent = "Erro ao excluir usuario: " + erro.message;
        mensagem.className = "alert alert-danger text-center";
        mensagem.style.display = "block";
        console.error(erro);
    }
});
