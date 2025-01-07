import mongoose from "mongoose"
import { Categorias } from "~/types"

const schema = new mongoose.Schema<Categorias>({
    nome: String,
    _id: String,
    ordem: Number,
    ativo: Boolean,
}, { timestamps: true })

export default mongoose.model<Categorias>('categorias', schema)