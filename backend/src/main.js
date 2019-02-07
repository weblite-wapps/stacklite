// modules
const express = require('express')
const path = require('path')
const https = require('https')
const fs = require('fs')
const cors = require('cors')
// files
const answerRouter = require('./Router/answerRouter')
const questionRouter = require('./Router/questionRouter')
const userRouter = require('./Router/userRouter')
const database = require('./database')

const app = express()
database.connect('stacklite_db')
app.use(cors({ origin: '*' }))
app.use('/', answerRouter.Router)
app.use('/', questionRouter.Router)
app.use('/', userRouter.Router)

const key = fs.readFileSync(path.resolve('./certs/express.key'), 'utf8')
const cert = fs.readFileSync(path.resolve('./certs/express.crt'), 'utf8')

https.createServer({ key, cert }, app).listen(3091)
