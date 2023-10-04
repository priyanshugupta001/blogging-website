import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { data } from "autoprefixer";
import { server } from "..";
import { Navigate, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/Dataprovider";
import Input from "../components/Input";
import extractToken from "../utils/GetToken";
import Spinner from "../components/Spinner";

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
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const { account, setAccount } = UserAuth();
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  const handleCreatePost = (e) => {
    e.preventDefault();
    setLoading(true)
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);

    console.log(account);
    if (account && extractToken())   {
      axios(`${server}/createpost`, {
        method: "POST",
        data: {
          title,
          summary,
          content,
          image,
        },
        headers:{
          Authorization: `Bearer ${extractToken()}`
        }
      })
        .then((res) => {
          alert(res.data.message);
          return navigate("/home");
        })
        .catch((e) => {
          
          alert(e?.message);
        });
    } else {
      alert("something went wrong!");
    }
  };
  return (
    <>
      <div className="bg-[#F8F8F8] pb-4">
        <Navbar />
        <form
          action=""
          onSubmit={handleCreatePost}
          className="flex flex-col items-center"
        >
          <div className="md:p-4 p-2">
            <Input
              type={"title"}
              placeholder={"Enter the title of blog"}
              value={title}
              className={"md:w-[80vw] bg-white w-[95vw]"}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            <Input
              type={"summary"}
              placeholder={"Enter the summary of blog"}
              value={summary}
              className={"md:w-[80vw] bg-white w-[95vw]"}
              onChange={(e) => {
                setSummary(e.target.value);
              }}
            />
            <Input
              type={"url"}
              className={"md:w-[80vw] bg-white w-[95vw]"}
              placeholder="Enter the url of the Image, please add only those url which has an extension like jpg, png and jpeg"
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
              }}
            />
          </div>
          {/* <input
            type="file"
            onChange={(e) => {
              setFiles(e.target.files);
            }}
          /> */}
          <div className="flex justify-center items-center p-3">
            <div className="  bg-white rounded overflow-hidden shadow-lg">
              <ReactQuill
                value={content}
                modules={modules}
                formats={formats}
                onChange={(value) => {
                  setContent(value);
                }}
                className="min-h-[80vh] w-[95vw] h-auto border-white no-underline"
              />
            </div>
          </div>
          <div className="pt-3">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit">
              {!loading? 'Post Article' : <Spinner/>}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
