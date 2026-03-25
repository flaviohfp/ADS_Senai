const forms = document.getElementById("forms");
const btnEnviar = document.getElementById("btnEnviar");

btnEnviar.addEventListener("click", function() {
    
const nome = document.getElementById("nome").value;
const email = document.getElementById("email").value;
const mensagem = document.getElementById("mensagem").value;

if (nome === "" || email === "" || mensagem === ""){
    alert("Preencha todos os dados!");
}else {
    alert("Formulario preenchido com sucesso.");
}


});
