const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const p3 = document.getElementById("p3");

const btnAlterar1 = document.getElementById("btnAlterar1");
const btnAlterar2 = document.getElementById("btnAlterar2");
const btnAlterar3 = document.getElementById("btnAlterar3");


btnAlterar1.addEventListener("click", function() {
    p1.textContent = "O paragrafo foi alterado com sucesso.";
});

btnAlterar2.addEventListener("click", function() {
    p2.textContent = "O paragrafo foi alterado";
});

btnAlterar3.addEventListener("click", function() {
    p3.textContent = "Foi alterado";
});