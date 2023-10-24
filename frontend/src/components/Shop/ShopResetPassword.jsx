import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/style";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const ShopResetPassword = () => {
  const navigate = useNavigate();
  
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const {token} = useParams();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put(`${server}/shop/reset-password`,{
        token,
        password,
      })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/shop-login");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className=" min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className=" sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className=" mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset Your Password
        </h2>
      </div>
      <div className=" mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className=" bg-white py-8 px-8 shadow sm:rounded-lg sm:px-10">
          <form className=" space-y-6" onSubmit={handleSubmit}>
           
            <div>
              <label
                htmlFor="password"
                className=" block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
           
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
    
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopResetPassword