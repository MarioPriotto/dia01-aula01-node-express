import express, { response } from 'express'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

let data = [
    // {   nome: "mario", 
    //     departamento: "marketing", 
    //     cidade: "Blumenau", 
    //     idade: 52
    // } 
]

router.get('/',(request, response) => {
    // no json a gente a resposta que a gente quer obter
    // sempre retornamos algo (uma resposta)
    // quanto tiver um status 200 vai passar as informações de data
    return response.status(200).json(data)
})

// http://localhost:8080/create
// testando de postman
// no exemplo acima eu chamei POST, com conteúdo em BODY,raw,json
router.post('/create',(request, response) => {
    const newData = {
        // captura o que estamos mandando (body da nossa requisição)
        // inclui um id
        ...request.body,
        id: uuidv4()
    }
    data.push(newData)
    return response.status(201).json(data)
}) 

router.put('/edit/:id',(request,response) => {
    const { id } = request.params
    const update = data.find(
        item => item.id === id
    )
    const index = data.indexOf(update)
    data[index] = {
        ...update, 
        ...request.body
    }
    return response.status(200).json(data[index])
})

router.delete('/delete/:id',(request, response) => {
    const { id } = request.params
    const deleteById = data.find(
        item => item.id === id
    )
    if ( deleteById ) {
        const index = data.indexOf(deleteById)
        data.splice(index,1)
    }
    return response.status(200).json(data)
})

export default router