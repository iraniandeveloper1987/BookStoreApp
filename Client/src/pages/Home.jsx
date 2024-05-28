import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import Spinner from "../components/Spinner";

const Home = () => {
  const [listBook, setListBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setListBooks(response.data);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, {});
  return (
    <div className="p-4">
      <div className="flex justify-between  items-center">
        <h1 className="text-3xl font-bold my-8">Books List</h1>
        <Link to="/books/create">
          {<MdOutlineAddBox className="text-6xl text-green-800" />}
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2 ">
          <thead className="bg-blue-950 text-white px-3 text-2xl">
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Author
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Publish Year
              </th>
              <th className="border border-slate-600 rounded-md">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listBook.books &&
              listBook.books.map((book) => (
                <tr key={book._id} className="h-8">
                  <td className="border border-slate-600 rounded-md text-center text-2xl">
                    {/* Assuming you want to display the index of the book */}
                    {listBook.books.indexOf(book) + 1}
                  </td>
                  <td className="border border-slate-600 rounded-md text-center text-2xl">
                    {book.title}
                  </td>
                  <td className="border border-slate-600 rounded-md max-md:hidden text-center text-2xl">
                    {book.author}
                  </td>
                  <td className="border border-slate-600 rounded-md max-md:hidden text-center text-2xl">
                    {book.publishYear}
                  </td>
                  <td className="border border-slate-600 rounded-md text-center flex justify-around align-items-center ">
                    <Link to={`/books/detail/${book._id}`}>
                      {<BsInfoCircle className="text-4xl text-green-800" />}
                    </Link>

                    <Link to={`/books/edit/${book._id}`}>
                      {<AiOutlineEdit className="text-4xl text-yellow-600" />}
                    </Link>

                    <Link to={`/books/delete/${book._id}`}>
                      {<MdOutlineDelete className="text-4xl text-red-600" />}
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
