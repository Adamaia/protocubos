import { pool } from '../bancoDeDados/index.js'

/**
 *
 * @param {import("./index.js").Parametros} parametros
 */
export async function atualizar(parametros) {
  try {
    const tabela = parametros.tabela
    const chavesEValoresDeParametrosParaAtualizar = Object.entries(
      parametros.dados,
    )
    const chavesEValoresDeParametrosParaCondicao = Object.entries(
      parametros.onde,
    )

    const chavesEValoresParaAtualizar = []
    const chavesEValoresParaCondicao = []

    chavesEValoresDeParametrosParaAtualizar.forEach(([chave, valor]) => {
      const valorNaoEUmInteiro = isNaN(Number(valor))

      if (valorNaoEUmInteiro) {
        chavesEValoresParaAtualizar.push(`${chave}='${valor}'`)
        return
      }

      chavesEValoresParaAtualizar.push(`${chave}=${valor}`)
    })

    chavesEValoresDeParametrosParaCondicao.forEach(([chave, valor]) => {
      const valorNaoEUmInteiro = isNaN(Number(valor))

      if (valorNaoEUmInteiro) {
        chavesEValoresParaCondicao.push(`${chave}='${valor}'`)
        return
      }

      chavesEValoresParaCondicao.push(`${chave}=${valor}`)
    })

    const valoresParaAtualizacao = chavesEValoresParaAtualizar.join(',')
    const condicao = chavesEValoresParaCondicao.reduce(
      (cond, valorAtual, index) => {
        if (index === 0) {
          return (cond = valorAtual)
        }

        return (cond = `${cond} AND ${valorAtual}`)
      },
    )

    const sql = `UPDATE ${tabela} SET ${valoresParaAtualizacao} WHERE ${condicao}`

    await pool.query(sql)
  } catch (err) {
    throw err
  }
}
