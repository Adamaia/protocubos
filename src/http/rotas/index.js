import { Router } from 'express'
import { logarUsuario } from '../../controladores/Usuarios/logarUsuario.js'
import { criarUsuario } from '../../controladores/Usuarios/criarUsuarios.js'
import { validarUsuarioLogado } from '../intermediarios/validarUsuarioLogado.js'
import { detalharUsuario } from '../../controladores/Usuarios/detalharUsuario.js'
import { editarTransacao } from '../../controladores/Transacoes/editarTransacao.js'
import { atualizarUsuario } from '../../controladores/Usuarios/atualizarUsuarios.js'
import { excluirTransacao } from '../../controladores/Transacoes/excluirTransacao.js'
import { listarCategorias } from '../../controladores/Categorias/listarCategorias.js'
import { listarTransacoes } from '../../controladores/Transacoes/listarTransacoes.js'
import { detalharTransacao } from '../../controladores/Transacoes/detalharTransacao.js'
import { cadastrarTransacao } from '../../controladores/Transacoes/cadastrarTransacao.js'
import { extratoDeTransacoes } from '../../controladores/Transacoes/extratoDeTransacoes.js'

const rotas = Router()

rotas.post('/usuario', criarUsuario)
rotas.post('/login', logarUsuario)

rotas.use(validarUsuarioLogado)
rotas.get('/usuario', detalharUsuario)
rotas.put('/usuario', atualizarUsuario)

rotas.get('/categoria', listarCategorias)

rotas.get('/transacao', listarTransacoes)
rotas.post('/transacao', cadastrarTransacao)
rotas.get('/transacao/:id', detalharTransacao)
rotas.put('/transacao/:id', editarTransacao)
rotas.delete('/transacao/:id', excluirTransacao)
rotas.get('/transacao/extrato', extratoDeTransacoes)

export { rotas }
