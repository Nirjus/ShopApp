import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/style";
import { server } from "../server";
import { getAllOrdersOfUser } from "../redux/actions/order";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  const reviewHandler = async (e) => {
    await axios
      .put(
        `${server}/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem?._id,
          orderId:id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
        setComment("");
        setRating(null);
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const refundHandler = async () => {
      await axios.put(`${server}/order/order-refund/${id}`,{status:"Processing refund"}).then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
      }).catch((error) => {
        toast.error(error.response.data.message)
      })
  }

  return (
    <div className={`py-4 min-h-screen 800px:w-[70%] ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className=" pl-2 text-[25px]">Order Details</h1>
        </div>

        <div
          className={` bg-[#adadad] text-[#ffffff] !rounded-[4px] font-[700] !h-[45px] text-[18px] p-1`}
        >
          Your orders are here!
        </div>
      </div>

      <div className="w-full flex items-center justify-between pt-6 ">
        <h5 className="text-[#000000b7]">
          Order ID: <span>#{data?._id.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#000000be]">
          Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>
      <br />
      <br />
      {data &&
        data?.cart.map((item, index) => (
          <div className="w-full flex items-start mb-5">
            <img
              src={`${item.images[0]?.url}`}
              alt=""
              className=" w-[100px] h-[100px]"
            />
            <div className="w-full bg-[#dbdbdb] rounded-[10px] h-[100px]">
              <h5 className=" pl-3 text-[20px] font-Poppins">{item.name}</h5>
              <h5 className=" pl-3 text-[18px] text-[#0000008c]">
                US${item.discountPrice} * {item.qty}
              </h5>
            </div>
            {data?.status === "Delivered" && !item.isReviewed ?(
              <div
                className={`${styles.button} text-[#fff] text-center`}
                onClick={() => setOpen(true) || setSelectedItem(item)}
              >
                Write a review
              </div>
            ) : (
                null
            )}
          </div>
        ))}

      {/* {review popup} */}
      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
          <div className="w-[50%] h-min bg-[#fff] shadow rounded-md p-3">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                onClick={() => setOpen(false)}
                className=" cursor-pointer"
              />
            </div>
            <h2 className=" text-[30px] font-[500] font-Poppins text-center">
              Give a Review
            </h2>
            <br />
            <div className="w-full flex">
              <img
                src={`${selectedItem?.images[0]?.url}`}
                alt=""
                className=" w-[80px] h-[80px]"
              />
              <div className="bg-[#e0dfdf] rounded-md shadow">
                <div className="pl-3 pr-3 text-[17px] font-[600]">
                  {selectedItem?.name}
                </div>
                <h4 className="pl-3 text-[15px] ">
                  US${selectedItem?.discountPrice} * {selectedItem?.qty}
                </h4>
              </div>
            </div>
            <br />
            <br />
            {/* {ratings} */}
            <h5 className=" pl-3 text-[20px] font-[500]">
              Give a Ratings <span className=" text-red-500">*</span>
            </h5>
            <div className="flex w-full ml-2 pt-1">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className=" mr-1 cursor-pointer"
                    color=" rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className=" mr-1 cursor-pointer"
                    color=" rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>
            <br />
            <div className="w-full ml-3">
              <label className=" block text-[20px] font-[500]">
                Write a comment
                <span className=" ml-2 font-[400] text-[16px] text-[#000000a1]">
                  (optional)
                </span>
              </label>
              <textarea
                name="comment"
                id=""
                cols="20"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was your product , write your impression"
                className=" mt-2 w-[95%] border-[2px] border-gray-800 p-2 outline-none"
              ></textarea>
            </div>
            <div
              className={`${styles.button} text-white text-[20px] ml-3`}
              onClick={rating > 1 ? reviewHandler : null}
            >
              Submit
            </div>
          </div>
        </div>
      )}
      <div className="border-t w-full text-right">
        <h5 className=" pt-3 text-[18px]">
          Total Price: <strong>US${data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="pt-3 text-[20px]">
            {data?.shippingAddress.address1 +
              "  " +
              data?.shippingAddress.address2}
          </h4>
          <h4 className=" text-[20px]">{data?.shippingAddress.country}</h4>
          <h4 className=" text-[20px]">{data?.shippingAddress.city}</h4>
          <h4 className=" text-[20px]">{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className=" pt-3 text-[20px]">Payment Info:</h4>
          <h4>
            Status:{" "}
            {data?.paymentInfo?.status
              ? data?.paymentInfo?.status
              : "Not Paid!"}
          </h4>
          <br />

         {
            data?.status === "Delivered" && (
                <div className={`${styles.button} text-white`} onClick={refundHandler}>
                Give a refund
              </div>
            )
         }
        </div>
      </div>

      <Link to="/">
        <div className={`${styles.button} text-white`}>send Message</div>
      </Link>
      <br />
      <br />
    </div>
  );
};

export default UserOrderDetails;
