import { atualizar } from './atualiza.js'
import { criar } from './criar.js'
import { deletar } from './deletar.js'
import { encontrar } from './encontrar.js'
/**
 * @typedef {object} Parametros
 * @property {'usuarios'|'categorias'|'transacoes'} tabela
 */

const db = {
  criar,
  atualizar,
  encontrar,
  deletar,
}

export { db }
