import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const DeleteBook = () => {
  const [singleBook, setSingleBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        console.log("response is ", response.data);
        setSingleBook(response.data.book);
        console.log("state of value is ", singleBook);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="h-screen flex justify-center items-center w-screen">
      <div className="p-4 w-100 bg-gray-700 text-center text-white rounded-2xl w-1/2">
        <h1 className="text-6xl font-bold my-8">Delete Book</h1>

        {loading ? (
          <Spinner />
        ) : (
          <div className="text-center text-3xl">
            {singleBook && (
              <h2 className="p-3">
                The book is <span className="text-2xl">{singleBook.title}</span>
              </h2>
            )}
            {singleBook.author && (
              <p className="p-3">
                The author is
                <span className="text-2xl"> {singleBook.author}</span>
              </p>
            )}
            {singleBook.year && (
              <p className="p-3">
                The year is <span className="text-2xl"></span> {singleBook.year}
              </p>
            )}
            {singleBook.createdAt && (
              <p className="p-3">
                The data was created on
                <span className="text-2xl"> {singleBook.createdAt}</span>
              </p>
            )}
          </div>
        )}
        <div className="flex justify-center align-center ">
          <div className="p-3 block">
            Are you sure you want to delete this book?
          </div>
          <button
            className="block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              axios
                .delete(`http://localhost:5555/books/${id}`)
                .then((response) => {
                  console.log(response.data);
                  setLoading(false);
                  navigate("/");
                })
                .catch((error) => {
                  console.log(error);
                  setLoading(false);
                });
            }}
          >
            Delete
          </button>
        </div>

        <BackButton />
      </div>
    </div>
  );
};

export default DeleteBook;
