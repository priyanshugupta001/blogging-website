import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { server } from "..";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { format, formatISO9075 } from "date-fns";
import PostCard from "../components/PostCard";
import { IoAddOutline } from "react-icons/io5";
import extractToken from "../utils/GetToken";
import { ToastContainer, toast } from "react-toastify";

const Main = () => {
  const [post, setPost] = useState("");
  const [refresh, setrefresh] = useState(false);
  const naviGate = useNavigate();
  useEffect(() => {
    try {
      if (extractToken()) {
        axios(`${server}/readpost`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${extractToken()}`,
          },
        })
          .then((res) => {
            setPost(res.data);
            
          })
          .catch((err) => {
            toast.error(err?.message, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: false,
              progress: false,
              theme: "light",
            });
          });
      }  
    } catch (error) {
      console.log(error);
    }
    
  }, []);

  const plus = () => {
    naviGate("/create");
  };
  return (
    <>
      <div className="bg-[#F8F8F8] min-h-screen h-fit">
        <Navbar />
        <div className="md:grid md:grid-cols-2 ">
          {post.length > 0 &&
            post.map((value, index) => {
              return (
                <div
                  key={index}
                  className="p-5 flex items-center justify-center "
                >
                  <PostCard
                    title={value?.title}
                    summary={value?.summary}
                    content={value?.content}
                    createdAt={format(
                      new Date(value?.createdAt),
                      "d MMM, yyyy h:mm"
                    )}
                    image={value?.image}
                    id={value?._id}
                    author={value?.userId}
                  />
                  {/* <div className="border-2">
						<h1 className="font-bold">{value?.title}</h1>
						<p>{value?.summary}</p>
						<div dangerouslySetInnerHTML={{__html:value?.content.substring(0, 500)+"..."}}/>
						<div className="flex gap-x-10">
            <img src={value?.image} alt="" />
            <p>{format(new Date (value?.createdAt), 'd MMM, yyyy h:mm')}</p> <p> {value?.author}</p>
            </div>
            <Link to={`/home/${value?._id}`} className=" font-semibold text-lg duration-100 border hover:bg-blue-600 px-3 py-1.5 rounded-lg">Click Here</Link>
          </div> */}
                </div>
              );
            })}
        </div>
        <div className="flex justify-center items-center ">
          <button
            className=" text-6xl hover:text-yellow-500 duration-200 shadow drop-shadow-lg  fixed bottom-2 bg-black text-white bg-opacity-60 rounded-full md:hidden block"
            onClick={plus}
          >
            <IoAddOutline />
          </button>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
};

export default Main;
