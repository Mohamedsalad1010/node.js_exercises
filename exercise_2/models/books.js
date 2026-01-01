const monoose = require('mongoose')

const booksSchema = new monoose.Schema({
    title :{ type: String, required: true},
    author: {type: String , required: true},
    publishedYear:  Number ,               
  genre: String 
})

module.exports = monoose.model("Books" , booksSchema)