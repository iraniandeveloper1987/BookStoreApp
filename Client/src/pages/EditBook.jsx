import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";
import * as Yup from "yup";

const initialValues = {
  title: "",
  author: "",
  publishYear: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  publishYear: Yup.string().required("Publisher is required"),
});
const EditBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // Use useParams directly within the component
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5555/books/${id}`).then((response) => {
      console.log("response is ", response.data.book);
      setBook(response.data.book);
      console.log("state of value is ", book);
      initialValues.title = response.data.book.title;
      initialValues.author = response.data.book.author;
      initialValues.publishYear = response.data.book.publishYear;
      console.log("initial values is ", initialValues);

      setLoading(false);
    });
  }, []);
  const handleSubmit = (values) => {
    console.log("values is  ", values);
    // Handle form submission
    setLoading(true);
    axios
      .post("http://localhost:5555/books", values)
      .then((response) => {
        console.log(response.data);
        setBook(response.data);
        setLoading(false);
        console.log(response.data.message);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Book</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Title
            </label>
            <Field
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter title"
            />
            <ErrorMessage
              name="title"
              component="p"
              className="text-red-500 mt-1"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-gray-700 font-bold mb-2"
            >
              Author
            </label>
            <Field
              type="text"
              id="author"
              name="author"
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter author"
            />
            <ErrorMessage
              name="author"
              component="p"
              className="text-red-500 mt-1"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="publishYear"
              className="block text-gray-700 font-bold mb-2"
            >
              Publish Year
            </label>
            <Field
              type="text"
              id="publishYear"
              name="publishYear"
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter publisher"
            />
            <ErrorMessage
              name="publishYear"
              component="p"
              className="text-red-500 mt-1"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Edit Book
          </button>
        </Form>
      </Formik>
      <div className="mt-4 text-xl">
        <BackButton />
      </div>
    </div>
  );
};

export default EditBook;
