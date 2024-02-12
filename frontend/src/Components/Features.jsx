import React from "react";
import EvacuationSVG from "../assets/services/Evacuation.svg";
import DrillsSVG from "../assets/services/EmergencyDrills.svg";
import ContactsSVG from "../assets/services/Contacts.svg";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { RiGuideFill } from "react-icons/ri";
import { MdOutlineUpdate } from "react-icons/md";
import Mapping from "./Mapping";
export default function Features() {
  const features = [
    {
      name: "Evacuation guide",
      description:
        "Navigate evacuation routes with ease. AgapayReady provides step-by-step guidance to ensure your safety during emergencies.",
      icon: FaMapMarkedAlt,
    },
    {
      name: "Contact Support",
      description:
        "Access emergency assistance with ease. Find essential contact numbers for immediate support during crises.",
      icon: FaPhoneAlt,
    },
    {
      name: "Emergency drills gruide",
      description:
        "Prepare effectively with comprehensive drill guides. Access resources and instructions to enhance your readiness for emergency situations.",
      icon: RiGuideFill,
    },
    {
      name: "Realtime updates",
      description:
        "Stay informed and ready for action with live updates. Access detailed guides and essential resources instantly, empowering you to respond effectively to emergency situations as they unfold.",
      icon: MdOutlineUpdate,
    },
  ];
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-red-600">
                Ready When You Need It
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Explore Our Services
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our service is here to assist you. AgapayReady ensures you're
                prepared to respond effectively in any emergency.
              </p>

              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        className="absolute left-1 top-1 h-5 w-5 text-red-600"
                        aria-hidden="true"
                      />
                      {feature.name}
                    </dt>{" "}
                    <br />
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <Mapping
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </div>
    // <div className="mx-auto max-w-10xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

    //   <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-center md:gap-8">
    //     <div className="rounded-2xl border border-gray-300 p-6 shadow-sm sm:px-8 lg:p-12">
    //       <div className="text-center">
    //         <img
    //           src={EvacuationSVG}
    //           alt="Evacuation Guide"
    //           className="mx-auto max-w-xs"
    //         />{" "}
    //       </div>

    //       <div className="mt-6 space-y-2">
    //         <h1 className="font-extrabold text-3xl text-red-700">
    //           Evacuation Guide
    //         </h1>
    //         <p className="flex items-center gap-1 justify-center">
    //           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam
    //           nobis in error repellat voluptatibus ad.
    //         </p>
    //       </div>

    //       <a
    //         href="#"
    //         className="mt-8 block rounded-md border border-red-600 bg-white px-12 py-3 text-center text-sm font-medium text-red-600 hover:ring-1 hover:ring-red-600 focus:outline-none focus:ring active:text-red-500"
    //       >
    //         Show Demo
    //       </a>
    //     </div>

    //     <div className="rounded-2xl border border-gray-300 p-6 shadow-sm sm:px-8 lg:p-12">
    //       <div className="text-center">
    //         <img
    //           src={DrillsSVG}
    //           alt="Emergency Drills"
    //           className="mx-auto max-w-xs"
    //         />{" "}
    //       </div>

    //       <div className="mt-6 space-y-2">
    //         <h1 className="font-extrabold text-3xl text-red-700">
    //           Emergency Drills
    //         </h1>
    //         <p className="flex items-center gap-1 justify-center">
    //           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam
    //           nobis in error repellat voluptatibus ad.
    //         </p>
    //       </div>

    //       <a
    //         href="#"
    //         className="mt-8 block rounded-md border border-red-600 bg-white px-12 py-3 text-center text-sm font-medium text-red-600 hover:ring-1 hover:ring-red-600 focus:outline-none focus:ring active:text-red-500"
    //       >
    //         Show Demo
    //       </a>
    //     </div>
    //     <div className="rounded-2xl border border-gray-300 p-6 shadow-sm sm:px-8 lg:p-12">
    //       <div className="text-center">
    //         <img
    //           src={ContactsSVG}
    //           alt="Contact Support"
    //           className="mx-auto max-w-xs"
    //         />{" "}
    //       </div>

    //       <div className="mt-6 space-y-2">
    //         <h1 className="font-extrabold text-3xl text-red-700">
    //           Contact Support
    //         </h1>
    //         <p className="flex items-center gap-1 justify-center">
    //           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam
    //           nobis in error repellat voluptatibus ad.
    //         </p>
    //       </div>

    //       <a
    //         href="#"
    //         className="mt-8 block rounded-md border border-red-600 bg-white px-12 py-3 text-center text-sm font-medium text-red-600 hover:ring-1 hover:ring-red-600 focus:outline-none focus:ring active:text-red-500"
    //       >
    //         Show Demo
    //       </a>
    //     </div>
    //   </div>
    // </div>
  );
}
