import mongoose, { mongo } from 'mongoose'


const otpSchema = new mongoose.Schema({
    email: { type: String, trim: true, lowercase: true },
    otp: { type: String, trim: true },
    createdAt: {type: Date, default: Date.now, expires: "5m"}
})

const Otp = mongoose.model('otp', otpSchema)

export default Otp