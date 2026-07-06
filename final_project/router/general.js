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

// Task 10 - Get the book list available in the shop using Async/Await & Axios
public_users.get('/', async function (req, res) {

  try {
    const response = await axios.get("http://localhost:5000/");
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json(err);
  }

});

// Task 11 - Get book details based on ISBN using Async/Await & Axios
public_users.get('/isbn/:isbn', async function (req, res) {

  try {
    const isbn = req.params.isbn;

    const response = await axios.get(
      `http://localhost:5000/isbn/${isbn}`
    );

    return res.status(200).json(response.data);

  } catch (err) {
    return res.status(500).json(err);
  }

});

// Task 12 - Get book details based on author using Async/Await & Axios
public_users.get('/author/:author', async function (req, res) {

  try {

    const author = req.params.author;

    const response = await axios.get(
      `http://localhost:5000/author/${author}`
    );

    return res.status(200).json(response.data);

  } catch (err) {
    return res.status(500).json(err);
  }

});

// Task 13 - Get all books based on title using Async/Await & Axios
public_users.get('/title/:title', async function (req, res) {

  try {

    const title = req.params.title;

    const response = await axios.get(
      `http://localhost:5000/title/${title}`
    );

    return res.status(200).json(response.data);

  } catch (err) {
    return res.status(500).json(err);
  }

});

// Get book review
public_users.get('/review/:isbn', function (req, res) {

  const isbn = req.params.isbn;

  return res.status(200).json(books[isbn].reviews);

});

module.exports.general = public_users;