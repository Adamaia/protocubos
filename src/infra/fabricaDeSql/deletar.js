import { pool } from '../bancoDeDados/index.js'

/**
 * @param {import("./index.js").Parametros} parametros
 */
export async function deletar(parametros) {
  try {
    const tabela = parametros.tabela

    const chavesEValoresDeParametrosParaCondicao = Object.entries(
      parametros.onde,
    )
    const chavesEValoresParaCondicao = []

    chavesEValoresDeParametrosParaCondicao.forEach(([chave, valor]) => {
      const valorNaoEUmInteiro = isNaN(Number(valor))

      if (valorNaoEUmInteiro) {
        chavesEValoresParaCondicao.push(`${chave}='${valor}'`)
        return
      }

      chavesEValoresParaCondicao.push(`${chave}=${valor}`)
    })

    const condicao = chavesEValoresParaCondicao.reduce(
      (cond, valorAtual, index) => {
        if (index === 0) {
          return (cond = valorAtual)
        }

        return (cond = `${cond} AND ${valorAtual}`)
      },
    )

    const sql = `DELETE FROM ${tabela} WHERE ${condicao}`

    await pool.query(sql)
  } catch (err) {
    throw err
  }
}
