import mongoose from "mongoose";
import * as generate from "../../../helpers/genrate.helper"
const userSchema = new mongoose.Schema(
    {
        fullName: String,
        email: String,
        password: String,
        tokenUser: {
            type: String,
            default: generate.generateString(30)
        },
        deleted: {
            type: Boolean,
            default: false
        },
        deleteAt: Date,
    }, { timestamps: true }
)

const User = mongoose.model('user', userSchema, 'users')

export default User