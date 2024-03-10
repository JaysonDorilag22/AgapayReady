import React, { useEffect } from "react";
import ShuffleHero from "./ShuffleHero";
import Features from "./Features";
import Teams from "./Teams";
import FAQSection from "./FAQSection";
import { getCity } from './../../AccuWeatherAPI/forecast'
import { getWeather } from './../../AccuWeatherAPI/forecast'
import WeatherCondition from "./WeatherCondition";

export default function landingPage() {
  useEffect(() => {
    // Call the getCity function inside the useEffect hook
    getCity('Taguig')
      .then(data => {
        return getWeather(data.Key)
      })
      .catch(error => console.error(error));
  }, []); // Empty dependency array ensures this effect runs only once after component mount


  return (
    <div>
    <ShuffleHero/>
    <Features/>
    <Teams/>
    <FAQSection/>
    <WeatherCondition/>
    </div>
  );
}

