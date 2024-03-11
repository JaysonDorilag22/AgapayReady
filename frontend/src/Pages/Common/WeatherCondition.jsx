import React, { useEffect, useState } from "react";
import { getCity, getWeather } from "./../../AccuWeatherAPI/forecast"; // import the functions

const WeatherCondition = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cityData = await getCity("Taguig");
        const weather = await getWeather(cityData.Key);
        setWeatherData(weather);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const timer = setInterval(() => {
      fetchData();
      setCurrentDate(new Date());
    }, 1800000); // Fetch new data every 30 minutes

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }
  const iconNumber = String(weatherData.WeatherIcon).padStart(2, "0");
  const iconUrl = `https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`;

  return (
    <div className=" mx-auto bg-slate-900 p-5 rounded-md shadow-lg outline outline-1 outline-slate-400">
      <div className="flex flex-col items-center justify-between p-4">
        <h1 className="mb-4 mt-5 text-4xl font-extrabold text-white">Taguig City</h1>
        <img
          src={iconUrl}
          alt="Weather icon"
          className="w-72 mx-auto mb-4 mt-7"
        />
        <p className="mt-7  text-white font-normal">
          {currentDate.toLocaleString()}
        </p>
        <p className="text-lg mb-2 text-white font-semibold">
          {weatherData.WeatherText}
        </p>
        <p className="text-lg text-white font-semibold mb-5">
          {weatherData.Temperature.Metric.Value}°
          {weatherData.Temperature.Metric.Unit}
        </p>
      </div>
    </div>
  );
};

export default WeatherCondition;
