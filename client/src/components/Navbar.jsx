import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/Dataprovider";
import { server } from "..";
import { Transition } from "@headlessui/react";
import logo from "../assets/logo.jpeg";
import extractToken from "../utils/GetToken";
import LogoutModal from "../modal/LogoutModal";
const Navbar = () => {
  const { account, setAccount } = UserAuth();
  const naviGate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const loaction = useLocation();
  const [modal, setModal] = useState({ show: false });
  // const [username, setUsername] = useState(null);

  // useEffect(() => {
  //   axios("http://localhost:5000/profile", {
  // 	method:'GET',
  //     withCredentials: true,
  //   }).then((response) => {
  //     response.json().then((userinfo) => {
  //       setUsername(userinfo.email);
  //     });
  //   });
  // }, []);

  const handlelogout = () => {
    // axios(`${server}/logout`, {
    //   method: "GET",
    //   withCredentials: true,
    // }).then((res) => {
    //   alert(res.data.message);
    //   setAccount({username:null})
    //   localStorage.setItem('token', '')

    // });
    localStorage.removeItem("token");
    naviGate("/login");
  };

  // if (!account.username ) return naviGate("/login");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const imageRedirect = () => {
    naviGate("/home");
  };

  const routes = [
    {
      lable: "All Blogs",
      route: "/home",
    },
    {
      lable: "Create New post",
      route: "/create",
    },
    {
      lable: "My Blogs",
      route: "/post",
    },
  ];
  return (
    <>
      {modal.show && <LogoutModal data={modal.show} setModel={setModal} />}
      <nav className="bg-white bg-opacity-60 drop-shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to={"/home"} className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src={logo}
                  alt="Logo"
                  onClick={imageRedirect}
                />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {extractToken() && (
                  <div className="flex gap-x-14 items-center">
                    {routes?.map((obj, index) => {
                      return (
                        <Link
                          to={obj.route}
                          key={index}
                          className={
                            obj.route === loaction.pathname
                              ? "flex flex-col items-center pt-1 text-blue-800  font-semibold rounded-lg ${className}"
                              : "flex flex-col items-center pt-1  "
                          }
                        >
                          {obj.lable}
                        </Link>
                      );
                    })}

                    <button
                      onClick={()=>{
                        setModal({show:true})
                      }}
                      className="text-red-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
                    >
                      {" "}
                      Logout
                    </button>
                  </div>
                )}

                {!extractToken() && (
                  <>
                    <Link to={"/login"}>Login</Link>

                    <Link to={"/signup"}>Signup</Link>
                  </>
                )}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-black  focus:outline-none   transition duration-200 ease-in-out"
                aria-label="Menu"
              >
                <svg
                  className={`h-6 w-6 ${isOpen ? "hidden" : "block"}`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`h-6 w-6 ${isOpen ? "block" : "hidden"}`}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <Transition
          show={isOpen}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {(ref) => (
            <div
              ref={ref}
              className={`${
                isOpen ? "block" : "hidden"
              } md:hidden bg-white w-full absolute`}
            >
              {account.username && (
                <>
                  <div className="px-2 pt-2 pb-3 sm:px-3">
                    <Link
                      to={"/home"}
                      className="block text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
                    >
                      All Blogs
                    </Link>
                    <Link
                      to={"/create"}
                      className="block text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
                    >
                      Create New post
                    </Link>
                    <Link
                      to={"/post"}
                      className="block text-gray-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
                    >
                      My Blogs
                    </Link>
                    <button
                      onClick={handlelogout}
                      className="block text-red-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
                    >
                      {" "}
                      Logout
                    </button>
                  </div>
                </>
              )}

              {!account.username && (
                <>
                  <Link to={"/login"}>Login</Link>

                  <Link to={"/signup"}>Signup</Link>
                </>
              )}

              {/* <a
                href="#"
                className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
              >
                Home
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
              >
                About
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
              >
                Services
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out"
              >
                Contact
              </a> */}
            </div>
          )}
        </Transition>
      </nav>
    </>
  );
};

export default Navbar;
