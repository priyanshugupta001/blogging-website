import React, { useState } from "react";
import { IoReaderSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const MyBlogCard = ({
  title,
  summary,
  image,
  author,
  createdAt,
  content,
  id,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="hidden md:block">
        <div className="mx-auto md:h-[40vh] h-fit md:w-[45vw] w-[90vw]  bg-white rounded overflow-hidden shadow-lg md:flex ">
          <div className="flex items-center pl-3 w-1/3">
            <img
              className=" h-[32vh] object-cover rounded-md hidden md:block    "
              src={image}
              alt="Blog post"
            />
          </div>

          <div className="w-2/3 px-3 pt-5 flex flex-col gap-y-4">
            <div className="flex">
              <p className="font-bold text-base  mx-auto  flex text-center">
                "{title}"
              </p>

              <div className="relative ">
                <button
                  className="flex items-center justify-center   rounded-full  focus:outline-none"
                  onClick={toggleMenu}
                >
                  <svg
                    className={`w-6 h-6 text-gray-600 ${isOpen ? "" : ""}`}
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="6.5" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="12" cy="17.5" r="1.5" />
                  </svg>
                </button>

                <div
                  className={`absolute z-10 ${
                    isOpen ? "block" : "hidden"
                  }  origin-top-left right-0 w-24 bg-gray-200 hover:bg-red-500 rounded-md   ring-1 ring-black ring-opacity-5 transition ease-out duration-200 transform`}
                >
                  <div
                    className=""
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div className=" ">{onClick}</div>
                  </div>
                </div>
              </div>
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: content.substring(0, 200) + "...",
              }}
            />

            <div className="">
              <div className="flex justify-center w-full gap-x-3   ">
                <Link
                  to={`/home/${id}`}
                  className="flex items-center px-3 py-2  font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read More
                </Link>
                <Link
                  to={`/edit-post/${id}`}
                  className="flex items-center px-3 py-2  font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit Post
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block md:hidden">
        <div className="mx-auto md:h-[40vh] h-fit md:w-[45vw] w-[90vw]  bg-white rounded overflow-hidden shadow-lg flex flex-col justify-center items-center py-4">
          <div className=" px-3  flex flex-col gap-y-4">
            <p className="font-bold text-base  mx-auto  flex text-center">
              "{title}"
            </p>

            <div className="absolute right-4">
                <button
                  className="flex items-center justify-center   rounded-full  focus:outline-none"
                  onClick={toggleMenu}
                >
                  <svg
                    className={`w-6 h-6 text-gray-600 ${isOpen ? "" : ""}`}
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="6.5" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="12" cy="17.5" r="1.5" />
                  </svg>
                </button>

                <div
                  className={`absolute z-10 ${
                    isOpen ? "block" : "hidden"
                  }  origin-top-left right-0 w-24 bg-gray-200 hover:bg-red-500 rounded-md   ring-1 ring-black ring-opacity-5 transition ease-out duration-200 transform`}
                >
                  <div
                    className=""
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div className=" ">{onClick}</div>
                  </div>
                </div>
              </div>
            <Link
              to={`/home/${id}`}
              className="flex items-center  justify-center px-2"
            >
              <img
                className="  object-cover rounded-md    "
                src={image}
                alt="Blog post"
              />
            </Link>

            <div
              className="text-center px-3"
              dangerouslySetInnerHTML={{
                __html: content.substring(0, 200) + "...",
              }}
            />

            <div className="flex justify-center gap-x-14  items-center px-3  ">
            
              <Link
                to={`/home/${id}`}
                className=" px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
              </Link>
              <Link
                  to={`/edit-post/${id}`}
                  className=" px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit Post
                </Link>

              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBlogCard;
