const menu = document.getElementById("menu");
const botao = document.getElementById("btnToggle");

botao.addEventListener("click", function() {
    menu.classList.toggle("hidden");
});
