import express, { response } from 'express'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

let data = [
]

router.get('/all',(request, response) => {
    return response.status(200).json(data)
})

router.get('/random',(request, response) => {
    
    const index = Math.floor(Math.random() * data.length) - 1
    return response.status(200).json(data[index])
})

router.get('/:id',(request,response) => {
    const { id } = request.params
    const registro = data.find(
        item => item.id === id
    )
    const index = data.indexOf(registro)
    return response.status(200).json(data[index])
})

router.get('/setor/:id',(request,response) => {
    const { id } = request.params
    const registros = data.filter(
        item => item.setor === id
    )
    //const index = data.indexOf(registro)
    return response.status(200).json(registros)
})

router.get('/status/open',(request,response) => {
    const registros = data.filter(
        item => item.status !== 'Finalizado'
    )
    return response.status(200).json(registros)
})

router.get('/status/close',(request,response) => {
    const registros = data.filter(
        item => item.status === 'Finalizado'
    )
    return response.status(200).json(registros)
})

router.post('/create',(request, response) => {
    const newData = {
        ...request.body,
        id: uuidv4()
    }
    data.push(newData)
    return response.status(200).json(data)
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

router.put('/addComment/:id',(request,response) => {
    const { id } = request.params
    const update = data.find(
        item => item.id === id
    )
    const index = data.indexOf(update)
    //data[index] = {
        // ...update, 
        //...request.body
    //}
    data[index].comments.push("comentário adicionado: " + (data[index].comments.length+1) )
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