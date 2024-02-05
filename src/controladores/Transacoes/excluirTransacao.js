import { db } from '../../infra/fabricaDeSql/index.js'
import { validarCampos } from '../../utils/validarCampos.js'

async function excluirTransacao(req, res) {
  try {
    const id_usuario = req.usuario.id
    const validacao = validarCampos(req.params, ['id'])

    if (validacao.erro) {
      return res.status(409).json({
        mensagem: validacao.erro,
      })
    }

    const { id: id_transacao } = validacao

    const transacoesEncontradas = await db.encontrar({
      tabela: 'transacoes',
      onde: {
        id: id_transacao,
        usuario_id: id_usuario,
      },
    })

    const transacaoEncontrada = transacoesEncontradas[0]

    if (!transacaoEncontrada) {
      return res
        .status(404)
        .json({ mensagem: 'Transação não encontrada neste usuário logado.' })
    }

    if (transacaoEncontrada.usuario_id !== id_usuario) {
      return res.status(403).json({
        mensagem: 'Você não pode deletar a transação de outro usuário.',
      })
    }

    await db.deletar({
      tabela: 'transacoes',
      onde: {
        id: id_transacao,
      },
    })

    return res.status(204).end()
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno.' })
  }
}

export { excluirTransacao }
