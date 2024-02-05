import { db } from '../../infra/fabricaDeSql/index.js'
import { validarCampos } from '../../utils/validarCampos.js'

async function cadastrarTransacao(req, res) {
  try {
    const validacao = validarCampos(req.body, [
      'descricao',
      'valor',
      'data',
      'categoria_id',
      'tipo',
    ])

    if (validacao.erro) {
      return res.status(400).json({
        mensagem: validacao.erro,
      })
    }

    const { valor, data, tipo, categoria_id, descricao } = validacao
    const id_usuario = req.usuario.id

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

    const tiposValidos = ['entrada', 'saida']
    if (!tiposValidos.includes(tipo)) {
      return res.status(400).json({
        mensagem: 'O tipo esta preenchido de forma incorreta, favor corrigir',
      })
    }

    const transacaoCadastrada = await db.criar({
      tabela: 'transacoes',
      dados: {
        valor,
        data,
        usuario_id: id_usuario,
        tipo,
        categoria_id,
        descricao,
      },
    })

    res.status(201).json({
      id: transacaoCadastrada.id,
      tipo: transacaoCadastrada.tipo,
      descricao: transacaoCadastrada.descricao,
      valor: transacaoCadastrada.valor,
      data: transacaoCadastrada.data,
      usuario_id: transacaoCadastrada.usuario_id,
      categoria_id: categoriaEncontrada.id,
      categoria_nome: categoriaEncontrada.descricao,
    })
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno do servidor' })
  }
}

export { cadastrarTransacao }
