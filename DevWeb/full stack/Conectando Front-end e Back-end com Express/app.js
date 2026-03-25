const express = require("express");
const path = require("path");
const app = express();

const usuariosRoutes = require("./routes/usuarios");

app.use(express.json());
app.use(express.static("public"));

// Rotas de API
app.use("/api/usuarios", usuariosRoutes);

// Rotas de páginas
app.get("/", (req
