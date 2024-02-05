import { pool } from '../bancoDeDados/index.js'

/**
 * @param {import('./index.js').Parametros} parametros
 */
export async function criar(parametros) {
  try {
    const tabela = parametros.tabela
    const chavesEValoresDeParametrosParaCriar = Object.entries(parametros.dados)

    const chavesDeParametrosParaCriar = []
    const valorsDeParametrosParaCriar = []

    chavesEValoresDeParametrosParaCriar.forEach(([chave, valor]) => {
      const valorNaoEUmInteiro = isNaN(Number(valor))

      chavesDeParametrosParaCriar.push(chave)

      if (valorNaoEUmInteiro) {
        valorsDeParametrosParaCriar.push(`'${valor}'`)
        return
      }

      valorsDeParametrosParaCriar.push(`${valor}`)
    })

    const chavesParaInserção = chavesDeParametrosParaCriar.join(',')
    const valoresParaInserção = valorsDeParametrosParaCriar.join(',')

    const sql = `INSERT INTO ${tabela} (${chavesParaInserção}) VALUES (${valoresParaInserção}) RETURNING *`

    const resultado = await pool.query(sql)
    return resultado.rows[0]
  } catch (err) {
    throw err
  }
}
