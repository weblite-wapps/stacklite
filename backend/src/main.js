// modules
const express = require('express')
const path = require('path')
const https = require('https')
const fs = require('fs')
const cors = require('cors')
// files
const answersRouter = require('./Router/answerRouter')
const questionsRouter = require('./Router/questionRouter')
const database = require('./database')

const app = express()
database.connect('stacklite_db')
app.use(cors({ origin: '*' }))
app.use('/', answersRouter.Router)
app.use('/', questionsRouter.Router)

const key = fs.readFileSync(path.resolve('./certs/express.key'), 'utf8')
const cert = fs.readFileSync(path.resolve('./certs/express.crt'), 'utf8')

https.createServer({ key, cert }, app).listen(3091)
