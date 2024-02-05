import { db } from '../../infra/fabricaDeSql/index.js'
import { validarCampos } from '../../utils/validarCampos.js'

async function detalharTransacao(req, res) {
  try {
    const id_usuario = req.usuario.id
    const validacao = validarCampos(req.params, ['id'])

    if (validacao.erro) {
      return res.status(400).json({
        mensagem: validacao.erro,
      })
    }

    const { id: id_transacao } = validacao

    const transacoes = await db.encontrar({
      tabela: 'transacoes',
      onde: {
        id: id_transacao,
      },
    })

    const transacao = transacoes[0]

    if (!transacao) {
      return res.status(404).json({ mensagem: 'Transação não encontrada.' })
    }

    if (transacao.usuario_id !== id_usuario) {
      return res.status(403).json({
        mensagem: 'Você não pode detalhar a transação de outro usuário.',
      })
    }

    return res.status(200).json(transacao)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno.' })
  }
}

export { detalharTransacao }
