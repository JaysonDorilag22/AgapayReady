import React from "react";
import { Link } from "react-router-dom";
import Features from "../../Components/Features";
import Banner from "../../Components/Banner";
import Forms from "../../Components/Resgiter";
import ShuffleHero from "../../Components/ShuffleHero";
import Blog from "../../Components/Blog";
export default function landingPage() {
  return (
    <div>
    <ShuffleHero/>
      <Banner/>
      <Features/>
      <Blog/>
      <Forms/>
    </div>
  );
}
