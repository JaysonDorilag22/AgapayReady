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
    <div className="max-w-md mx-auto mt-1 bg-white p-5 rounded-md shadow-lg outline outline-1 outline-slate-400">
        <div className='items-center justify-between gap-8 p-4 border-t'>
            <h2 className="title-font mb-1 text-lg font-medium text-gray-900 text-center">Weather in Taguig City</h2>
            <img src={iconUrl} alt="Weather icon" className="mb-4 mt-7 w-full" />
            <p className='mt-16'>{currentDate.toLocaleString()}</p>
            <p className="text-lg">Weather: {weatherData.WeatherText}</p>
            <p className="text-lg mb-2">Temperature: {weatherData.Temperature.Metric.Value}°{weatherData.Temperature.Metric.Unit}</p>
        </div>
    </div>
  );
};

export default WeatherCondition;