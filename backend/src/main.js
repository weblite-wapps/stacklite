// modules
const express = require('express')
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


app.listen(4160, () => console.log('Server Running!'))
