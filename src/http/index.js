import 'dotenv/config'
import express from 'express'
import { rotas } from './rotas/index.js'
import { sanitizar } from './intermediarios/sanitizar.js'

const porta = process.env.PORTA ?? 3000

const app = express()
app.use(express.json())

app.use(sanitizar)
app.use(rotas)

app.listen(porta, async () => {
  console.log(`Servidor ouvindo na porta ${porta}`)
})
