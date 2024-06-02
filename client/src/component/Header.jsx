import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { Zap, Home, Github, ChevronDown, Menu } from "lucide-react";

const Header = () => {
  const { user } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const Logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header className="py-4 bg-[#A91D3A] text-white flex justify-between px-10 items-center shadow-lg fixed w-full">
      <div className="flex items-center space-x-4">
        <Link to={"/"} className="text-2xl font-bold flex items-center gap-2">
          <Zap />
          <span>WriteWiz</span>
        </Link>
      </div>

      <nav className="hidden md:flex items-center space-x-6">
        <Link
          to="/"
          className="hover:bg-[#151515] px-2 py-1 rounded-xl flex gap-1 items-center"
        >
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link
          to="/"
          className="hover:bg-[#151515] px-2 py-1 rounded-xl flex gap-1 items-center"
        >
          <Github size={20} />
          <span>Contribute</span>
        </Link>
        <Link
          to="/"
          className="hover:bg-[#151515] px-2 py-1 rounded-xl flex gap-1 items-center"
        >
          <ChevronDown size={20} />
          <span>Categories</span>
        </Link>
      </nav>

      <div className="md:hidden flex items-center">
        <button onClick={toggleMobileMenu} className="focus:outline-none">
          <Menu size={24} />
        </button>
      </div>

      <div className={`${showMobileMenu ? "block" : "hidden"} md:hidden absolute top-16 left-0 right-0 bg-[#3a374a] w-full py-2`}>
        <Link
          to="/"
          className="block px-4 py-2 hover:bg-gray-700"
          onClick={toggleMobileMenu}
        >
          Home
        </Link>
        <Link
          to="/"
          className="block px-4 py-2 hover:bg-gray-700"
          onClick={toggleMobileMenu}
        >
          Contribute
        </Link>
        <Link
          to="/"
          className="block px-4 py-2 hover:bg-gray-700"
          onClick={toggleMobileMenu}
        >
          Categories
        </Link>
      </div>

      <div>
        {user ? (
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <span className="flex items-center gap-2">
                <span>{user.email}</span>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS-_lB_YIKaaPz_vciNdT2ebnlUl6gJE5kBQ&s"
                  className="w-8 h-8 rounded-full border-2"
                />
              </span>
            </button>
            {showMenu && (
              <div className="absolute top-10 right-0 bg-[#3a374a] w-48 py-2 rounded-lg shadow-lg">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Profile
                </Link>
                <Link
                  to="/createpost"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Create Post
                </Link>
                <div
                  onClick={Logout}
                  className="block px-4 py-2 hover:bg-gray-700 cursor-pointer"
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-4">
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/signup" className="hover:text-gray-300">
              Signup
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
