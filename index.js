import express, { response } from 'express'
import * as dotenv from 'dotenv'
import funcionarioRouter from "./routes/funcionario.routes.js"
import setorRouter from "./routes/setor.routes.js"
import viagemRouter from "./routes/viagem.routes.js"
import dbConnection from './config/db.config.js'

//configuração padrão do dotenv
dotenv.config()

//conecta a base de dados
dbConnection()

// inicialização do express
const app = express()

// permitir a interpretação de json()
app.use(express.json())

// ajusta a rota (no navegador) para os routes.js
app.use('/funcionario',funcionarioRouter)
app.use('/setor',setorRouter)
app.use('/viagem',viagemRouter)

// executar o servidor na porta 8080
// sempre vem string -> é preciso converter para número
app.listen( Number(process.env.PORT),
            () => console.log('server on port 8080!')
)
