import { pool } from '../../infra/bancoDeDados/index.js'
import { db } from '../../infra/fabricaDeSql/index.js'

async function listarTransacoes(req, res) {
  try {
    const id_usuario = req.usuario.id
    const filtroCategorias = req.query.filtro || []

    if (filtroCategorias.length > 0) {
      const query = `
      SELECT * FROM transacoes WHERE usuario_id = $1 and categoria_id IN (
        SELECT id FROM categorias WHERE descricao = ANY($2)
      );
    `
      const { rows } = await pool.query(query, [id_usuario, filtroCategorias])

      return res.status(200).json(rows)
    }

    const categorias = await db.encontrar({
      tabela: 'transacoes',
      onde: {
        usuario_id: id_usuario,
      },
    })

    return res.status(200).json(categorias)
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro interno. ' })
  }
}

export { listarTransacoes }
