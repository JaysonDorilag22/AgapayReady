import React from "react";
import { Link } from "react-router-dom";
import Features from "../../components/Features";
import Banner from "../../components/Banner";

import ShuffleHero from "../../components/ShuffleHero";
import Blog from "../../components/Blog";
// import Register from "./Register";
export default function landingPage() {
  return (
    <div>
    <ShuffleHero/>
      <Banner/>
      <Features/>
      <Blog/>
      {/* <Register/> */}
    </div>
  );
}
