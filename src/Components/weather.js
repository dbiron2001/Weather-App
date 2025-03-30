import React, { useState } from "react";
import axios from "axios";
import "./weather.css";
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm,  WiHumidity, WiStrongWind } from 'react-icons/wi';

const WeatherCard = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = "8abb61629dbbdae78730e15b2d32ad52";
  
  const fetchWeather = async () => {
    if (!city) {
      alert("Please enter a city name.");
      return;
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      console.log("Weather Data:", response.data); // Debugging
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  const getWeatherIcon = (condition) => {
    const icons = {
      Clear: <WiDaySunny size={60} color="orange" />,
      Clouds: <WiCloud size={60} color="gray" />,
      Rain: <WiRain size={60} color="blue" />,
      Snow: <WiSnow size={60} color="lightblue" />,
      Thunderstorm: <WiThunderstorm size={50} color="purple" />,
      Mist: <WiCloud size={60} color="gray" />,
      Fog: <WiCloud size={60} color="gray" />,
    };
    return icons[condition] || <WiDaySunny size={50} color="orange" />;
  };
  const getBackground = () => {
    if (!weather) return "bg-gray-300";
    const condition = weather.weather[0].main;
    if (condition.includes("Cloud")) return "bg-blue-400";
    if (condition.includes("Rain")) return "bg-gray-600";
    if (condition.includes("Clear")) return "bg-yellow-400";
    return "bg-gray-300";
  };

  return (
    <div className={`p-6 rounded-xl shadow-xl text-black ${getBackground()} w-96 mx-auto mt-10`}>
      <input
        type="text"
        placeholder="Enter city"
        className="w-full p-2 text-black rounded-md"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button
        className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
        onClick={fetchWeather}
      >
        Get Weather
      </button>

      {weather && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-bold">{weather.name}, {weather.sys.country} {getWeatherIcon(weather.weather[0].main)}</h3>
          <p className="text-5xl font-semibold">{weather.main.temp}°C</p>
          <p className="capitalize text-lg">{weather.weather[0].description}</p>
          <div className="flex justify-between mt-4 text-sm">
            <p> <WiHumidity size={34} className="mr-2" /> Humidity: {weather.main.humidity}%</p>
            <p> <WiStrongWind size={34} className="mr-2" /> Wind: {weather.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
