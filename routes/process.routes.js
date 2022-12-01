import express, { response } from 'express'
import cadastroModel from '../models/cadastroBase.models.js'
const router = express.Router()


// http://localhost:8080/process/all
// testando de NAVEGADOR
// testando de POSTMAN (GET)

router.get('/all', async (request, response) => {
    try {
        const afetado = await cadastroModel.find()        
        return response.status(200).json(afetado)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - base - / "})
    }
})


// http://localhost:8080/process/create
// no POSTMAN chamar com POST -conteúdo no BODY, raw, json

router.post('/create',async (request, response) => {
    try {
        const afetado = await cadastroModel.create(request.body)
        return response.status(201).json(afetado)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - /create "})
    }
}) 


// http://localhost:8080/process/random
// testando de NAVEGADOR
// testando de POSTMAN (GET)

router.get('/random',async (request, response) => {
    try {
        const count = await cadastroModel.estimatedDocumentCount();
        const index = Math.floor(Math.random() * count )
        //const afetado = await cadastroModel.find( {}, null, { skip: index, limit: 1 }).exec();
        const afetado = await cadastroModel.findOne( {}, null, { skip: index });
        return response.status(200).json(afetado)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - /random "})
    }
})


// http://localhost:8080/process/id
// testando de NAVEGADOR
// testando de POSTMAN (GET)

router.get('/:id',async (request,response) => {
    try {
        const { id } = request.params
        // retorna um objeto
        const afetado = await cadastroModel.findOne({_id: id})
        return response.status(200).json(afetado)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - /get/id "})
    }
})


// http://localhost:8080/process/edit/id
// no POSTMAN chamar com PUT -conteúdo no BODY, raw, json
// remover, de body: _id, __v, createdAt, updatedAt

router.put('/edit/:id', async (request,response) => {
    try {
        const { id } = request.params
        const afetado = await cadastroModel.findByIdAndUpdate(
            id,
            { ...request.body },
            { new: true, runValidators: true}
        )
        return response.status(200).json(afetado)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - /edit/id "})
    }
})


// http://localhost:8080/process/process/id
// no POSTMAN chamar com DELETE

router.delete('/delete/:id',async (request, response) => {
    try { 
        const { id } = request.params
        const afetado = await cadastroModel.findByIdAndDelete(id)
        return response.status(200).json(afetado)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - /delete/id "})
    }
})


// http://localhost:8080/process/setor/id
// testando de NAVEGADOR
// testando de POSTMAN (GET)

router.get('/setor/:id', async (request,response) => {
    try {
        const { id } = request.params
        const query  = { setor: id };
        const afetado = await cadastroModel.find(query)
        if (!afetado) {
            return response.status(404).json({ msg: "Setor não encontrado"})
        }
        return response.status(200).json(afetado)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - GET BY SETOR - /setor/id "})
    }
})


// http://localhost:8080/process/status/open
// testando de NAVEGADOR
// testando de POSTMAN (GET)

router.get('/status/open',async (request,response) => {
    try {
        const query  = { status: { $eq: 'Aberto' } }
        const afetado = await cadastroModel.find(query)
        if (!afetado) {
            return response.status(404).json({ msg: "Não há Status Aberto"})
        }
        return response.status(200).json(afetado)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - GET STATUS OPEN - /status/open"})
    }
})


// http://localhost:8080/process/status/close
// testando de NAVEGADOR
// testando de POSTMAN (GET)

router.get('/status/close',async (request,response) => {
    try {
        const query  = { status: { $eq: 'Fechado' } }
        const afetado = await cadastroModel.find(query)
        if (!afetado) {
            return response.status(404).json({ msg: "Não há Status Fechado"})
        }
        return response.status(200).json(afetado)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - GET STATUS CLOSE - /status/close"})
    }
})


// http://localhost:8080/process/addComment/id
// testando de NAVEGADOR
// testando de POSTMAN (GET)

router.put('/addComment/:id',async (request,response) => {
    try {
        const { id } = request.params
         // Retorna um objeto (e não uma lista)
        let leitura = await cadastroModel.findOne({_id: id})
        leitura.comments.push(`Comentário adicionado: ${leitura.comments.length+1}`)
        const afetado = await cadastroModel.findByIdAndUpdate(
            id,
            { ...leitura },
            { new: true, runValidators: true}
        )
        return response.status(200).json(afetado)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - /addComment/id "})
    }
})


export default router
