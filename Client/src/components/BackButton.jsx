import React from "react";
import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const BackButton = ({ destination = "/" }) => {
  return (
    <div className="flex">
      <Link
        to={destination}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-fit"
      >
        {<BsArrowLeft className="text-3xl" />}
      </Link>
    </div>
  );
};

export default BackButton;
