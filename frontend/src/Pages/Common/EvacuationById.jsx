import React, { useState, useEffect } from "react";
import AOS from "aos";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { RiGuideFill } from "react-icons/ri";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import { useParams } from 'react-router-dom';
import Loader from '../Loader';

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
  const { guidelineId } = useParams();
  const [guideline, setGuideline] = useState(null);

  useEffect(() => {
    fetchEvacuationGuideline();
  }, [guidelineId]);

  const fetchEvacuationGuideline = async () => {
    try {
      const response = await fetch(`/api/v1/evacuation-guidelines/${guidelineId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch guideline');
      }
      const data = await response.json();
      setGuideline(data);
    } catch (error) {
      console.error('Error fetching guideline:', error);
    }
  };

  if (!guideline) {
    return <Loader />;
  }

  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-red-600">
                Evacuation for
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {guideline.name}
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our service is here to assist you. AgapayReady ensures you're
                prepared to respond effectively in any emergency.
              </p>
              <dl
                data-aos="fade-right"
                className="mt-10 max-w-4 space-y-8 text-base leading-7 text-gray-600 lg:max-w-9"
              >
                <div className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <FaMapMarkedAlt
                      className="absolute left-1 top-1 h-5 w-5 text-red-600"
                      aria-hidden="true"
                    />
                    Tips
                  </dt>{" "}
                  <br />
                  <dd className="inline w-[100px] overflow-ellipsis overflow-hidden">{guideline.tips}</dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="flex justify-center items-center w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0">
            <Canvas
              style={{ width: "768px", height: "768px" }}
              camera={{ position: [90, 70, 60] }}
            >
              <ambientLight intensity={1} />
              <spotLight position={[20, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              <Model url={guideline.glbfile} />
              <OrbitControls />
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  );
}