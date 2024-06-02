import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { CircleUser } from "lucide-react";
import { Heart, Eye } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const getBlog = async () => {
      const Blog = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/blog/getBlog/${id}`
      );
      setBlog(Blog.data.blog);
    };
    getBlog();
  }, []);

  const LikePost = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/blog/likeBlog`, {
      id: blog._id,
    });
    toast.success("Post liked successfully!");
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="h-fit md:px-20 px-3 py-5">
      <Toaster/>
      <div className="flex flex-col gap-5">
        <img
          src={blog?.imageUrl}
          alt={blog?.imageUrl}
          className="w-full md:h-96 h-40 object-cover rounded-xl"
        />
        <div className="text-4xl font-bold flex justify-betweenitems-center md:flex-row flex-col">
          <div>{blog?.title}</div>
          <div className="text-sm flex gap-2 w-full justify-end px-10">
            <Eye /> <span> {blog.count} </span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            {" "}
            <CircleUser />
            <span>{blog?.author}</span>{" "}
          </div>
          <div> {formatDate(blog?.date)} </div>
        </div>
        <div className="rounded-full w-fit px-2 bg-[#EEF4FF] text-[#3538CD] cursor-pointer">
          {" "}
          {blog?.category}{" "}
        </div>
        <div>
          <p className="text-lg"> {blog?.content} </p>
        </div>
        <div>
          <button className="bg-white text-black flex gap-2 border-[1px] border-black px-5 py-2 rounded-md" onClick={LikePost}>
            <Heart /> <span> Like </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
