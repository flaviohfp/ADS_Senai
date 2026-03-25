document.addEventListener("DOMContentLoaded", function () {

  let alunos = [];
  let editando = null;

  const form = document.querySelector(".needs-validation");
  const lista = document.getElementById("listaAlunos");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const aluno = {
      id: editando ?? Date.now(),
      nome: document.getElementById("Nome").value,
      idade: document.getElementById("Idade").value,
      curso: document.getElementById("Cursos").value,
      matricula: document.getElementById("Matricula").value
    };

    if (editando) {
      const index = alunos.findIndex(a => a.id === editando);
      alunos[index] = aluno;
      editando = null;
    } else {
      alunos.push(aluno);
    }

    form.reset();
    listar();
  });

  function listar() {
    lista.innerHTML = "";

    alunos.forEach(aluno => {
      lista.innerHTML += `
        <li class="list-group-item d-flex justify-content-between">
          <div>
            <strong>${aluno.nome}</strong><br>
            Idade: ${aluno.idade}<br>
            Curso: ${aluno.curso}<br>
            Matrícula: ${aluno.matricula}
          </div>
          <div>
            <button class="btn btn-warning btn-sm" onclick="editar(${aluno.id})">
              Editar
            </button>
            <button class="btn btn-danger btn-sm" onclick="excluir(${aluno.id})">
              Excluir
            </button>
          </div>
        </li>
      `;
    });
  }

  window.excluir = function(id) {
    alunos = alunos.filter(a => a.id !== id);
    listar();
  }

  window.editar = function(id) {
    const aluno = alunos.find(a => a.id === id);

    document.getElementById("Nome").value = aluno.nome;
    document.getElementById("Idade").value = aluno.idade;
    document.getElementById("Cursos").value = aluno.curso;
    document.getElementById("Matricula").value = aluno.matricula;

    editando = id;
  }

});