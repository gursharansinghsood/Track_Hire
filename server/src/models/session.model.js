import mongoose from "mongoose"

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    isLogin: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String,
    }
})

const Session = mongoose.model('session', sessionSchema)

export default Session