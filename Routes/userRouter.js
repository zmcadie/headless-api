import express from 'express'
import User from '../models/userModel'
import bcrypt from 'bcrypt'

const userRouter = express.Router()

userRouter.route('/')
  .post((req, res) => {
    let user = new User(req.body)
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        res.status(500).send(err)
        return
      }
      user.password = hash
      user.save((e, product) => {
        res.status(e ? 400 : 201)
        .send(product ? { _id: product._id, username: product.username, email: product.email } : e)
      })
    })
  })
userRouter.route('/login')
  .post((req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
      bcrypt.compare(req.body.password, user.password, (e, r) => {
        res.status(r ? 200 : 403).send(e ? e : r)
      })
    })
  })

export default userRouter