import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { data } from "autoprefixer";
import { server } from "..";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { UserAuth } from "../context/Dataprovider";
import Input from "../components/Input";
// import extractToken from "../utils/GetToken";
import Spinner from "../components/Spinner";
import extractToken from "../utils/GetToken";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],

    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
];
const EditPost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const { account, setAccount } = UserAuth();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && extractToken())
      axios(`${server}/readpost/${id}`, {
        method: "GET",
      }).then((res) => {
        // console.log(res.data);
        setTitle(res?.data?.title);
        setSummary(res?.data?.summary);
        setImage(res?.data?.image);
        setContent(res?.data?.content);
      });
  }, [id]);
  //   const handleCreatePost = (e) => {
  //     e.preventDefault();
  //     setLoading(true)
  //     const data = new FormData();
  //     data.set("title", title);
  //     data.set("summary", summary);
  //     data.set("content", content);

  //     console.log(account);
  //     if (account && extractToken())   {
  //       axios(`${server}/createpost`, {
  //         method: "POST",
  //         data: {
  //           title,
  //           summary,
  //           content,
  //           image,
  //         },
  //         headers:{
  //           Authorization: `Bearer ${extractToken()}`
  //         }
  //       })
  //         .then((res) => {
  //           alert(res.data.message);
  //           return navigate("/home");
  //         })
  //         .catch((e) => {
  //           console.log(e);
  //           alert("not done");
  //         });
  //     } else {
  //       alert("something went wrong!");
  //     }
  //   };

  const handleUpdatePost = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    console.log(account);
    if (account && extractToken()) {
      axios(`${server}/createpost`, {
        method: "PATCH",
        data: {
          title,
          summary,
          content,
          image,
          id,
        },
        headers: {
          Authorization: `Bearer ${extractToken()}`,
        },
      })
        .then((res) => {
          alert(res.data.message);
          return navigate("/home");
        })
        .catch((e) => {
alert(e?.message)
          
        });
    } else {
      alert("something went wrong!");
    }
  };
  return (
    <>
      <div className="bg-[#F8F8F8] pb-4 min-h-screen h-auto">
        <Navbar />
        <form
          action=""
          onSubmit={handleUpdatePost}
          className="flex flex-col items-center"
        >
          <div className="p-4">
            <Input
              type={"title"}
              placeholder={"Enter the title of blog"}
              value={title}
              className={"w-[95vw] bg-white"}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            <Input
              type={"summary"}
              placeholder={"Enter the summary of blog"}
              value={summary}
              className={"w-[95vw] bg-white"}
              onChange={(e) => {
                setSummary(e.target.value);
              }}
            />
            <Input
              type={"url"}
              className={"w-[95vw] bg-white"}
              placeholder="Enter the url of the Image, please add only those url which has an extension like jpg, png and jpeg"
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
              }}
            />
          </div>

          <div className="flex justify-center items-center ">
            <div className=" w-fit bg-white rounded overflow-hidden shadow-lg">
              <ReactQuill
                value={content}
                modules={modules}
                formats={formats}
                onChange={(value) => {
                  setContent(value);
                }}
                className="min-h-screen  w-[95vw]  border-white no-underline"
              />
            </div>
          </div>
          <div className="pt-3">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit">
              {!loading ? "Update Post" : <Spinner />}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditPost;
