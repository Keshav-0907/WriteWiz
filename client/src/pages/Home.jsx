import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../component/BlogCard";
import { LibraryBig, Plus } from "lucide-react";
import Hero from "../component/Hero";
import ApiStatus from "../component/ApiStatus";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const darkMode = false;
  const [activeCategory, setActiveCategory] = useState("All");
  const [apiStatusModel, setApiStatusModel] = useState(true);
  const { user } = useContext(UserContext);


  const Categories = [
    { id: 1, title: "All", value: "All" },
    { id: 2, title: "Web Development", value: "Web Development" },
    { id: 3, title: "Machine Learning", value: "Machine Learning" },
    { id: 4, title: "Artificial Intelligence", value: "Artificial Intelligence" },
    { id: 5, title: "Cybersecurity", value: "Cybersecurity" },
    { id: 6, title: "Blockchain", value: "Blockchain" },
    { id: 7, title: "DevOps", value: "DevOps" },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/blog/allBlogs`
        );
        setBlogs(res.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleCategory = (category) => {
    console.log(category);
    setActiveCategory(category);
  };

  return (
    <div className="relative">
      <div className="home-container h-[calc(100vh-200px)]">
        <Hero />
      </div>
      <div className={`${darkMode ? "bg-[#191723] text-white" : ""} h-fit md:px-10 px-3`}>
        <div>
          <div className="flex justify-between">
            <div className="text-4xl font-InstrumentSerif">
              Recent Blogs
            </div>
            {
              user && (
                <Link to={'/createpost'} className="rounded-[10.037px] flex gap-2 py-[10px] px-[25px] text-white text-xs bg-[#2663EA] shadow-[0px_0px_0px_0.531px_#1C3FAE,0px_0.531px_1.592px_0px_rgba(0,0,0,0.10),0px_0.531px_0.398px_0px_rgba(255,255,255,0.12)_inset,0px_-2.122px_0px_0px_#1C3FAE_inset]">
                  Create New Blog <Plus size={16} />
                </Link>
              )
            }
          </div>
          <div className="py-5">
            <div className="py-2 font-semibold">Sort by category</div>
            <div className="flex gap-2 overflow-scroll">
              {Categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategory(category.value)}
                  className={`${activeCategory === category.value
                    ? "bg-[#2663EA] text-white"
                    : "border-2"
                    } py-1 px-4 rounded-full text-sm text-nowrap`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="h-fit md:py-10 py-2">
          <BlogCard blog={blogs} query={activeCategory} />
        </div>
      </div>
      {/* {apiStatusModel && (
        <div className="absolute top-0 h-screen w-screen flex justify-center items-center">
          <ApiStatus setApiStatusModel={setApiStatusModel} />
        </div>
      )} */}
    </div>
  );
};

export default Home;
