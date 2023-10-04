import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  Heading,
  Button,
  Box,
  StackDivider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
const PostCard = ({
  title,
  summary,
  image,
  author,
  createdAt,
  content,
  id,
}) => {
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
            <p className="font-bold text-base  mx-auto  flex text-center">
              "{title}"
            </p>

            <div
              dangerouslySetInnerHTML={{
                __html: content.substring(0, 200) + "...",
              }}
            />
            <div className="">
              <div className="flex justify-center w-full gap-x-3   ">

          
                <div className="inline-block bg-gray-200 rounded-lg gap-x-2 px-3 py-1  font-light text-gray-700 ">
                  Posted by {author?.username}
                </div>
                <Link
                  to={`/home/${id}`}
                  className="inline-flex  px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
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

            <div className="flex justify-between  items-center px-3  ">
              <div className=" bg-gray-200 rounded-lg  px-3 py-2  font-medium text-gray-700 ">
                Posted by {author?.username}
              </div>
              <Link
                to={`/home/${id}`}
                className=" px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
