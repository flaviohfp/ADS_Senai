const btnRegistrar = document.getElementById("btnRegistrar");
const btnRemover = document.getElementById("btnRemover");

const registro = document.getElementById("registro");

btnRegistrar.addEventListener("click", function() {
    const li = document.createElement("li");
    li.textContent = "Clique registrado" + new Date();

    registro.appendChild(li);
});


btnRemover.addEventListener("click", function() {
    registro.innerHTML = "";
});