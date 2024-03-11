import React, { useState, useEffect } from "react";
import { FaRegCheckCircle, FaSearch } from "react-icons/fa";


/* function Model({ url }) {
  const glb = useGLTF(url);
  const ref = React.useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return <primitive object={glb.scene} dispose={null} ref={ref} />;
} */

const  EvacuationGuidelines = () => {
  return (
    <div className="p-4 mb-10 mt-5">
        <>
          <div className="max-w-xl mx-auto space-y-3 sm:text-center mb-5">
            <h3 className="text-red-600 font-semibold">
              Guideline Categories
            </h3>
            <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Connecting You to Safety
            </p>
            <p>
              We prioritize safety and preparedness. Here, you'll find a comprehensive array of categories designed to equip you with the knowledge and tools needed to navigate various emergency situations effectively.
            </p>
          </div>
          <div className="flex flex-1 items-center justify-center mb-10">
            <div className="w-full max-w-lg">
              <p>1qwe</p>
            </div>
          </div>
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            
          <Card
              Icon={FaRegCheckCircle}
            />

          </div>
        </>
    </div>
  );
};

const Card = ({Icon}) => {
  return (
    <div href="#" className="w-full p-4 rounded border-[1px] border-slate-300 relative overflow-hidden group bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-red-400 group-hover:rotate-12 transition-transform duration-300" />
      <Icon className="mb-2 text-2xl text-red-600 group-hover:text-white transition-colors relative z-10 duration-300" />
      <h3 className="font-medium text-lg text-slate-950 group-hover:text-white relative z-10 duration-300">
        TRY
      </h3>
      <p className="text-slate-400 group-hover:text-red-200 relative z-10 duration-300">
        natin baka mag work
      </p>
    </div>
  );
};

export default EvacuationGuidelines;