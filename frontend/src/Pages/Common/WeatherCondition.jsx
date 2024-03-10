import React, { useEffect, useState } from 'react';
import { getCity, getWeather } from './../../AccuWeatherAPI/forecast'; // import the functions

const WeatherCondition = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cityData = await getCity('Taguig');
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
  const iconNumber = String(weatherData.WeatherIcon).padStart(2, '0');
  const iconUrl = `https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`;

  return (
    <div className="max-w-xs overflow-hidden rounded-lg shadow-lg bg-red-500 text-white ">
        <div className='flex items-center justify-between gap-8 p-4 border-t'>
            <h2 className="text-2xl font-bold mb-4">Weather in Taguig City</h2>
            <p>{currentDate.toLocaleString()}</p>
            <img src={iconUrl} alt="Weather icon" className="mb-4" />
            <p className="text-lg">Weather: {weatherData.WeatherText}</p>
            <p className="text-lg mb-2">Temperature: {weatherData.Temperature.Metric.Value}°{weatherData.Temperature.Metric.Unit}</p>
        </div>
    </div>
  );
};

export default WeatherCondition;