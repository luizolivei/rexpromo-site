import mongoose from "mongoose"
import { Order } from "~/types"

const schema = new mongoose.Schema<Order>({
    processed: Boolean,
    enderecoCliente: Object,
    whatsappCliente: String,
    nomeCliente: String,
    reqCode: String,
    cart: Object,
    process: Object,
}, { timestamps: true })

export default mongoose.model<Order>('history', schema)