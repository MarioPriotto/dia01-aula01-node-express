import { model, Schema } from "mongoose";

const  setorSchema = new Schema(
    {
        descricao: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            default: true
        },
        funcionarios: [
            {
                type: Schema.Types.ObjectId, 
                ref: "Funcionario"
            }
        ],
    },
    {
        timestamps: true,
    }
)

//                          *** tem que ser no singular
const SetorModel = model("Setor", setorSchema)
//    quando rodar e fizer a conexão
//    lá na collections, vai virar plural "Employees"

export default SetorModel