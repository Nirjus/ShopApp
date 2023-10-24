import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from '../components/Login/ForgotPassword';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user);
console.log(isAuthenticated);
  return (
    <div>
        {
          isAuthenticated ? navigate("/") : <ForgotPassword />
        }
    </div>
  )
}

export default ForgotPasswordPage