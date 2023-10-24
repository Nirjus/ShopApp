import React, { useState } from "react";
import styles from "../../styles/style";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${server}/user/forgot-password`, {
        email,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEmail("");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className=" min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className=" sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className=" mt-6 text-center text-3xl font-extrabold text-gray-900">
          Put Your Email
        </h2>
      </div>
      <div className=" mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className=" bg-white py-8 px-8 shadow sm:rounded-lg sm:px-10">
          <form className=" space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor=" email"
                className=" block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
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
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Go to Login page? </h4>
              <Link to="/login" className="text-blue-600 pl-2">
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default ForgotPassword