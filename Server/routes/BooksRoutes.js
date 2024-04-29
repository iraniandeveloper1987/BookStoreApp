import express from "express";
import Book from "../models/bookModel.js";

const router = express.Router();

// Book Routes

//Route to add new book
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const savedBook = await Book.create(newBook);
    console.log(savedBook);
    res
      .status(201)
      .json({ book: savedBook, message: "Book added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Route for get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      count: books.length,
      books,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Route for get single book
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Rout for update book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ book, message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Route for delete book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    res.status(200).json({ book, message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
