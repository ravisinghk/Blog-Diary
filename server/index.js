import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'

import Connection from './database/db.js';
import Router from './routes/routes.js'

const app = express();
dotenv.config();

app.use(cors())
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use('', Router)

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is Running on PORT: ${PORT}`)
})

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

Connection(username, password)