import express, { response } from 'express'
import FuncionarioModel from '../models/funcionario.models.js'
import SetorModel from '../models/setor.models.js'
import ViagemModel from '../models/viagem.models.js'
const router = express.Router()


// http://localhost:8080/funcionario/all
// testando de NAVEGADOR
// testando de POSTMAN (GET)

router.get('/all', async (request, response) => {
    try {
        const afetado = await FuncionarioModel.find().populate("setor").populate("viagens")
        return response.status(200).json(afetado)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - base - / "})
    }
})


// http://localhost:8080/funcionario/create
// no POSTMAN chamar com POST -conteúdo no BODY, raw, json

router.post('/create/:setorId',async (request, response) => {
    try {
        const { setorId } = request.params
        const afetado = await FuncionarioModel.create(
            {
                ...request.body,
                setor: setorId
            }
        )
        await SetorModel.findByIdAndUpdate(
            setorId,
            { $push: { funcionarios: afetado._id} }
        )
        return response.status(201).json(afetado)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - /create "})
    }
}) 


// http://localhost:8080/funcionario/random
// testando de NAVEGADOR
// testando de POSTMAN (GET)

router.get('/random',async (request, response) => {
    try {
        const count = await FuncionarioModel.estimatedDocumentCount().populate("setor").populate("viagem")
        const index = Math.floor(Math.random() * count )
        //const afetado = await FuncionarioModel.find( {}, null, { skip: index, limit: 1 }).exec();
        const afetado = await FuncionarioModel.findOne( {}, null, { skip: index });
        return response.status(200).json(afetado)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - /random "})
    }
})


// http://localhost:8080/funcionario/id
// testando de NAVEGADOR
// testando de POSTMAN (GET)

router.get('/:id',async (request,response) => {
    try {
        const { id } = request.params
        const afetado = await FuncionarioModel.findOne({_id: id}).populate("setor").populate("viagem")
        return response.status(200).json(afetado)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - /get/id "})
    }
})


// http://localhost:8080/funcionario/edit/id
// no POSTMAN chamar com PUT -conteúdo no BODY, raw, json
// remover, de body: _id, __v, createdAt, updatedAt

router.put('/edit/:id', async (request,response) => {
    try {
        const { id } = request.params
        const afetado = await FuncionarioModel.findByIdAndUpdate(
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


// http://localhost:8080/funcionario/delete/id
// no POSTMAN chamar com DELETE

router.delete('/delete/:id',async (request, response) => {
    try { 
        const { id } = request.params        
        const afetado = await FuncionarioModel.findByIdAndDelete(id)        
        await SetorModel.findByIdAndUpdate(
           afetado.setor,
           { $pull: { funcionarios: afetado._id } }
        )
        await ViagemModel.updateMany( { funcionarios: { $in: [ afetado._id ] } },
            { $pull: { funcionarios: afetado._id } }
        )
        return response.status(200).json(afetado)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - /delete/id "})
    }
})


// http://localhost:8080/funcionario/setor/id
// testando de NAVEGADOR
// testando de POSTMAN (GET)

router.get('/setor/:id', async (request,response) => {
    try {
        const { id } = request.params
        const query  = { setor: id };
        const afetado = await FuncionarioModel.find(query).populate("setor").populate("viagem")
        if (!afetado) {
            return response.status(404).json({ msg: "Setor não encontrado"})
        }
        return response.status(200).json(afetado)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - GET BY SETOR - /setor/id "})
    }
})


// http://localhost:8080/funcionario/status/open
// testando de NAVEGADOR
// testando de POSTMAN (GET)

router.get('/status/open',async (request,response) => {
    try {
        const query  = { status: { $eq: 'Aberto' } }
        const afetado = await FuncionarioModel.find(query).populate("setor").populate("viagem")
        if (!afetado) {
            return response.status(404).json({ msg: "Não há Status Aberto"})
        }
        return response.status(200).json(afetado)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - GET STATUS OPEN - /status/open"})
    }
})


// http://localhost:8080/funcionario/status/close
// testando de NAVEGADOR
// testando de POSTMAN (GET)

router.get('/status/close',async (request,response) => {
    try {
        const query  = { status: { $eq: 'Fechado' } }
        const afetado = await FuncionarioModel.find(query).populate("setor").populate("viagem")
        if (!afetado) {
            return response.status(404).json({ msg: "Não há Status Fechado"})
        }
        return response.status(200).json(afetado)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - GET STATUS CLOSE - /status/close"})
    }
})


// http://localhost:8080/funcionario/addComment/id
// testando de POSTMAN (GET)

router.put('/addComment/:id',async (request,response) => {
    try {
        const { id } = request.params
         // Retorna um objeto (e não uma lista)
        let leitura = await FuncionarioModel.findOne({_id: id})
        leitura.comments.push(`Comentário adicionado: ${leitura.comments.length+1}`)
        const afetado = await FuncionarioModel.findByIdAndUpdate(
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


// http://localhost:8080/funcionario/addViagem/id?viagem=stringviagem
// testando de POSTMAN (GET)

router.put('/addViagem/:id',async (request,response) => {
    try {
        const { id } = request.params
        const viagemAdd = request.query.viagem
        if ( await FuncionarioModel.findById(id) === null ) {
            console.log("Funcionário informado não existe...")
            return response.status(500).json({ msg: "Funcionário informado não existe... /addViagem/id?viagem=999999999 "})
        }
        if ( await ViagemModel.findById(viagemAdd) === null ) {
            console.log("Viagem informada não existe...")
            return response.status(500).json({ msg: "Viagem informada não existe... /addViagem/id?viagem=999999999 "})
        }
        if ( await FuncionarioModel.findOne( { $and: [ { _id: { $eq: id } }, { viagens: { $in: [ viagemAdd ] } } ] } ) !== null ) {
            console.log("Viagem já adicionada para esse Funcionário...")
            return response.status(500).json({ msg: "Viagem já adicionada para esse Funcionário... /addViagem/id?viagem=999999999 "})
        }
        // inclusao da viagem na tabela de viagens do Funcionario
        const afetado = await FuncionarioModel.updateOne(
            { _id: { $eq: id } },
            { $push: { viagens: viagemAdd } }            
        )
        // inclusao do Funcionário na tabela de Funcionários da Viagem
        await ViagemModel.updateOne(
            { _id: { $eq: viagemAdd } },
            { $push: { funcionarios: id } }            
        )        
        return response.status(200).json(afetado)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - /addComment/id "})
    }
})


// http://localhost:8080/funcionario/delViagem/id?viagem=stringviagem
// testando de POSTMAN (GET)

router.put('/delViagem/:id',async (request,response) => {
    try {
        const { id } = request.params
        const viagemAdd = request.query.viagem
        if ( await FuncionarioModel.findById(id) === null ) {
            console.log("Funcionário informado não existe...")
            return response.status(500).json({ msg: "Funcionário informado não existe... /delViagem/id?viagem=999999999 "})
        }
        if ( await ViagemModel.findById(viagemAdd) === null ) {
            console.log("Viagem informada não existe...")
            return response.status(500).json({ msg: "Viagem informada não existe... /delViagem/id?viagem=999999999 "})
        }
        if ( await FuncionarioModel.findOne( { $and: [ { _id: { $eq: id } }, { viagens: { $in: [ viagemAdd ] } } ] } ) === null ) {
            console.log("Viagem não foi adicionada para esse Funcionário...")
            return response.status(500).json({ msg: "Viagem não foi adicionada para esse Funcionário... /delViagem/id?viagem=999999999 "})
        }
        // remoção da viagem na tabela de viagens do Funcionario
        const afetado = await FuncionarioModel.updateOne(
            { _id: { $eq: id } },
            { $pull: { viagens: viagemAdd } }            
        )        
        // remoção do Funcionário na tabela de Funcionários da Viagem
        await ViagemModel.updateOne(
            { _id: { $eq: viagemAdd } },
            { $pull: { funcionarios: id } }            
        )        
        return response.status(200).json(afetado)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - /delComment/id "})
    }
})


export default router
