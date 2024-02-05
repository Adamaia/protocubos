import bcrypt from 'bcryptjs'
import { db } from '../../infra/fabricaDeSql/index.js'
import { validarCampos } from '../../utils/validarCampos.js'
import jwt from 'jsonwebtoken'

async function logarUsuario(req, res) {
  try {
    const validacao = validarCampos(req.body, ['email', 'senha'])

    if (validacao.erro) {
      return res.status(409).json({
        mensagem: validacao.erro,
      })
    }

    const { email, senha } = validacao

    const usuarios = await db.encontrar({
      tabela: 'usuarios',
      onde: {
        email,
      },
    })

    const usuario = usuarios[0]

    if (!usuario) {
      return res.status(403).json({
        mensagem: 'Usuarios e/ou senha invalido(s)',
      })
    }

    const senhaEValida = bcrypt.compareSync(senha, usuario.senha)

    if (!senhaEValida) {
      return res.status(403).json({
        mensagem: 'Usuarios e/ou senha invalido(s)',
      })
    }

    const token = jwt.sign(
      {
        sub: usuario.id,
      },
      process.env.SEGREDO_JWT,
      {
        expiresIn: 1000 * 60 * 60 * 8, // 8horas
      },
    )

    return res.status(201).json({
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
      },
      token,
    })
  } catch (err) {
    return res.status(500).json({ mensagem: 'Erro interno.' })
  }
}

export { logarUsuario }
