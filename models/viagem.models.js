import { model, Schema } from "mongoose";

const  viagemSchema = new Schema(
    {
        descricao: {
            type: String,
            required: true
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
const ViagemModel = model("Viagem", viagemSchema)
//    quando rodar e fizer a conexão
//    lá na collections, vai virar plural "Viagems"

export default ViagemModel