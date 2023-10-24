import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShopForgotPassword from '../components/Shop/ShopForgotPassword';

const ShopForgotPasswordPage = () => {
    const navigate = useNavigate();
    const { isSeller,isLoading } = useSelector((state) => state.seller);
  
    useEffect(() => {
         if(isSeller === true){
          navigate(`/dashboard`); 
         }
    },[isLoading,isSeller])
  return (
    <div>
        <ShopForgotPassword />
    </div>
  )
}

export default ShopForgotPasswordPage