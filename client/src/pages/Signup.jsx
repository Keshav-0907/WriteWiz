import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const NewUser = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/regsiterUser`, {
      name,
      email,
      password,
    });

    if (!NewUser) {
      console.log("Error");
      toast.error("Error");
    }

    toast.success("SignUp Success");
  };

  return (
    <div className="bg-[#191723] h-screen text-white flex justify-center items-center">
      <Toaster/>
      <div className="w-1/2 h-1/2">
        <div className="py-5 text-4xl font-bold text-center">SignUp Here</div>
        <div className="flex flex-col gap-5">
          <input
            type="Name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-3 pr-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 focus:outline-none"
          />
          <div className="relative flex items-center mt-2">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={"1.5"}
                stroke="currentColor"
                className="w-6 h-6 mx-3 text-gray-400 dark:text-gray-500"
              >
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </span>

            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email Address"
              className="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 focus:outline-none"
            />
          </div>

          <div className="relative flex items-center mt-2">
            <button className="absolute right-0 focus:outline-none rtl:left-0 rtl:right-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mx-4 text-gray-400 transition-colors duration-300 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
              >
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path
                  fillRule={"evenodd"}
                  d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                  clipRule={"evenodd"}
                />
              </svg>
            </button>

            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
              className="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-5 pr-11 rtl:pr-5 rtl:pl-11 dark:bg-gray-900 dark:text-gray-300 outline-none"
            />
          </div>

          <span>
            <Link to={"/login"}> Login </Link>
          </span>

          <button
            onClick={handleSubmit}
            type="button"
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            SignUp In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
