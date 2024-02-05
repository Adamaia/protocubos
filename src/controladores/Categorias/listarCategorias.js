import { db } from '../../infra/fabricaDeSql/index.js'

async function listarCategorias(req, res) {
  try {
    const categorias = await db.encontrar({
      tabela: 'categorias',
      onde: '*',
    })

    return res.status(200).json(categorias)
  } catch (error) {
    return res
      .status(500)
      .json({ mensagem: 'Não foi possível acessar categorias.' })
  }
}

export { listarCategorias }
