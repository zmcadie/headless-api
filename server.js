import express from 'express'
import logRouter from './Routes/logRouter'
import characterRouter from './Routes/characterRouter'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'

require('dotenv').config()

const db = mongoose.connect(process.env.DB_URL);
const app = express()
const port = process.env.PORT || 5656

app.use(cors())

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

app.get('/', (req, res) => res.json({content: "root"}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/logs', logRouter)
app.use('/api/characters', characterRouter)