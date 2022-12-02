import express, { response } from 'express'
import FuncionarioModel from '../models/funcionario.models.js'
import SetorModel from '../models/setor.models.js'
import ViagemModel from '../models/viagem.models.js'
const router = express.Router()


// http://localhost:8080/viagem
// testando de NAVEGADOR
// testando de POSTMAN (GET)

router.get('/', async (request, response) => {
    try {
        const afetado = await ViagemModel.find().populate("funcionarios")
        return response.status(200).json(afetado)        
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - / "})
    }
})


// http://localhost:8080/viagem/id
// testando de NAVEGADOR
// testando de POSTMAN (GET)

router.get('/:id', async (request,response) => {
    try {
        const { id } = request.params
        const afetado = await ViagemModel.findById(id).populate("funcionarios")
        if (!afetado) {
            return response.status(404).json({ masg: "Viagem não foi encontrada"})
        }
        return response.status(200).json(afetado)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - GET BY ID - /id "})
    }
})


// http://localhost:8080/viagem/create
// no POSTMAN chamar com POST -conteúdo no BODY, raw, json

router.post('/create', async (request, response) => {
    try {
        const afetado = await ViagemModel.create(request.body)
        return response.status(201).json(afetado)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - /create "})
    }
}) 


// http://localhost:8080/viagem/edit/id
// no POSTMAN chamar com PUT -conteúdo no BODY, raw, json
// remover, de body: _id, __v, createdAt, updatedAt

router.put('/edit/:id', async (request,response) => {
    try {
        const { id } = request.params
        const afetado = await ViagemModel.findByIdAndUpdate(
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


// http://localhost:8080/viagem/delete/id
// no POSTMAN chamar com DELETE

router.delete('/delete/:id',async (request, response) => {
    try { 
        const { id } = request.params

        //const statusExiste = await FuncionarioModel.findOne({setor: id})
        //if ( statusExiste ) {
        //    console.log("Não é possível excluir esta Viagem porque há funcionários nele")
        //    return response.status(500).json({ msg: "Não é possível exluir este Viagem porque há funcionários nele - /delete/id "})
        //}

        const afetado = await ViagemModel.findByIdAndDelete(id)

        await FuncionarioModel.updateMany( { viagens: { $in: [ afetado._id ] } },
            { $pull: { viagens: afetado._id } }
        )

        return response.status(200).json(afetado)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - /delete/id "})
    }
})

export default router