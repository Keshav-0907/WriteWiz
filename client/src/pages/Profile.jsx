import React, { useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Plus } from "lucide-react";

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

  return (
    <div className="p-10 flex flex-col gap-10 min-h-[calc(100vh-200px)]">
      <Toaster />
      <div className="flex  justify-between items-center">
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

        <Link to={'/createpost'} className="rounded-[10.037px] w-fit h-fit flex gap-2 py-[10px] px-[25px] text-white text-xs bg-[#2663EA] shadow-[0px_0px_0px_0.531px_#1C3FAE,0px_0.531px_1.592px_0px_rgba(0,0,0,0.10),0px_0.531px_0.398px_0px_rgba(255,255,255,0.12)_inset,0px_-2.122px_0px_0px_#1C3FAE_inset]">
          Create New Blog <Plus size={16} />
        </Link>

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
                  <Link to={`/blog/${blog._id}`} className="border-[1px] text-black w-20 flex justify-center items-center px-2 py-1 rounded-lg">
                    View
                  </Link>
                  <button className="bg-red-500 text-white w-20 px-3 py-2 rounded-lg" onClick={() => deletePost(blog._id)}>
                    Delete
                  </button>
                  {/* <button className="bg-yellow-500 text-white px-3 py-2 rounded-lg">
                    Update
                  </button> */}
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
