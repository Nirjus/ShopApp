import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ResetPassword from '../components/Login/ResetPassword';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <div>
        {
            isAuthenticated ? navigate("/") : <ResetPassword />
        }
    </div>
  )
}

export default ResetPasswordPage