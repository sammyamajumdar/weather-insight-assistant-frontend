import React, { useEffect, useState } from 'react';
import { GRAPH_ENDPOINT } from '../constants/constants';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeatherGraph = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {

        const endDate = "2020-01-01 05:00:00";
        const startDate = "2020-01-01 00:00:00";



        const response = await fetch(GRAPH_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            start_datetime: startDate,
            end_datetime: endDate,
            schema: "dbo"
          })
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        const uniqueData = Array.from(
  new Map(data.data.map(item => [item.time, item])).values()
);
        setWeatherData(uniqueData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);


  const chartData = {
    labels: weatherData.map(item => 
      new Date(item.time).toLocaleTimeString([], { year: 'numeric', month: '2-digit',day: '2-digit',hour: '2-digit', minute: '2-digit' })
    ),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: weatherData.map(item => item.temperature),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Wind Speed (km/h)',
        data: weatherData.map(item => item.wind_speed),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        yAxisID: 'y1',
      }
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Temperature (°C)'
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Wind Speed (km/h)'
        },
      },
    },
  };

  return (
    <div className="h-full p-4 bg-black">
      <h2 className="text-xl font-semibold mb-4 text-blue-500 flex justify-center">Weather Trends</h2>
      
      {loading && (
        <div className="flex justify-center items-center h-full">
          <p className="text-blue-500">Loading weather data...</p>
        </div>
      )}
      
      {error && (
        <div className="flex justify-center items-center h-full">
          <p className="text-red-500">Error: {error}. Please try again later.</p>
        </div>
      )}
      
      {!loading && !error && weatherData.length > 0 && (
        <div style={{ width: '90%', height: '290px', maxWidth: '600px', margin: '0 auto' }} ><Line data={chartData} options={options} /></div>
      )}
      
      {!loading && !error && weatherData.length === 0 && (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-500">No weather data available</p>
        </div>
      )}
    </div>
  );
};

export default WeatherGraph;
