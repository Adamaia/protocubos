function validarCampos(objetoParaValidacao, chavesParaValidacao) {
  let valorFaltando = false
  const camposFaltando = []

  chavesParaValidacao.forEach((chave) => {
    const valorNoObjeto = objetoParaValidacao[chave]

    if (!valorNoObjeto) {
      camposFaltando.push(chave)
      valorFaltando = true
    }
  })

  if (valorFaltando) {
    return {
      erro: `Os campos ${camposFaltando.join(', ')} estão faltando`,
    }
  }

  return objetoParaValidacao
}

export { validarCampos }
