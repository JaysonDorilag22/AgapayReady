import React from "react";
import AOS from "aos";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { RiGuideFill } from "react-icons/ri";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { OrbitControls } from '@react-three/drei'
import { motion } from "framer-motion"

function Model({ url }) {
  const glb = useGLTF(url);
  const ref = React.useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return <primitive object={glb.scene} dispose={null} ref={ref} />;
}

export default function Features() {
  AOS.init();
  const features = [
    {
      name: "Emergency Evacuation Guidelines",
      description:
        "During emergencies such as fires, natural disasters, or other hazardous situations, swift and orderly evacuation is paramount for ensuring the safety of everyone on campus. This feature provides detailed evacuation guidelines, outlining evacuation procedures, assembly points, and other important information to facilitate a smooth and coordinated evacuation process, minimizing risks and maximizing safety.",
      icon: FaMapMarkedAlt,
    },
    {
      name: "Emergency Contacts",
      description:
        "In case of emergencies, it's crucial to have quick access to important contact information for emergency services such as police, fire department, ambulance, as well as campus security. This feature provides a centralized location for users to find these essential contact details, ensuring prompt and efficient response in critical situations.",
      icon: FaPhoneAlt,
    },
    {
      name: "Emergency Guidelines",
      description:
        "Emergencies can occur unexpectedly, and having clear guidelines for first aid, evacuation, and other necessary procedures is essential for ensuring the safety of individuals. This feature offers comprehensive guidelines to help users respond effectively to various emergency situations, providing step-by-step instructions and recommendations for appropriate actions.",
      icon: RiGuideFill,
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

              <dl data-aos="fade-right" className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
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
          {/* <img
          src='/TUP MAP.svg'
            data-aos="fade-left"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          /> */}
          <div className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0">
        <Canvas style={{ width: "768px", height: "768px" }} camera={{ position: [90, 70, 60] }}>
          <ambientLight intensity={5} />
          <spotLight position={[20, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Model url="/models/tupnga.glb" />
          <OrbitControls />
        </Canvas>
      </div>
        </div>
      </div>
    </div>
  );
}
