let mongoose = require('mongoose');
let Book = require('../models/book');

/*
GET /book route to retrieve all books
 */
function getBooks(req, res) {
	// Query DB. If no errors, send all books
	let query = Book.find({});
	query.exec((err, books) => {
		if (err) res.send(err);
		// if no errors, send books back to client
		res.json(books);
	});
}

/*
POST /book to save new book
 */
function postBook(req, res) {
	// Creates new book
	var newBook = new Book(req.body);
	// Save it to DB
	newBook.save((err, book) => {
		if (err) {
			res.send(err);
		}
		else { // If no errors, send book back to client
			res.json({ message: "Book successfully added!", book });
		}
	});
}

/*
GET /book/:id route to retrieve a book given its id
 */
function getBook(req, res) {
	Book.findById(req.params.id, (err, book) => {
		if (err) res.send(err);
		// If no errors, send book back to client
		res.json(book);
	});
}

/*
DELETE /book/:id to delete a book given its id
 */
function deleteBook(req, res) {
	Book.remove({_id: req.params.id}, (err, result) => {
		res.json({ message: "Book successfully deleted!", result });
	});
}

/*
PUT /book/:id to update a book given its id
 */
function updateBook(req, res) {
	Book.findById({_id: req.params.id}, (err, book) => {
		if (err) res.send(err);
		Object.assign(book, req.body).save((err, book) => {
			if (err) res.send(err);
			res.json({ message: 'Book updated!', book });
		});
	});
}

// export all functions
module.exports = { getBooks, postBook, getBook, deleteBook, updateBook };