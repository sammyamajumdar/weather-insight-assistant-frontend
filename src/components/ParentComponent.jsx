// ParentComponent.jsx
import React from "react";
import Chatbot from "./Chatbot";
import WeatherGraph from "./WeatherGraph";

const ParentComponent = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-gray-200 h-full relative">

        <Chatbot />
      </div>
      {/* Right Side */}
      <div className="w-1/2 flex flex-col">
        <div className="h-1/2 bg-blue-200">
          <WeatherGraph />
        </div>
        <div className="h-1/2 bg-green-200 flex items-center justify-center">
          <span>Bottom Right</span>
        </div>
      </div>
    </div>
  );
};

export default ParentComponent;
