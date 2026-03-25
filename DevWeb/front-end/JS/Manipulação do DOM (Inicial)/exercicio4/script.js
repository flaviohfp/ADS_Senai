const valor = document.getElementById("valor");
const btnMais = document.getElementById("btnMais");
const btnMenos = document.getElementById("btnMenos");

let contador = 0;

btnMais.addEventListener("click", function() {
    contador++;
    valor.textContent = contador;
});


btnMenos.addEventListener("click", function() {
    contador--;
    valor.textContent = contador;
});
