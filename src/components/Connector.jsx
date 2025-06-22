import React, { useState, useEffect } from "react";

const Connector = () => {
  const [connectionStatus, setConnectionStatus] = useState("checking");

  const checkConnection = async () => {
    try {
      const res = await fetch("/connect", {
        method: "GET",
      });
      if (res.ok) {
        setConnectionStatus("connected");
      } else {
        setConnectionStatus("not_connected");
      }
    } catch {
      setConnectionStatus("not_connected");
    }
  };

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 900000); // 15 minutes = 900,000 ms
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center mt-2">
      <span
        className={`inline-block w-3 h-3 rounded-full mr-2 ${
          connectionStatus === "connected"
            ? "bg-green-500"
            : connectionStatus === "checking"
            ? "bg-yellow-400"
            : "bg-red-500"
        }`}
      ></span>
      <span
        className={`text-sm font-medium ${
          connectionStatus === "connected"
            ? "text-green-700"
            : connectionStatus === "checking"
            ? "text-yellow-700"
            : "text-red-700"
        }`}
      >
        {connectionStatus === "connected"
          ? "Connected"
          : connectionStatus === "checking"
          ? "Checking..."
          : "Not Connected"}
      </span>
    </div>
  );
};

export default Connector;

