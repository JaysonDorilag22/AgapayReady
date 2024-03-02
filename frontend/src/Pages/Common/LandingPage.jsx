import React from "react";
import ShuffleHero from "./ShuffleHero";
import Features from "../../components/Features";
import EarthquakeGuidelines from "./EarthquakeGuidelines";
import Teams from "./Teams";
import FAQSection from "./FAQSection";
export default function landingPage() {
  return (
    <div>
    <ShuffleHero/>
    <Features/>
    <Teams/>
    <FAQSection/>
    </div>
  );
}
