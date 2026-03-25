const busca = document.getElementById("campoBusca");
const itens = document.querySelectorAll("li");

busca.addEventListener("keyup", () => {
    const texto = busca.value.toLowerCase();

    itens.forEach(item => {
        const nome = item.textContent.toLowerCase();

       
        item.style.display = nome.includes(texto) && "block" || "none";
    });
});
