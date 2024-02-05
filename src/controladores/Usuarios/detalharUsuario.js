import { db } from '../../infra/fabricaDeSql/index.js'

async function detalharUsuario(req, res) {
  try {
    const { id } = req.usuario

    const usuarios = await db.encontrar({
      tabela: 'usuarios',
      onde: {
        id,
      },
    })

    const usuario = usuarios[0]

    if (!usuario) {
      return res.status(409).json({
        mensagem: 'Usuário não encontrado',
      })
    }

    return res.status(200).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    })
  } catch (err) {
    return res.status(500).json({ mensagem: 'Erro interno.' })
  }
}

export { detalharUsuario }
