/**
 * Author Name: Gurwinder Singh
 * Student number: 301176745
 * App Name: The favourite Booklist app
 * File Name: books.js
 */

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
const Book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  Book.find( (err, books) => {
    if (err) {
      console.error(err);
      res.end(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  const books = new Book();
  res.render('books/details', {
    title: 'Add Books',
    books: books
  })

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  let newBook = Book({
    _id: req.body.id,
    Title: req.body.title,
    Price: req.body.price,
    Description: req.body.description,
    Author: req.body.author,
    Genre: req.body.genre
  });

  //creates new entry
  Book.create(newBook, (err, book) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      console.log(book);
      res.redirect('/books');
    }
  });


});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {
  const id = req.params.id;
  Book.findOne({ _id: id }, (err, bookToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.render('books/details', {
        title: "Edit books",
        books: bookToEdit
      })
    }
  })
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {
  const id = req.params.id;
  const updatedBook = {
    Title: req.body.title,
    Description: req.body.description,
    Price: req.body.price,
    Genre: req.body.genre,
    Author: req.body.author,
  };
  Book.updateOne({ _id : id}, updatedBook, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('/books');
    }
  })

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;

  Book.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    else {
      // refresh the book list
      res.redirect('/books');
    }
  });
});


module.exports = router;
