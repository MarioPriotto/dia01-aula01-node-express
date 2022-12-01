import express, { response } from 'express'
import EmployeeModel from '../models/employee.models.js'
const router = express.Router()


// http://localhost:8080/employee
// testando de NAVEGADOR
// testando de POSTMAN (GET)

router.get('/', async (request, response) => {
    try {
        const employees = await EmployeeModel.find()
        return response.status(200).json(employees)        
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - / "})
    }
})


// http://localhost:8080/employee/id
// testando de NAVEGADOR
// testando de POSTMAN (GET)

router.get('/:id', async (request,response) => {
    try {
        const { id } = request.params
        const employee = await EmployeeModel.findById(id)
        if (!employee) {
            return response.status(404).json({ masg: "Usuário não foi encontrado"})
        }
        return response.status(200).json(employee)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - GET BY ID - /id "})
    }
})


// http://localhost:8080/employee/create
// no POSTMAN chamar com POST -conteúdo no BODY, raw, json

router.post('/create', async (request, response) => {
    try {
        const newEmployee = await EmployeeModel.create(request.body)
        return response.status(201).json(newEmployee)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - /create "})
    }
}) 


// http://localhost:8080/employee/edit/id
// no POSTMAN chamar com PUT -conteúdo no BODY, raw, json
// remover, de body: _id, __v, createdAt, updatedAt

router.put('/edit/:id', async (request,response) => {
    try {
        const { id } = request.params
        const update = await EmployeeModel.findByIdAndUpdate(
            id,
            { ...request.body },
            { new: true, runValidators: true}
        )
        return response.status(200).json(update)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - /edit/id "})
    }
})


// http://localhost:8080/employee/delete/id
// no POSTMAN chamar com DELETE

router.delete('/delete/:id',async (request, response) => {
    try { 
        const { id } = request.params
        const deleteEmployee = await EmployeeModel.findByIdAndDelete(id)
        return response.status(200).json(deleteEmployee)
    } catch (error) {
        console.log(error)
        return response.status(500).json({ msg: "Algo de errado não está certo - /delete/id "})
    }
})

export default router