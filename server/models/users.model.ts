import mongoose from "mongoose"
import { Users } from "~/types"

const schema = new mongoose.Schema<Users>({
    username: String,
    password: String,
}, { timestamps: true })

export default mongoose.model<Users>('users', schema)