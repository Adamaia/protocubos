import pg from 'pg'

const bancoDeDadosHost = process.env.BANCO_DE_DADOS_HOST ?? 'localhost'
const bancoDeDadosPorta = process.env.BANCO_DE_DADOS_PORTA ?? 5432
const bancoDeDadosUsuario = process.env.BANCO_DE_DADOS_USUARIO
const bancoDeDadosSenha = process.env.BANCO_DE_DADOS_SENHA

if (!bancoDeDadosUsuario || !bancoDeDadosSenha) {
  throw new Error('Você precisa fornecer usuário e senha do banco de dados')
}

const pool = new pg.Pool({
  host: bancoDeDadosHost,
  port: bancoDeDadosPorta,
  user: bancoDeDadosUsuario,
  password: bancoDeDadosSenha,
  database: 'dindin',
})

console.log(
  `Servidor de banco de dados rodando em "postgresql://${bancoDeDadosUsuario}:${bancoDeDadosSenha}@${bancoDeDadosHost}:${bancoDeDadosPorta}/dindin?schema=public"`,
)

export { pool }
