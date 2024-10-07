import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Loader, User, Mail, Lock } from "lucide-react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(import.meta.env.VITE_API_URL,'/api/user/registerUser');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const NewUser = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/user/registerUser`,
        {
          name,
          email,
          password,
        }
      );

      if (NewUser.status === 200) {
        toast.success("Sign Up Success");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <Toaster />
      <div className="w-full max-w-md shadow-lg border-[1px] rounded-2xl py-8 px-10 bg-white">
        <div className="flex justify-center text-3xl font-semibold text-gray-700 mb-8">
          Create New Account
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Name Input */}
          <div className="flex items-center border-[1px] rounded-lg px-4 py-2">
            <User className="mr-3 text-gray-400" />
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              value={name}
              className="outline-none w-full"
              required
            />
          </div>

          {/* Email Input */}
          <div className="flex items-center border-[1px] rounded-lg px-4 py-2">
            <Mail className="mr-3 text-gray-400" />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email ID"
              value={email}
              className="outline-none w-full"
              required
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center border-[1px] rounded-lg px-4 py-2">
            <Lock className="mr-3 text-gray-400" />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              value={password}
              className="outline-none w-full"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="text-white bg-[#2663EA] w-full py-2 rounded-lg flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <Loader className="animate-spin mr-2" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-gray-500">Already have an account?</span>
          <Link to="/login" className="text-blue-600 font-semibold ml-2">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
