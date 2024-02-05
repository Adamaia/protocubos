import { db } from '../../infra/fabricaDeSql/index.js'
import { validarCampos } from '../../utils/validarCampos.js'

async function editarTransacao(req, res) {
  try {
    const validacao = validarCampos(req.body, [
      'descricao',
      'valor',
      'data',
      'categoria_id',
      'tipo',
    ])
    const validacaoParams = validarCampos(req.params, ['id'])

    if (validacao.erro || validacaoParams.erro) {
      return res.status(400).json({
        mensagem: validacao.erro || validacaoParams.erro,
      })
    }

    const { valor, data, tipo, categoria_id, descricao } = validacao
    const { id: id_transacao } = validacaoParams
    const id_usuario = req.usuario.id

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
        mensagem: 'Você não pode editar a transação de outro usuário.',
      })
    }

    const tiposValidos = ['entrada', 'saida']
    if (!tiposValidos.includes(tipo)) {
      return res.status(400).json({
        mensagem: 'O tipo esta preenchido de forma incorreta, favor corrigir',
      })
    }

    const categoriasEncontradas = await db.encontrar({
      tabela: 'categorias',
      onde: {
        id: categoria_id,
      },
    })
    const categoriaEncontrada = categoriasEncontradas[0]

    if (!categoriaEncontrada) {
      return res.status(404).json({
        mensagem: 'A categoria informada não encontrada',
      })
    }

    await db.atualizar({
      tabela: 'transacoes',
      onde: {
        id: id_transacao,
      },
      dados: {
        valor,
        data,
        tipo,
        categoria_id,
        descricao,
      },
    })

    res.status(204).send()
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

export { editarTransacao }
