import React, { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { Zap, Home, Github, ChevronDown, Menu, FileQuestion } from "lucide-react";

const Header = () => {
  const { user } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [apiStatus, setApiStatus] = useState(true);
  const menuRef = useRef(null);

  console.log('apiStatus', apiStatus)
  useEffect(() => {
    const checkApi = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/apiStatus`);
        const data = await res.json();
        console.log(data)
        setApiStatus(data.status);
      } catch (error) {
        console.error("Error checking API status:", error);
        setApiStatus(false);
      }
    };
    checkApi();
  }, []);

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

  const NavItems = [
    {
      title: 'Home',
      href: '/'
    },
    {
      title: 'About us',
      href: '/'
    },
    {
      title: 'Github',
      href: '/'
    },
    {
      title: 'Support',
      href: '/'
    }
  ]


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className='flex justify-center w-full fixed top-0 pt-5 bg-white z-20'>
      <div className='border-[#F8F8F8] border-2 shadow-md py-[15px] px-[30px] w-2/3 rounded-full flex justify-between items-center'>
        <Link to={'/'} className='font-InstrumentSerif flex items-center gap-2'>
          <span className='text-lg'>WriteWiz</span>
        </Link>

        <div className='flex gap-6'>
          {
            NavItems.map((item, index) => (
              <Link key={index} href={item.href} className='text-gray-700 hover:text-black text-sm'>
                {item.title}
              </Link>
            ))
          }
        </div>

        <div>
          {
            !user ? (
              <Link to={'/signup'} className="rounded-[18.037px] py-[10px] px-[25px] text-white text-xs bg-[#2663EA] shadow-[0px_0px_0px_0.531px_#1C3FAE,0px_0.531px_1.592px_0px_rgba(0,0,0,0.10),0px_0.531px_0.398px_0px_rgba(255,255,255,0.12)_inset,0px_-2.122px_0px_0px_#1C3FAE_inset]">
                Sign Up
              </Link>
            ) : (
              <div className="flex gap-2 items-center">
                <div className="rounded-[18.037px] py-[10px] px-[25px] text-white text-xs bg-[#2663EA] shadow-[0px_0px_0px_0.531px_#1C3FAE,0px_0.531px_1.592px_0px_rgba(0,0,0,0.10),0px_0.531px_0.398px_0px_rgba(255,255,255,0.12)_inset,0px_-2.122px_0px_0px_#1C3FAE_inset]">
                  Hi, {user.name}
                </div>
                <div onClick={Logout} className="border-2 border-red-600 py-[10px] px-[25px] rounded-full text-xs text-red-600 hover:bg-red-600 hover:text-white cursor-pointer">
                  LogOut
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Header;
