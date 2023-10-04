import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import extractToken from "../utils/GetToken";
import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";


export const Datacontext = createContext(null)


const Dataprovider = ({children}) => {

	const [account,setAccount] = useState({username:'', id:''})
	const [token, setToken] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const navigate = useNavigate();
	const location = useLocation()

	
	useEffect(() => {
		// Check if token exists in local storage
		
		if (extractToken()) {
		  setToken(extractToken());
		  if(location.pathname === "/login" || location.pathname==="/"){
			navigate("/home")
		  }
		//   setIsLoggedIn(true);
		}else{
			navigate("/login")
			// setIsLoading(false);
		}
	  }, []);

	  useEffect(() => {
		  if(extractToken()) {
			const jwtd = jwtDecode(localStorage.getItem("token"));
			console.log(jwtd);
		if (jwtd) {
		  setAccount({ username: jwtd?.username, id: jwtd?.id });
		}
		  }
	  }, []);
	

  return (
	<Datacontext.Provider value={{account,setAccount, setToken, setIsLoggedIn}}>

{children}
	</Datacontext.Provider>
  )
}

const UserAuth = () =>{
return	useContext(Datacontext)
}

export {Dataprovider,UserAuth}