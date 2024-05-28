import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const ShowBook = () => {
  const [singleBook, setSingleBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

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
      <div className="p-4 w-100 bg-purple-800 text-center text-white rounded-2xl w-1/2">
        <h1 className="text-6xl font-bold my-8">Show book's details</h1>

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

        <BackButton />
      </div>
    </div>
  );
};

export default ShowBook;
