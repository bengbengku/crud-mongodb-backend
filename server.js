const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const logger = require('morgan')
const path = require('path')
const productRouter = require('./app/product/routes')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use('/api/v1', productRouter)

app.use((req, res, next) => {
  res.status(404)
  res.send({
    status: 404,
    message: `Resource ${req.originalUrl} not found`,
  })
})

//database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.log('Error connecting to database', err))

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
