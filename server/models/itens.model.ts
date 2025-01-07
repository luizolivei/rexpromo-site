import mongoose from "mongoose"
import { Itens } from "~/types"

const schema = new mongoose.Schema<Itens>({
    nome: String,
    nome_url: String,
    descricao: String,
    valor: Number,
    preco_por_quilo: Boolean,
    galeria: Array,
    ativo: Boolean,
    agrupador: String, //_id
    _id: String,
}, { timestamps: true })

export default mongoose.model<Itens>('itens', schema)