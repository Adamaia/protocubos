import { pool } from '../bancoDeDados/index.js'

/**
 * @param {import("./index.js").Parametros} parametros
 * @returns
 */
export async function encontrar(parametros) {
  try {
    const tabela = parametros.tabela

    if (parametros.onde === '*') {
      try {
        const sql = `SELECT * FROM ${tabela}`
        console.log(sql)

        const resultadoDaQuery = await pool.query(sql)

        return resultadoDaQuery.rows
      } catch (err) {
        console.log(`Erro ao encontrar usuários`)
        throw err
      }
    }

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

    const sql = `SELECT * FROM ${tabela} WHERE ${condicao}`

    const resultadoDaQuery = await pool.query(sql)

    return resultadoDaQuery.rows
  } catch (err) {
    throw err
  }
}
