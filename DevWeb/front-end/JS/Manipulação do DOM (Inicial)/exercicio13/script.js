const primeiro = document.getElementById("primeiro");
const segundo = document.getElementById("segundo");
const terceiro = document.getElementById("terceiro");
const btnRemover1 = document.getElementById("btnRemover1");
const btnRemover2 = document.getElementById("btnRemover2");
const btnRemover3 = document.getElementById("btnRemover3");

btnRemover1.addEventListener("click", function() {
    primeiro.remove();
});

btnRemover2.addEventListener("click", function() {
    segundo.remove();
});

btnRemover3.addEventListener("click", function() {
    terceiro.remove();
});

