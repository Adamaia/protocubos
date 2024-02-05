import { db } from '../../infra/fabricaDeSql/index.js'
import { validarCampos } from '../../utils/validarCampos.js'
import bcryptjs from 'bcryptjs'

async function criarUsuario(req, res) {
  try {
    const validacao = validarCampos(req.body, ['email', 'senha', 'nome'])

    if (validacao.erro) {
      return res.status(409).json({
        mensagem: validacao.erro,
      })
    }

    const { email, senha, nome } = validacao

    const usuariosExistentes = await db.encontrar({
      tabela: 'usuarios',
      onde: {
        email,
      },
    })

    if (usuariosExistentes.length >= 1) {
      return res.status(400).json({
        mensagem: 'Já existe um usuário com esse email.',
      })
    }

    const senhaCriptografada = bcryptjs.hashSync(senha, 8)

    const novoUsuario = await db.criar({
      tabela: 'usuarios',
      dados: {
        nome,
        email,
        senha: senhaCriptografada,
      },
    })

    return res.status(201).json({
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email,
    })
  } catch (err) {
    return res.status(500).json({ mensagem: 'Erro interno.' })
  }
}

export { criarUsuario }
