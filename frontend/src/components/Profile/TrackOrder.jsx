import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllOrdersOfUser } from '../../redux/actions/order';

const TrackOrder = () => {
    const { orders } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
      dispatch(getAllOrdersOfUser(user._id));
    }, [dispatch]);

    const data = orders && orders.find((item) => item._id === id);
  return (
    <div className="w-full h-[80vh] justify-center flex items-center">
         <>
           {
            data && data?.status === "Processing" ? (
              <h1 className='text-[20px]'>Your Order is processing in Shop.</h1>
            ) : (
                data?.status === "Tranferred to delivery partner" ? (
                    <h1 className='text-[20px]'>Your Order is on the way for delevery partner.</h1>
                )  : (
                    data?.status === "Shipping" ? (
                        <h1 className='text-[20px]'>Your Order is coming with our delevery partner.</h1>        
                    ) :(
                        data?.status === "Received" ? (
                            <h1 className='text-[20px]'>Your Order is in your city. Our Delevary man will delivery it.</h1> 
                        )  :(
                            data?.status === "On the way" ? (
                                <h1 className='text-[20px]'>Your Order is out for delevery, delevery man will rich out soon!</h1>  
                            )  :  (
                                data?.status === "Delivered" ? (
                                    <h1 className='text-[20px]'>Your Order Delivered successfully!</h1>  
                                ) : (
                                    data?.status === "Processing refund" ? (
                                        <h1 className='text-[20px]'>Your refund is processing</h1>
                                    )  : (
                                        data?.status === "Refund Success" ? (
                                            <h1 className='text-[20px]'>Your Refund is successful</h1>
                                        ) : (
                                            null
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
           }
         </>

    </div>
  )
}

export default TrackOrder