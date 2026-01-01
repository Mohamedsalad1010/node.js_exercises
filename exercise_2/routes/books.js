const express = require('express')
const  router = express.Router()
const { getAllBooks, createBook, getBookInfo, updateBook, deleteBook} = require('../controllers/books')

// get all books

router.get('/', getAllBooks)
// create books
router.post('/' , createBook)
// get book info
router.get('/:id' , getBookInfo)
// update book
router.put('/:id', updateBook)
// delete book
router.delete('/:id', deleteBook)

module.exports = router