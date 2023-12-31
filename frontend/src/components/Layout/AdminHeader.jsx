import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import img from "../../Assets/Smart ShopBV_1.png"
import {TiTick} from "react-icons/ti"
const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className=" w-full h-[80px] bg-white shadow top-0 z-30 flex items-center justify-between px-4">
      <div className="mt-4">
        <Link to="/dashboard">
        <img
            src={img}
            alt=""
            className="w-full h-[200px] object-contain"
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center">
          <Link to="/dashboard/cupouns" className=" 800px:block hidden">
            <AiOutlineGift
              color="#555"
              size={30}
              className=" mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-events" className=" 800px:block hidden">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className=" mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-products" className=" 800px:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className=" mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-orders" className=" 800px:block hidden">
            <FiPackage
              color="#555"
              size={30}
              className=" mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-messages" className=" 800px:block hidden">
            <BiMessageSquareDetail
              color="#555"
              size={30}
              className=" mx-5 cursor-pointer"
            />
          </Link>
           <div className=" flex flex-col justify-center items-center">
          <img
            src={`${user?.avatar?.url}`}
            alt=""
            className=" w-[55px] h-[55px] rounded-full object-cover mb-[-2px]"
          />
          <p className=" text-[12px] flex"><span className=" border rounded-full bg-[#3d53fe]"><TiTick size={15} color="white"/></span>ADMIN</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
