import express from 'express'
import Log from '../models/logModel'
const logRouter = express.Router()
logRouter.route('/')
  .post((req, res) => {
    let log = new Log(req.body)
    log.save()
    res.status(201).send(log)
  })
logRouter.use('/:id', (req, res, next)=>{
  Log.findById( req.params.id, (err, log)=>{
      if(err)
          res.status(500).send(err)
      else {
          req.log = log
          next()
      }
  })
})
logRouter.route('/:id')
  .get((req,res) => res.json(req.log))
  .put((req,res) => {
    req.log.logItems = req.body.logItems
    req.log.save()
    res.json(req.log)
  })
  .delete((req,res)=>{
    req.log.remove(err => {
      if(err){
        res.status(500).send(err)
      } else {
        res.status(204).send('removed')
      }
    })
  })
export default logRouter