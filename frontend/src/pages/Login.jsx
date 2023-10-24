import React from 'react'
import Login from "../components/Login/Login.jsx"
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);
  console.log(isAuthenticated);
  // useEffect(() => {
  //      if(isAuthenticated === true){
  //       navigate("/"); 
  //      }
  // },[])
  return (
    <div>
       {
        isAuthenticated ?  navigate("/") : <Login/>
       }
    </div>
  )
}

export default LoginPage