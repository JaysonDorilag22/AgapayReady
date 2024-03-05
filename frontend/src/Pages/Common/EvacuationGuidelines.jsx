import React from 'react'
import { createRoot } from 'react-dom/client'
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

export default function EvacuationGuidelines() {
  return (
    <div>
    <section className="relative flex h-15 place-items-center justify-end mb-4 bg-gray-900 lg:col-span-5 lg:h-screen xl:col-span-6">
            {/* Image */}
            <img
              alt="Night"
              src="https://the-post-assets.sgp1.digitaloceanspaces.com/2022/12/TUP_thumbnail.png"
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />
            {/* Text */}
            <div className="hidden lg:relative lg:block lg:p-12">
              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                PREPARE FOR AN EARTHQUAKE
              </h2>
              <p className="mt-4 leading-relaxed text-white/90">
                A step by step guidance for earthquake preparedness.
                At AgapayReady we offer helpful guidance to keep you safe and
                empowered.
              </p>
            </div>
          </section>
        <div className="canvas-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          
          <div className="max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10">
            <Canvas style={{ width: "400px", height: "400px" }} camera={{ position: [90, 70, 60] }}>
              <ambientLight intensity={5} />
              <spotLight position={[20, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              <Model url="/models/tupnga.glb" />
              <OrbitControls />
            </Canvas>
          </div>
        </div>
        <motion.div className='mx-auto' initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h1 className='text-4xl text-center font-bold py-8'>EARTHQUAKE GUIDELINES</h1>
            <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                <li>
                    <div className="timeline-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                    </div>
                    <div className="timeline-start md:text-end mb-10">
                    <time className="font-mono italic">Year-Round</time>
                    <div className="text-lg font-black">Days before an earthquake</div>
                    Identify hazards in your home: Secure furniture, shelves, and heavy objects to walls. Learn where gas, water, and electrical shutoff valves are located. Develop a family emergency plan: Discuss communication strategies, evacuation routes, and meeting locations. Prepare an emergency kit with essentials like water, food, first-aid supplies, medications, and a flashlight. Download earthquake warning apps: Stay informed about potential earthquakes in your area.
                    </div>
                    <hr/>
                </li>
                <li>
                    <hr />
                    <div className="timeline-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                    </div>
                    <div className="timeline-end mb-10">
                    <time className="font-mono italic">During an Earthquake</time>
                    <div className="text-lg font-black">First seconds</div>
                    Drop, Cover, and Hold On: If indoors, immediately drop to the ground, take cover under a sturdy object, and hold on until the shaking stops. Stay away from windows, mirrors, and bookcases.
                    Evacuate if outside: If outdoors, move away from buildings, trees, power lines, and other falling hazards. Move to an open area and lay flat on the ground.After the shaking stops:Check for injuries: Assist those in need and call emergency services if necessary.
                    Expect aftershocks: Be prepared for smaller earthquakes that may follow the main event.
                    Listen to official reports: Stay informed about potential hazards and follow instructions from authorities.
                    </div>
                    <hr />
                </li>
                <li>
                    <hr />
                    <div className="timeline-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                    </div>
                    <div className="timeline-start md:text-end mb-10">
                    <time className="font-mono italic">After an Earthquake</time>
                    <div className="text-lg font-black">First hours - days</div>
                    Check for damage: Assess the damage to your home and surroundings. Be cautious of gas leaks, electrical hazards, and structural instability.
Turn off utilities: If you suspect damage to gas, water, or electrical lines, turn off the main valves or switches.
Contact loved ones: Communicate with family and friends to share your status and ensure their safety.
Heed evacuation orders: Follow instructions from authorities if evacuation is necessary.
Use caution when driving: Be aware of potential road closures, debris, and traffic congestion.
                    </div>
                    <hr />
                </li>
            </ul>
            
            <div className='flex justify-center items-center py-8' >
                <div className='card  w-100 glass'>
                <img src='/TUP MAP.svg'></img>
                </div>
                
            </div>
            
        </motion.div>
    </div>

    
  )
}
