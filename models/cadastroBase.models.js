import { model, Schema } from "mongoose";

const  cadastroBaseSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
            lowercase: true
        },
        role: {
            type: String,
            enum: [
                    "Gerente", 
                    "Estagiário", 
                    "Técnico", 
                    "Vendedor"
            ]
        },
        age: {
            type: Number,
        },
        active: {
            type: Boolean,
            default: true
        },
        address: {
            city: { type: String },
            estado: { type: String }
        },
        status: {
            type: String,
            enum: [
                    "Aberto", 
                    "Fechado", 
            ]
        },
        setor: {
            type: String,
        },
        comments: [String],
    },
    {
        timestamps: true,
    }
)

//                          *** tem que ser no singular
const cadastroModel = model("Base", cadastroBaseSchema)
//    quando rodar e fizer a conexão
//    lá na collections, vai virar plural "Employees"

export default cadastroModel