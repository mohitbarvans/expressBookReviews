const express = require('express');
const axios = require('axios');

let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Unable to register user." });
  }

  if (!isValid(username)) {
    return res.status(404).json({ message: "User already exists!" });
  }

  users.push({
    username: username,
    password: password
  });

  return res.status(200).json({
    message: "User successfully registered. Now you can login."
  });

});


// Task 1
public_users.get('/', function (req, res) {
  return res.status(200).send(JSON.stringify(books, null, 4));
});


// Task 2
public_users.get('/isbn/:isbn', function (req, res) {

  const isbn = req.params.isbn;

  return res.status(200).json(books[isbn]);

});


// Task 3
public_users.get('/author/:author', function (req, res) {

  const author = req.params.author;

  const bookKeys = Object.keys(books);

  const filteredBooks = bookKeys
    .filter(key => books[key].author === author)
    .map(key => books[key]);

  return res.status(200).json(filteredBooks);

});


// Task 4
public_users.get('/title/:title', function (req, res) {

  const title = req.params.title;

  const bookKeys = Object.keys(books);

  const filteredBooks = bookKeys
    .filter(key => books[key].title === title)
    .map(key => books[key]);

  return res.status(200).json(filteredBooks);

});


// Task 5
public_users.get('/review/:isbn', function (req, res) {

  const isbn = req.params.isbn;

  return res.status(200).json(books[isbn].reviews);

});


/*==========================
    TASKS 10-13
===========================*/


// Get all books using Promise
public_users.get('/async/books', function (req, res) {

  const promise = new Promise((resolve) => {
    resolve(books);
  });

  promise.then((data) => {
    return res.status(200).json(data);
  });

});


// Get book by ISBN using Promise
public_users.get('/async/isbn/:isbn', function (req, res) {

  const isbn = req.params.isbn;

  const promise = new Promise((resolve) => {
    resolve(books[isbn]);
  });

  promise.then((data) => {
    return res.status(200).json(data);
  });

});


// Get books by Author using Async/Await
public_users.get('/async/author/:author', async function (req, res) {

  const author = req.params.author;

  const result = Object.keys(books)
    .filter(key => books[key].author === author)
    .map(key => books[key]);

  return res.status(200).json(result);

});


// Get books by Title using Async/Await
public_users.get('/async/title/:title', async function (req, res) {

  const title = req.params.title;

  const result = Object.keys(books)
    .filter(key => books[key].title === title)
    .map(key => books[key]);

  return res.status(200).json(result);

});


module.exports.general = public_users;