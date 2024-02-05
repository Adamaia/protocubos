import { db } from '../../infra/fabricaDeSql/index.js'

async function extratoDeTransacoes(req, res) {
  try {
    const id_usuario = req.usuario.id

    let valoresEntrada = 0
    let valoresSaida = 0

    const transacoesEncontradas = await db.encontrar({
      tabela: 'transacoes',
      onde: {
        usuario_id: id_usuario,
      },
    })

    transacoesEncontradas.forEach((transacao) => {
      if (transacao.tipo === 'entrada') {
        valoresEntrada += transacao.valor
      } else {
        valoresSaida += transacao.valor
      }
    })

    return res.status(200).json({
      entrada: valoresEntrada,
      saida: valoresSaida,
    })
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno.' })
  }
}

export { extratoDeTransacoes }
