import React from "react";
import Chatbot from "./Chatbot";
import WeatherGraph from "./WeatherGraph";
import DataSummary from "./DataSummary";

const ParentComponent = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 h-full">

        <Chatbot />
      </div>
      <div className="w-1/2 flex flex-col ">
        <div className="h-1/2" >
          <WeatherGraph />
        </div>
        <div className="h-1/2 flex items-center justify-center ">
          <DataSummary />
        </div>
      </div>
    </div>
  );
};

export default ParentComponent;
