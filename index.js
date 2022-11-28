import express, { response } from 'express'
import { v4 as uuidv4 } from 'uuid'

import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(express.json())

let data = [
    {nome: "mario", departamento: "marketing", cidade: "Blumenau", idade: 52} 
]

app.get('/',(request, response) => {
    // no json a gente a resposta que a gente quer obter
    // sempre retornamos algo (uma resposta)
    // quanto tiver um status 200 vai passar as informações de data
    return response.status(200).json(data)
})

// http://localhost:8080/create
// testando de postman
// no exemplo acima eu chamei POST, com conteúdo em BODY,raw,json
app.post('/create',(request, response) => {
    const newData = {
        // captura o que estamos mandando (body da nossa requisição)
        // inclui um id
        ...request.body,
        matricula: "845",
        estado: "SC",
        id: uuidv4()
    }
    data.push(newData)
    return response.status(201).json(data)
}) 

app.put('/edit/:id',(request,response) => {
    const { id } = request.params
    const update = data.find(
        item => item.id === id
    )
    const index = data.indexOf(update)
    //array[posição] = item
    data[index] = {
        ...update, 
        ...request.body
    }
    return response.status(200).json(data[index])
})

app.delete('/delete/:id',(request, response) => {
    const { id } = request.params
    const deleteById = data.find(
        item => item.id === id
    )
    const index = data.indexOf(deleteById)
    data.splice(index,1)
    return response.status(200).json(data)
})

// sempre vem string -> é preciso converter para número
app.listen(Number(process.env.PORT), () => console.log('server on port 8080!'))

