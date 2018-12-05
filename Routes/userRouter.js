import express from 'express'
import User from '../models/userModel'

const userRouter = express.Router()

userRouter.route('/')
  .post((req, res) => {
    let user = new User(req.body)
    user.save((err, product) => {
      res.status(err ? "400" : "201")
      .send(product ? { _id: product._id, username: product.username, email: product.email } : err)
    })
  })
  
export default userRouter