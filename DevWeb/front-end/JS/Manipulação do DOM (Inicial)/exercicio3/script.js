const quadrado = document.getElementById("quadrado");
const botao = document.getElementById("btnToggle");

botao.addEventListener("click", () => {
    quadrado.classList.toggle("hidden");
});
