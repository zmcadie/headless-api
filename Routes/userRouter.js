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
        if (product) {
          const { _id, username, email } = product
          req.session.user = { _id, username, email }
          res.status(201).send({ _id, username, email })
        } else {
          res.status(400).send(e ? e : "")
        }
      })
    })
  })
  .get((req, res) => {
    let user = req.session.user
    if (user) {
      User.findById(user._id, (e, r) => {
        const { _id, username, email } = r
        res.status(r ? 200 : 400).send(e ? e : r ? { _id, username, email } : "whoops, something went wrong")
      })
    } else {
      res.status(400).send("no user")
    }
  })
  .delete((req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
      bcrypt.compare(req.body.password, user.password, (e, r) => {
        if (r) {
          user.remove((e, p) => {
            res.status(e ? 400 : 200).send(e ? "error deleting user" : "user deleted")
          })
        } else {
          res.status(400).send("could not delete user")
        }
      })
    })
  })
userRouter.route('/login')
  .post((req, res) => {
    User.findOne({ username: req.body.username }, (err, user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (e, r) => {
          const { _id, username, email } = user
          if (r) {
            req.session.user = { _id, username, email }
            res.status(200).send(JSON.stringify({ _id, username, email }))
          } else {
            res.status(403).send(e ? e : "not authorized")
          }
        })
      } else {
        res.status(400).send(err ? err : "no user")
      }
    })
  })
userRouter.route('/logout')
  .get((req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          res.status(400).send(err)
        } else {
          res.clearCookie('connect.sid')
          res.status(200).send()
        }
      })
    } else {
      res.status(200).send()
    }
  })
userRouter.route('/password/:id')
  .put((req, res) => {
    if (req.session.user) {
      const id = req.session.user._id
      if (id === req.params.id) {
        const { oldPass, newPass } = req.body
        User.findById(id, (err, user) => {
          if (err) {
            res.status(400).send(err)
          } else if (user) {
            bcrypt.compare(oldPass, user.password, (e, r) => {
              if (r) {
                bcrypt.hash(newPass, 10, (err, hash) => {
                  if (err) {
                    res.status(500).send(err)
                    return
                  }
                  user.password = hash
                  user.save((e, product) => {
                    if (product) {
                      const { _id, username, email } = product
                      req.session.user = { _id, username, email }
                      res.status(201).send({ _id, username, email })
                    } else {
                      res.status(400).send(e ? e : "User save failed")
                    }
                  })
                })
              } else {
                res.status(403).send(e ? e : "not authorized")
              }
            })
          } else {
            res.status(400).send("No user found")
          }
        })
      } else {
        res.status(400).send("Not authorized to update user")
      }
    } else {
      res.status(400).send("User not logged in")
    }
  })
userRouter.route('/:id')
  .put((req, res) => {
    if (req.session.user) {
      const id = req.session.user._id
      if (id === req.params.id) {
        delete req.body.password
        User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }, (err, user) => {
          if (err) {
            res.status(400).send(err)
          } else if (user) {
            const { _id, username, email } = user
            req.session.user = { _id, username, email }
            res.status(200).send({ _id, username, email })
          } else {
            res.status(400).send("No user found")
          }
        })
      } else {
        res.status(400).send("Not authorized to update user")
      }
    } else {
      res.status(400).send("User not logged in")
    }
  })

export default userRouter
