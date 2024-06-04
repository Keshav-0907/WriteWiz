import React, { useEffect, useState } from "react";
import { CircleX, Info } from "lucide-react";

const ApiStatus = ({ setApiStatusModel }) => {
  const [apiAvailable, setApiAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const checkApi = async () => {
      if (apiAvailable) {
        setApiStatusModel(false);
      }
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/apiStatus`);
        const data = await res.json();
        setApiAvailable(data.status);
      } catch (error) {
        console.error("Error checking API status:", error);
        setApiAvailable(false);
      } finally {
        setLoading(false);
      }
    };
    checkApi();
  }, [apiAvailable, setApiStatusModel]);

  const closeModel = () => {
    setApiStatusModel(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white text-black md:p-2 p-4 md:w-1/4 h-1/4 border-2 rounded-lg shadow-lg">
        <div className="flex items-center justify-between font-semibold">
          <div className="flex gap-3 items-center">
            {" "}
            <div>API Status</div>{" "}
            <Info
              size={20}
              className="cursor-pointer text-blue-500"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            />{" "}
          </div>
          <button onClick={closeModel}>
            <CircleX className="text-red-500" />
          </button>
        </div>
        <div className="h-full">
          {loading ? (
            <div
              role="status"
              className="flex gap-5 items-center justify-center h-full"
            >
              <div>Checking API status...</div>

              {showTooltip && (
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 p-2 bg-gray-700 text-white text-xs rounded shadow-md">
                  We are using free hosting for the API, so it takes some time
                  to cold start.
                </div>
              )}
              <div className="flex justify-center items-center h-screen relative">
                <div className="absolute h-5 w-5 rounded-full bg-red-600">
                  {" "}
                </div>
                <div className="rounded-full h-5 w-5 bg-red-600 animate-ping"></div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full gap-2">
              <p className="text-lg font-semibold">
                {apiAvailable
                  ? "API is up and running 😁"
                  : "Hang Tight! 🚀 Our API is warming up and getting ready to go. This might take a moment, so please stay tuned!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiStatus;
