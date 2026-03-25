const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const usuariosRoutes = require("./routes/usuarios");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Rotas de API
app.use("/api/usuarios", usuariosRoutes);

// Rotas de paginas
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
