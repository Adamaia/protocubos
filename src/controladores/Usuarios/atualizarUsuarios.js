import { db } from '../../infra/fabricaDeSql/index.js'
import { validarCampos } from '../../utils/validarCampos.js'
import bcryptjs from 'bcryptjs'

async function atualizarUsuario(req, res) {
  try {
    const validacao = validarCampos(req.body, ['email', 'senha', 'nome'])
    const { id } = req.usuario

    if (validacao.erro) {
      return res.status(409).json({
        mensagem: validacao.erro,
      })
    }

    const { email, senha, nome } = validacao

    const usuarios = await db.encontrar({
      tabela: 'usuarios',
      onde: {
        email,
      },
    })

    const usuario = usuarios[0]

    if (usuario && usuario.id !== id) {
      return res.status(400).json({
        mensagem: 'Já existe um usuário com esse email.',
      })
    }

    const senhaCriptografada = bcryptjs.hashSync(senha, 8)

    await db.atualizar({
      tabela: 'usuarios',
      dados: {
        nome,
        email,
        senha: senhaCriptografada,
      },
      onde: {
        id,
      },
    })

    return res.status(204).end()
  } catch (err) {
    return res.status(500).json({ mensagem: 'Erro interno.' })
  }
}

export { atualizarUsuario }
