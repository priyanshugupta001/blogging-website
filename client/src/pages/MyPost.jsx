import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "..";
import extractToken from "../utils/GetToken";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import { format } from "date-fns";
import { IoAddOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { AiTwotoneDelete } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import MyBlogCard from "../components/MyBlogCard";
const MyPost = () => {
  const [myPost, setMyPost] = useState("");
  const [deleteMyPost, setDeleteMyPost] = useState("");
  const naviGate = useNavigate();
  useEffect(() => {
    if (extractToken()) {
      axios(`${server}/myBlog`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${extractToken()}`,
        },
      })
        .then((res) => {
          setMyPost(res?.data);
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
  }, []);

  const plus = () => {
    naviGate("/create");
  };

  const deletePost = (_id) => {
    try {
      if (_id && extractToken()) {
        axios
          .delete(`${server}/myBlog/${_id}`, {
            headers: {
              Authorization: `Bearer ${extractToken()}`,
            },
          })
          .then((res) => {
            
            setDeleteMyPost(res.data);
            toast.success("Blog Deleted Successfully", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: false,
              draggable: false,
              progress: false,
              theme: "light",
            });
            window.location.reload();
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
  };

  //   const deletePost = async (_id) =>{
  //     try {
  //       axios(`${server}/myBlog/${_id}`,
  //       {
  //         method:"DELETE",
  //         headers: {
  //           Authorization: `Bearer ${extractToken()}`,
  //         },
  //       },
  //       {
  //         withCredentials: true,
  //       }

  //       ).then((res)=>{
  // console.log(res.data);
  //       })
  //       .catch((err)=>{
  //         console.log(err);
  //       })
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  return (
    <>
      <div className="bg-[#F8F8F8] min-h-screen h-fit">
        <Navbar />
        <div className="md:grid md:grid-cols-2 ">
          {myPost.length > 0 &&
            myPost.map((value, index) => {
              return (
                <div
                  key={index}
                  className="p-5 flex items-center justify-center"
                >
                  <MyBlogCard
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
                    onClick={
                      <button
                        className="px-3 py-2 bg-gray-200 hover:bg-red-500 flex items-center gap-x-2 hover:text-white duration-200 rounded-md text-sm "
                        onClick={() => {
                          deletePost(value?._id);
                        }}
                      >
                        Delete Post
                      </button>
                    }
                  />
                </div>
              );
            })}

          {myPost?.length == 0 && (
            <div className="w-full h-[100%]">
              <div className="flex justify-center items-center text-2xl font-semibold">
                No Data Available
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center items-center ">
          <button
            className=" text-6xl hover:text-yellow-500 duration-200 shadow drop-shadow-lg  fixed bottom-2 bg-black text-white bg-opacity-60 rounded-full md:hidden block"
            onClick={plus}
          >
            <IoAddOutline />
          </button>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default MyPost;
