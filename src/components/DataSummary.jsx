import { SUMMARY_ENDPOINT } from "../constants/constants";
import React, { useEffect, useState } from "react";

const HARDCODED_QUERY = "report the highest and lowest temperatures and the hour of days when it happened. Also inform on the earliest and latest recording datetime.";

const DataSummary = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      setError(null);
      setResult(null);
try {
  const response = await fetch(SUMMARY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: HARDCODED_QUERY }),
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  const data = await response.json();

  if (typeof data === "object" && data !== null) {
    if (
      "response" in data &&
      typeof data.response === "object" &&
      data.response !== null &&
      "input" in data.response &&
      "output" in data.response
    ) {
      setResult(data.response.output || "No summary available.");
    } else if ("response" in data && typeof data.response === "string") {
      setResult(data.response || "No summary available.");
    } else {
      throw new Error("Unexpected response format");
    }
  } else {
    throw new Error("Invalid response from server");
  }
} catch (err) {

  setError(err.message || "Something went wrong.");
  setResult(null); 
} finally {
    setLoading(false);
}
    };

    fetchSummary();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white">
      <h2 className="text-xl font-semibold mb-2 text-blue-500 flex justify-center">Data Summary</h2>
      <div className="min-h-[2rem]">
        {loading && (
          <div className="text-blue-500 font-medium">Loading summary...</div>
        )}
        {error && (
          <div className="text-red-600 font-medium">{error}</div>
        )}
        {result && !error && !loading && (
          <div className="text-gray-700">{result}</div>
        )}
      </div>
    </div>
  );
};

export default DataSummary;