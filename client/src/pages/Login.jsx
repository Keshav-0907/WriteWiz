import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Loader, Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginUser = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/loginUser`, {
        email,
        password,
      });

      if (loginUser.status === 200) {
        toast.success("Login Success");
        localStorage.setItem("token", loginUser.data.token);
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex items-center justify-center ">
      <Toaster />
      <div className="w-full max-w-md shadow-lg border-[1px] rounded-2xl py-8 px-10 bg-white">
        <div className="py-5 text-3xl font-semibold text-center">Login Here</div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex items-center border-[1px] rounded-lg px-4 py-2 bg-white">
            <Mail className="mr-3 text-gray-400" />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="keshav@example.com"
              value={email}
              className="outline-none w-full text-gray-700"
              required
            />
          </div>

          <div className="flex items-center border-[1px] rounded-lg px-4 py-2 bg-white">
            <Lock className="mr-3 text-gray-400" />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              value={password}
              className="outline-none w-full text-gray-700"
              required
            />
          </div>

         

          <button
            type="submit"
            className="text-white bg-[#2663EA] font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <Loader className="animate-spin mr-2" />
            ) : (
              "Log In"
            )}
          </button>
          <div className="text-center">
            <span className="text-gray-400">Don't have an account?</span>
            <Link to="/signup" className="text-blue-500 font-semibold ml-2">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
