/**
 * Author Name: Gurwinder Singh
 * Student number: 301176745
 * App Name: The favourite Booklist app
 * File Name: books.js
 */
let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);
