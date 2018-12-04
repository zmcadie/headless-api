import express from 'express'
import User from '../models/userModel'

const userRouter = express.Router()

userRouter.route('/')
  .post((req, res) => {
    let user = new User(req.body)
    user.save()
    res.status(201).send(user)
  })
  
export default userRouter