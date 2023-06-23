import React from "react";
import { AiOutlineCreditCard, AiOutlineLogout, AiOutlineMessage } from "react-icons/ai";
import {RiLockPasswordFill} from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineAdminPanelSettings, MdOutlineTrackChanges } from "react-icons/md";
import {TbAddressBook} from "react-icons/tb"
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.user);
  const logoutHandler = () => {
    axios.get(`${server}/user/logout`,{withCredentials:true}).then((res) => {
      toast.success(res.data.message);
      window.location.reload(true);
      navigate("/login");
    }).catch((error)=>{
      console.log(error.response.data.message);
    })
  }
  return (
    <div className=" w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span className={`${active === 1 ? "text-[red]" : ""} pl-3 800px:block hidden`}>
          Profile
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span className={`${active === 2 ? "text-[red]" : ""} pl-3 800px:block hidden`}>
          Orders
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
        <span className={`${active === 3 ? "text-[red]" : ""} pl-3 800px:block hidden`}>
          Refunds
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
        <span className={`${active === 4 ? "text-[red]" : ""} pl-3 800px:block hidden`}>
          Inbox
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
        <span className={`${active === 5 ? "text-[red]" : ""} pl-3 800px:block hidden`}>
          Track Order
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordFill size={20} color={active === 6 ? "red" : ""} />
        <span className={`${active === 6 ? "text-[red]" : ""} pl-3 800px:block hidden`}>
         Change Password
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook   size={20} color={active === 7 ? "red" : ""} />
        <span className={`${active === 7 ? "text-[red]" : ""} pl-3 800px:block hidden`}>
        Address  
        </span>
      </div>
     
    {
      user && user?.role === "Admin" && (
        <Link to="/admin/dashboard">
        <div
           className="flex items-center cursor-pointer w-full mb-8"
           onClick={() => setActive(8)}
         >
           <MdOutlineAdminPanelSettings size={20} color={active === 8 ? "red" : ""} />
           <span className={`${active === 8 ? "text-[red]" : ""} pl-3 800px:block hidden`}>
         Admin Dashboard
           </span>
         </div>
        </Link>
   
      )
    }
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(9) || logoutHandler()}
      >
        <AiOutlineLogout size={20} color={active === 9 ? "red" : ""} />
        <span className={`${active === 9 ? "text-[red]" : ""} pl-3 800px:block hidden`}>
         Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
