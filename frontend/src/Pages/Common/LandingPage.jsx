import React from "react";
import { Link } from "react-router-dom";
import Features from "../../Components/Features";
import Banner from "../../Components/Banner";

import ShuffleHero from "../../Components/ShuffleHero";
import Blog from "../../Components/Blog";
import Register from "./Register";
export default function landingPage() {
  return (
    <div>
    <ShuffleHero/>
      <Banner/>
      <Features/>
      <Blog/>
      <Register/>
    </div>
  );
}
