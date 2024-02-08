import React from "react";
import Updates from "../Components/Updates";
import RecentNews from "../Components/RecentNews";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Features from "../Components/Features";
import Banner from "../Components/Banner";
import Forms from "../Components/Forms";
import ShuffleHero from "../Components/ShuffleHero";
import Blog from "../Components/Blog";
export default function landingPage() {
  return (
    <div>
    <ShuffleHero/>

      {/* <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-xxl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              AgapayReady
              <strong className="font-extrabold text-red-700 sm:block">
                Emergency Response App
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
              Your trusted partner in emergency response. Be prepared, stay
              safe, and act fast with AgapayReady.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block  rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                href="/get-started"
              >
                Get Started
              </a>

              <a
                className="block btn btn-outline px-12 py-3 text-sm font-medium hover:bg-red-60"
                href="/about"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section> */}
      <Banner/>
      <Features/>
      <div className="divider divider-error"></div>
      <Blog/>
      <Forms/>
      <Footer />
      
    </div>
  );
}
