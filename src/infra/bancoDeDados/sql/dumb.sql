CREATE DATABASE dindin;

-- Tabelas de usuarios
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL
);

-- Tabelas de categorias
CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  descricao VARCHAR(255) NOT NULL
);

-- Tabela de transações
CREATE TABLE transacoes (
  id SERIAL PRIMARY KEY,
  valor INT NOT NULL,
  data TIMESTAMPTZ NOT NULL,
  usuario_id INT NOT NULL,
  tipo VARCHAR(20) NOT NULL,
  categoria_id INT NOT NULL,
  descricao VARCHAR(255) NOT NULL,

  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Inserção de categorias 
insert into categorias (descricao) values ('Alimentação'), ('Assinaturas e Serviços'), ('Casa'), 
('Mercado'), ('Cuidados Pessoais'), ('Educação'), ('Família'), ('Lazer'), ('Pets'), ('Presentes'), 
('Roupas'), ('Saúde'), ('Transporte'), ('Salário'), ('Vendas'), ('Outras receitas'), ('Outras despesas')