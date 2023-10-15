import React from "react";
import styles from "../../styles/style";
import CountDown from "./CountDown/CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const {cart} = useSelector((state) => state.cart);
   const dispatch = useDispatch();
  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if(isItemExists){
      toast.error("Item already added to cart!")
    }else{
        if(data.stock < 1){
          toast.error("Product is out of stock!");
        }else{
          const cartData = {...data, qty:1}
      dispatch(addTocart(cartData));
      toast.success("Item add in cart");
        }
    }
  }
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
       <div className="w-full lg:w-[50%] p-2 m-auto">
        <img src={`${data.images[0]?.url}`} alt="" className=" w-full h-[500px] object-contain" />
        </div>
      <div className="w-full lg:w-[50%] flex flex-col justify-center ">
        <h2 className={`${styles.productTitle} p-3 underline`}> {data.name}</h2>
        <p  className=" p-3 800px:pr-14 text-justify text-[15px]">{data.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              {data.originalPrice}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.discountPrice}
            </h5>
          </div>
          <span className="pr-20 font-[600] text-[17px] text-[#22cbff]">
            {data.sold_out} sold
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center pl-3">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div className={`${styles.button} text-[#fff] ml-5`} onClick={() => addToCartHandler(data)} >Add to cart</div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
