import { model, Schema } from "mongoose";

const  employeeSchema = new Schema(
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
        }
    },
    {
        timestamps: true,
    }
)

//                          *** tem que ser no singular
const EmployeeModel = model("Employee", employeeSchema)
//    quando rodar e fizer a conexão
//    lá na collections, vai virar plural "Employees"

export default EmployeeModel