import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setuser] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");

    const getUser = async () =>{
      const User = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/userInfo`, {
        token,
      });
      setuser(User.data.user);
    }
    getUser()
  }, []);


  return (
    <UserContext.Provider value={{ user, setuser }}>
      {children}
    </UserContext.Provider>
  );
};
