const express = require("express");
const router = express.Router();

const books = require("../util/data");
/**
 * @swagger
 * components:
 *  schemas:
 *    Book:
 *      type: object
 *      required:
 *        - title
 *        - author
 *        - finished
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the book.
 *        title:
 *          type: string
 *          description: The title of your book.
 *        author:
 *          type: string
 *          description: Who wrote the book?
 *        finished:
 *          type: boolean
 *          description: Have you finished reading it?
 *        createdAt:
 *          type: string
 *          format: date
 *          description: The date of the record creation.
 *      example:
 *          title: The Pragmatic Programmer
 *          author: Andy Hunt / Dave Thomas
 *          finished: true
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: List all the books
 *     tags: [Books API]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Return List of all books
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */

router.get("/", function (req, res) {
	res.status(200).json(books);
});

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by id
 *     tags: [Books API]
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         description: Book Id
 *         name: id
 *         required: true
 *         schema:
 *          type: integer 
 *     responses:
 *       200:
 *         description: The list of books.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: OOPS!!! Book Not Exist.
 */

router.get("/:id", function (req, res) {
	let book = books.find(function (item) {
		return item.id == req.params.id;
	});

	book ? res.status(200).json(book) : res.sendStatus(404);
});

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books API]
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book Added Successfully!.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */

router.post("/", function (req, res) {
	const { title, author, finished } = req.body;

	let book = {
		id: books.length + 1,
		title: title,
		author: author,
		finished: finished !== undefined ? finished : false,
		createdAt: new Date(),
	};

	books.push(book);

	res.status(201).json(book);
});

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Updates a book by book Id
 *     tags: [Books API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The book id
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book Updated Successfully.
 *       404:
 *         description: Book Not Found.
 */

router.put("/:id", function (req, res) {
	let book = books.find(function (item) {
		return item.id == req.params.id;
	});

	if (book) {
		const { title, author, finished } = req.body;

		let updated = {
			id: book.id,
			title: title !== undefined ? title : book.title,
			author: author !== undefined ? author : book.author,
			finished: finished !== undefined ? finished : book.finished,
			createdAt: book.createdAt,
		};

		books.splice(books.indexOf(book), 1, updated);

		res.sendStatus(204);
	} else {
		res.sendStatus(404);
	}
});

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Deletes a book by id
 *     tags: [Books API]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: Book Deleted Successfully.
 *       404:
 *         description: Book Not Found.
 */

router.delete("/:id", function (req, res) {
	let book = books.find(function (item) {
		return item.id == req.params.id;
	});

	if (book) {
		books.splice(books.indexOf(book), 1);
	} else {
		return res.sendStatus(404);
	}

	res.sendStatus(204);
});

module.exports = router;
