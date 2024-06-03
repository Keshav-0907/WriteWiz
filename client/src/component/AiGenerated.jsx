import React, { useState } from "react";
import { AiChatSession } from "../model/model";

const AiGenerated = ({generatedContent, setGeneratedContent}) => {
  const [content, setContent] = useState("");
  const [tone, setTone] = useState("Formal");
  const [maxWords, setMaxWords] = useState(100);
  const [genContent, setgenContnet] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const GeneratedContent = await AiChatSession.sendMessage(
      "Write a blog post about " +
        content +
        " in a " +
        tone +
        " tone. The blog post should be " +
        maxWords +
        " words long." + " Dont include separate heading "
    );
    setGeneratedContent(GeneratedContent.response.candidates[0].content.parts);
    console.log(genContent);
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        <div className="flex flex-col gap-5">
          <div>
            <label>Describe the content</label>

            <textarea
              placeholder="Describe your blog content here..."
              value={content}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label>Max Word Count</label>

            <input
              type="text"
              placeholder="Max Word Count (100-1000)"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              value={maxWords}
              onChange={(e) => setMaxWords(e.target.value)}
            />
          </div>

          <div className="">
            <label>Type of Tone:</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="Formal">Formal</option>
              <option value="Casual">Casual</option>
              <option value="Professional">Professional</option>
              <option value="Friendly">Friendly</option>
            </select>
          </div>
        </div>
        <div className="py-4 w-full flex justify-center">
          <button
            type="submit"
            className="py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AiGenerated;
