-- Criar tabela usuarios se não existir
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INTEGER NOT NULL CHECK (idade >= 0 AND idade <= 120),
    email VARCHAR(100) NOT NULL
);

-- Verificar se tem dados
SELECT COUNT(*) FROM usuarios;
