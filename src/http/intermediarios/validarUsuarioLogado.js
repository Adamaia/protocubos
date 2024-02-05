import jwt from 'jsonwebtoken'

export function validarUsuarioLogado(req, res, next) {
  const bearerToken = req.headers.authorization

  if (!bearerToken) {
    return res.status(403).json({
      mensagem: 'Não autorizado',
    })
  }

  const token = bearerToken.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.SEGREDO_JWT)

    req.usuario = {
      id: payload.sub,
    }

    return next()
  } catch (err) {
    return res.status(403).json({
      mensagem: 'Não autorizado',
    })
  }
}
