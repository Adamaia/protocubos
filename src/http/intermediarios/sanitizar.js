export function sanitizar(req, _res, next) {
  const corpoNaoSanitizado = req.body
  const queryNaoSanitizado = req.query
  const paramsNaoSanitizado = req.params

  const corpoNaoSanitizadoEmString = JSON.stringify(corpoNaoSanitizado)
  const queryNaoSanitizadoEmString = JSON.stringify(queryNaoSanitizado)
  const paramsNaoSanitizadoEmString = JSON.stringify(paramsNaoSanitizado)

  // < > ; = ( ) \
  const regex = /<[^>]*>|[;]|[=()\\']/g

  const corpoSanitizado = corpoNaoSanitizadoEmString.replace(regex, '')
  const querySanitizado = queryNaoSanitizadoEmString.replace(regex, '')
  const paramsSanitizado = paramsNaoSanitizadoEmString.replace(regex, '')

  req.body = JSON.parse(corpoSanitizado)
  req.query = JSON.parse(querySanitizado)
  req.params = JSON.parse(paramsSanitizado)

  return next()
}
