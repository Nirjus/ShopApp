import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShopResetPassword from '../components/Shop/ShopResetPassword';

const ShopResetPasswordPage = () => {
    const navigate = useNavigate();
    const { isSeller,isLoading } = useSelector((state) => state.seller);
  
    useEffect(() => {
         if(isSeller === true){
          navigate(`/dashboard`); 
         }
    },[isLoading,isSeller])
  return (
    <div>
        <ShopResetPassword />
    </div>
  )
}

export default ShopResetPasswordPage