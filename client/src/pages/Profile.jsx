import React, { useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [userBlogs, setUserBlogs] = useState([]);

  useEffect(() => {
    const fetchUserPost = async () => {
      if (user) {
        const Blogs = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/blog/getUserBlogs`,
          {
            id: user?._id,
          }
        );
        console.log(Blogs.data.blogs);
        setUserBlogs(Blogs.data.blogs);
      }
    };
    fetchUserPost();
  }, [user]);

  const deletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return; 
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/blog/deleteBlog`, {
        id,
      }); 
      setUserBlogs(userBlogs.filter((blog) => blog._id !== id));
      toast.success("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Error deleting post"); 
    }
  }
  
  console.log(userBlogs);
  return (
    <div className="p-10 flex flex-col gap-10">
      <Toaster/>
      <div className="flex items-center gap-5 ">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS-_lB_YIKaaPz_vciNdT2ebnlUl6gJE5kBQ&s"
          alt="err"
          className="w-20 h-20 rounded-full object-cover"
        />{" "}
        <div className="flex flex-col">
          <span className="text-2xl font-bold">{user?.name}</span>
          <span>{user?.email}</span>
        </div>
      </div>

      <div>
        <div className="py-4 text-xl font-bold">My Blogs</div>
        <div className="space-y-5">
          {userBlogs.map((blog) => (
            <div
              key={blog._id}
              className="flex gap-5 bg-white shadow-md rounded-lg overflow-hidden p-5 md:flex-row flex-col"
            >
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="md:w-40 w-full h-40 object-cover rounded-lg"
              />
              <div className="flex flex-col justify-between">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600">
                  {blog.content.slice(0, 400) + "......."}
                </p>
                <div className="flex gap-2">
                  <Link to={`/blog/${blog._id}`} className="bg-blue-500 text-white px-3 py-2 rounded-lg">
                    View
                  </Link>
                  <button className="bg-red-500 text-white px-3 py-2 rounded-lg" onClick={() => deletePost(blog._id)}>
                    Delete
                  </button>
                  <button className="bg-yellow-500 text-white px-3 py-2 rounded-lg">
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
