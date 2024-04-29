import express from "express";
import { PORT, DB_CONNECTION_STRING } from "./config.js";
import mongoose from "mongoose";
import BookRouter from "./routes/BooksRoutes.js";
import cors from "cors";

const app = express();

//middleware to  parse json
app.use(express.json());

//middleware for cors
//option 1- Allow all origins with default of cors(*)
// app.use(cors());

//option 2  - Allow specific origins
app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: "Content-Type",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
mongoose
  .connect(DB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//Routes to Books
app.use("/books", BookRouter);
