import React, { useState } from "react";
import { AiChatSession } from "../model/model";

const AiGenerated = ({ generatedContent, setGeneratedContent }) => {
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
            <label className="text-sm">Describe the content</label>

            <textarea
              placeholder="Describe your blog content here..."
              value={content}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label className="text-sm">Max Word Count</label>

            <input
              type="text"
              placeholder="Max Word Count (100-1000)"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
              value={maxWords}
              onChange={(e) => setMaxWords(e.target.value)}
            />
          </div>

          <div className="">
            <label className="text-sm">Type of Tone:</label>
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
            className="rounded-[18.037px] py-[10px] px-[25px] text-white text-xs bg-[#2663EA] shadow-[0px_0px_0px_0.531px_#1C3FAE,0px_0.531px_1.592px_0px_rgba(0,0,0,0.10),0px_0.531px_0.398px_0px_rgba(255,255,255,0.12)_inset,0px_-2.122px_0px_0px_#1C3FAE_inset]"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AiGenerated;
