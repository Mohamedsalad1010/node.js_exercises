
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const booksRouter = require('./routes/books')
const app = express()

app.use(express.json())
// port
const PORT = process.env.PORT || 1000
app.get('/', (req , res ) => {
    res.send('welcome back')
})

// get all books   and connect router book

app.use('/books', booksRouter)

// connect to monoose
console.log('MONGO_URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI )
  .then(()=> {console.log('✅connect locally mondb')})
  .catch((err) => {console.log('❌ no connected locally mongodb' , err.message)})



app.listen(PORT , () => {
    console.log(`server is running localhost:${PORT}`)
})