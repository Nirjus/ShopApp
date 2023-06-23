import React, { useEffect, useState } from "react";
import styles from "../../styles/style";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { backend_url, server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);
  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Order updated successfully!");
        navigate("/dashboard-orders");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const refundOrderUpdateHandler = async (e) => {
    await axios
    .put(
      `${server}/order/order-refund-success/${id}`,
      {
        status,
      },
      { withCredentials: true }
    )
    .then((res) => {
      toast.success("Order updated successfully!");
      dispatch(getAllOrdersOfShop(seller._id));
    })
    .catch((error) => {
      toast.error(error.message);
    });
  }
  return (
    <div className={`py-4 min-h-screen 800px:w-[70%] ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className=" pl-2 text-[25px]">Order Details</h1>
        </div>
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} !bg-[#f1617c] text-[#ffffff] !rounded-[4px] font-[700] !h-[45px] text-[18px] hover:!bg-[#f02247]`}
          >
            Order List
          </div>
        </Link>
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
              src={`${backend_url}/${item.images[0]}`}
              alt=""
              className=" w-[100px] h-[100px]"
            />
            <div className="w-full bg-[#dbdbdb] rounded-[10px] h-[100px]">
              <h5 className=" pl-3 text-[20px] font-Poppins">{item.name}</h5>
              <h5 className=" pl-3 text-[18px] text-[#0000008c]">
                US${item.discountPrice} * {item.qty}
              </h5>
            </div>
          </div>
        ))}
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
        </div>
      </div>
      <br />
      <br />
      <h4 className=" pt-3 text-[20px] font-[600] "> Order Status: </h4>
      {data?.status !== "Processing refund" && data?.status !== "Refund Success" && (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className=" w-[300px] mt-2 border h-[35px] rounded-[5px]"
        >
          {[
            "Processing",
            "Tranferred to delivery partner",
            "Shipping",
            "Received",
            "On the way",
            "Delivered",
          ]
            .slice(
              [
                "Processing",
                "Tranferred to delivery partner",
                "Shipping",
                "Received",
                "On the way",
                "Delivered",
              ].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
        </select>
      )}
       {
        data?.status === "Processing refund" || data?.status === "Refund Success" ? (
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className=" w-[300px] mt-2 border h-[35px] rounded-[5px]"
      >
        {["Processing refund", "Refund Success"]
          .slice(
            [
              "Processing refund",
              "Refund Success",
            ].indexOf(data?.status)
          )
          .map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
      </select>
       ) : null
      }
      <div
        className={`${styles.button} !bg-[#f1617c] text-[#ffffff] !rounded-[4px] font-[700] !h-[45px] text-[18px] hover:!bg-[#f02247]`}
        onClick={data?.status !== "Processing refund" ? orderUpdateHandler : refundOrderUpdateHandler}
      >
        Update Status
      </div>
    </div>
  );
};

export default OrderDetails;
