import { useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import AiGenerated from "../component/AiGenerated";

const GeneratePopup = ({ onClose, onGenerate, generatedContent, setGeneratedContent }) => {
  

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg font-medium leading-6 text-gray-900"
                  id="modal-title"
                >
                  AI Generated Content
                </h3>
                <div className="mt-2">
                  <AiGenerated
                    generatedContent={generatedContent}
                    setGeneratedContent={setGeneratedContent}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CreatePost = () => {
  const { user } = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  console.log("Form CP", generatedContent[0]?.text)

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

  // const validateForm = () => {
  //   let formErrors = {};
  //   for (let field in formData) {
  //     if (!formData[field]) {
  //       formErrors[field] = "This field is required";
  //     }
  //   }
  //   setErrors(formErrors);
  //   return Object.keys(formErrors).length === 0;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!validateForm()) {
    //   toast.error("Please fill in all fields.");
    //   return;
    // }

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

  const togglePopup = () => {
    setShowPopup(!showPopup);
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
      {showPopup && <GeneratePopup onClose={togglePopup} generatedContent={generatedContent} setGeneratedContent={setGeneratedContent} />}
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900">
          Create a Blog Post
        </h1>
        <div className="py-4">
          <button
            type="button"
            onClick={togglePopup}
            className="py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150"
          >
            Generate using AI
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {formFields.map((field) => (
            <div key={field.id}>
              <label
                htmlFor={field.id}
                className="block text-xl font-medium text-gray-700"
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
                  value={(generatedContent.length > 0) ? (generatedContent[0].text) : (formData[field.id])}
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
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt={"Image URL"}
              className="w-full h-full object-cover rounded-xl"
            />
          )}

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
