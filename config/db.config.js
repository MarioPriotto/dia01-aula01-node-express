
import mongoose from "mongoose"

async function connect() {

    try {
        const dbConnect = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`BD MongoDB - Conectado: ${dbConnect.connection.name}`)
    } catch (error) {
        console.log(error)
    }

}

export default connect

