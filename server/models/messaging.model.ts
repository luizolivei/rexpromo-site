import mongoose from "mongoose"
import {Messaging} from "~/types"

const schema = new mongoose.Schema<Messaging>({
    whatsapp: String,
    message: String
}, { timestamps: true })

export default mongoose.model<Messaging>('messaging', schema)