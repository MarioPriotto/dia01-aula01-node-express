import express, { response } from 'express'
import * as dotenv from 'dotenv'
import employeeRouter from "./routes/employee.routes.js"
import processRouter from "./routes/process.routes.js"

//configuração padrão do dotenv
dotenv.config()

// inicialização do express
const app = express()

// permitir a interpretação de json()
app.use(express.json())

// http://localhost:8080/employee/edit/:id 
app.use('/employee',employeeRouter)
app.use('/process',processRouter)

// executar o servidor na porta 8080
// sempre vem string -> é preciso converter para número
app.listen(Number(process.env.PORT), () => console.log('server on port 8080!'))

