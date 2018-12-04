import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userModel = new Schema({
  username: { type: String, required: true, unique: true, lowercase: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  passwordConf: { type: String, required: true }
}, { timestamps: true })

userModel.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

export default mongoose.model('users', userModel)