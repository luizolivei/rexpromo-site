import mongoose from "mongoose"
import { Profile } from "~/types"

const schema = new mongoose.Schema<Profile>({
    name: String,
    whats: String,
    endereco: Object
}, { timestamps: true })

export default mongoose.model<Profile>('profiles', schema)