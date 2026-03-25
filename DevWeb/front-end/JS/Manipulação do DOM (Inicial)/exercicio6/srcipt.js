const btnTema = document.getElementById("toggleTema");
const corpo = document.body;

btnTema.addEventListener("click", function() {
    corpo.classList.toggle("dark-mode");

    if (corpo.classList.contains("dark-mode")) {
        btnTema.textContent = "Modo light";

    }else {
        btnTema.textContent = "Modo dark";
    }
});
