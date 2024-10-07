import { useState, useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import AiGenerated from "../component/AiGenerated";
import { Loader } from "lucide-react"; // Assuming you're using Lucide icons
import { BotMessageSquare } from 'lucide-react';


const GeneratePopup = ({ onClose, generatedContent, setGeneratedContent }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg font-medium leading-6 text-gray-900 font-InstrumentSerif" id="modal-title">
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
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="rounded-[18.037px] py-[10px] px-[25px] text-white text-xs bg-[#d13131] "
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
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  console.log('formData', formData)

  if (!user) {
    window.location.href = "/login";
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state

    // Update content with generated content before submission
    const contentToSubmit = generatedContent.length > 0 ? generatedContent[0].text : formData.content;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/blog/createBlog`, {
        ...formData,
        content: contentToSubmit, // Use the updated content
        author: user.name,
      });
      toast.success("Post created successfully!");
      setFormData({
        title: "",
        content: "",
        category: "",
        imageUrl: "",
      });
      setGeneratedContent(""); // Reset generated content after submission
      setErrors({});
    } catch (error) {
      toast.error("Failed to create post. Please try again.");
    } finally {
      setLoading(false); // Stop loading state
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
    <div className="flex justify-center items-center min-h-[calc(100vh-100px)] h-fit my-10">
      <div className="shadow-lg border-[1px] rounded-2xl py-4 px-5 bg-white w-full sm:w-1/2 h-fit">
        <Toaster />
        {showPopup && (
          <GeneratePopup
            onClose={togglePopup}
            generatedContent={generatedContent}
            setGeneratedContent={setGeneratedContent}
          />
        )}
        <h1 className="text-2xl font-InstrumentSerif font-bold mb-6 text-center text-gray-900">
          Create a Blog Post
        </h1>
        <div className="py-2 text-center flex justify-end">
          <button
            type="button"
            onClick={togglePopup}
            className="rounded-[10.037px] flex gap-2 py-[10px] px-[25px] text-white text-xs bg-[#2663EA] shadow-[0px_0px_0px_0.531px_#1C3FAE,0px_0.531px_1.592px_0px_rgba(0,0,0,0.10),0px_0.531px_0.398px_0px_rgba(255,255,255,0.12)_inset,0px_-2.122px_0px_0px_#1C3FAE_inset]"
          >
            Generate using AI <BotMessageSquare size={16} />
          </button>
        </div>
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
                  className="mt-1 text-sm p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              ) : field.element === "textarea" ? (
                <textarea
                  id={field.id}
                  value={generatedContent.length > 0 ? generatedContent[0].text : formData[field.id]}
                  onChange={handleChange}
                  className="mt-1 text-sm p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  rows="5"
                  required
                />
              ) : (
                <select
                  id={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {field.options.map((option) => (
                    <option key={option} value={option} className="text-sm">
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
              alt="Uploaded"
              className="mt-4 w-full h-64 object-cover rounded-lg shadow-md"
            />
          )}
          <div>
            <button
              type="submit"
              disabled={loading} // Disable button when loading
              className={` rounded-[18.037px] w-full py-[10px] px-[25px] text-white text-xs bg-[#2663EA] shadow-[0px_0px_0px_0.531px_#1C3FAE,0px_0.531px_1.592px_0px_rgba(0,0,0,0.10),0px_0.531px_0.398px_0px_rgba(255,255,255,0.12)_inset,0px_-2.122px_0px_0px_#1C3FAE_inset] ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader className="animate-spin h-5 w-5 mr-2" /> Submitting...
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

