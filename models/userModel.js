import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userModel = new Schema({
  username: { type: String, required: [true, "Cannot be blank"], unique: true, lowercase: true, trim: true },
  email: { type: String, required: [true, "Cannot be blank"], unique: true, lowercase: true, trim: true },
  password: { type: String, required: [true, "Cannot be blank"] }
}, { timestamps: true })

export default mongoose.model('users', userModel)