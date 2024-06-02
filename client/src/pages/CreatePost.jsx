import { useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const CreatePost = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    window.location.href = "/login";
  }

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    for (let field in formData) {
      if (!formData[field]) {
        formErrors[field] = "This field is required";
      }
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/blog/createBlog`, {
        ...formData,
        author: user.name,
      });
      toast.success("Post created successfully!");
      setFormData({
        title: "",
        content: "",
        category: "",
        imageUrl: "",
      });
    } catch (error) {
      toast.error("Failed to create post.");
    }
  };

  const formFields = [
    { id: "title", label: "Title", type: "text", element: "input" },
    { id: "content", label: "Content", type: "text", element: "textarea" },
    {
      id: "category",
      label: "Category",
      type: "select",
      options: [
        "Web Development",
        "Machine Learning",
        "Artificial Intelligence",
        "Cybersecurity",
        "Blockchain",
        "DevOps",
      ],
    },
    { id: "imageUrl", label: "Image URL", type: "text", element: "input" },
  ];

  return (
    <div className="min-h-fit flex flex-col items-center justify-center bg-[#151515] py-12 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900">
          Create a Blog Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {formFields.map((field) => (
            <div key={field.id}>
              <label
                htmlFor={field.id}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              {field.element === "input" ? (
                <input
                  type={field.type}
                  id={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              ) : field.element === "textarea" ? (
                <textarea
                  id={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  rows="5"
                />
              ) : (
                <select
                  id={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              {errors[field.id] && (
                <p className="mt-2 text-sm text-red-600">{errors[field.id]}</p>
              )}
            </div>
          ))}
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
