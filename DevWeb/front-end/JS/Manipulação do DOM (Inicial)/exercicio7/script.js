const principal = document.getElementById("principal");
const miniaturas = document.querySelectorAll("#imagens img");

miniaturas.forEach(function(img) {
    img.addEventListener("click", function() {
        principal.src = img.src;
    });
});
