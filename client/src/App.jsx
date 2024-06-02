import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { UserProvider } from "../context/UserContext";
import Header from "./component/Header";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import Blog from "./pages/Blog";
import Footer from "./component/Footer";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Header />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/blog/:id" element={<Blog />} />
          </Routes>
        </div>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
