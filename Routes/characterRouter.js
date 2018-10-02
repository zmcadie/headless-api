import express from 'express'
import Character from '../models/characterModel'
const characterRouter = express.Router()
characterRouter.route('/')
  .get((req, res) => {
    Character.find({}, (err, characters) => {
      res.json(characters.map(c => { return { id: c._id, name: c.base.name } }))
    }) 
  })
  .post((req, res) => {
    let character = new Character(req.body)
    character.save()
    res.status(201).send(character)
  })
characterRouter.route('/:id')
  .get((req,res) => {
    Character.findById( req.params.id, (err, character)=>{
      if(err)
        res.status(500).send(err)
      else {
        res.json(character)
      }
    })
  })
  .put((req,res) => {
    Character.findByIdAndUpdate( req.params.id, req.body.character, {new: true}, (err, character)=>{
      if(err)
        res.status(500).send(err)
      else {
        res.json(character)
      }
    })
  })
  .delete((req,res)=>{
    Character.findByIdAndDelete(req.params.id, err => {
      if(err){
        res.status(500).send(err)
      } else {
        res.status(204).send('deleted')
      }
    })
  })
export default characterRouter