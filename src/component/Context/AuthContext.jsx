import axios from 'axios';
import React, { Children, createContext, useEffect, useState } from 'react'

export let  authContext = createContext();

const AuthContext = ({children}) => {
    const [auth, setAuth] = useState([]);
    let [checkUser, setCheckUser] = useState({
        isLoggedIn : false,
        isAdmin: false
    })

    useEffect(()=>{
        axios.get("http://localhost:5000/user").then((resp)=>{
            setAuth(resp.data)
        })
    },[])


  return (
    <authContext.Provider value={{checkUser, setCheckUser,auth, setAuth} }>{children}</authContext.Provider>
  )
}

export default AuthContext