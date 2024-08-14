import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Heart, Eye } from "lucide-react";

const BlogCard = ({ blog, query }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const filterPosts = (posts, query) => {
    if (!query || query === "All") return posts;
    return posts.filter((post) => post.category[0].includes(query));
  };

  const filteredBlog = filterPosts(blog, query);

  console.log(filteredBlog)

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
      {filteredBlog.length === 0 ? (
        <div className="flex flex-col gap-5 pt-10">
          <span> No Blogs yet 😕</span>{" "}
          <Link
            to="/createpost"
            className="bg-black w-fit text-white px-5 py-2 flex gap-3 rounded-md"
          >
            <span> Create One </span> <Plus />
          </Link>
        </div>
      ) : (
        filteredBlog.map((post, index) => (
          <Link
            to={`blog/${post._id}`}
            key={index}
            className="w-full p-2 shadow-xl flex gap-2 flex-col border-[1px] border-gray-400 cursor-pointer rounded-lg"
          >
            <img
              src={post.imageUrl}
              alt={post.imageUrl}
              className="w-full h-48 object-cover"
            />
            <div className="flex justify-between">
              <div className="rounded-full w-fit px-2 bg-[#EEF4FF] text-[#3538CD] cursor-pointer">
                {post.category}
              </div>

              <div className="text-sm">{formatDate(post.date)}</div>
            </div>
            <div className="text-xl font-semibold">{post.title}</div>
            <div className="flex gap-5">
              <div className="flex items-center gap-1">
                <Eye size={15} strokeWidth={2} />
                <span> {post.count} </span>
              </div>
              <div className="flex items-center gap-1">
                <Heart size={15} strokeWidth={2} />
                <span> {post.likes} </span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {post.content.slice(0, 100)}...
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default BlogCard;
