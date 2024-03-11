import React from "react";
import PieChart from "./charts/PieChart";
import BarChart from "./charts/BarChart";
import LineChart from "./charts/LineChart";
// import * as THREE from "three";
// import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import Stats from "./stats/Stats";
import EmergencyReport from "./EmergencyReport";
import SentimentAnalysis from "./charts/SentimentAnalysis";
// import CustomKanban from "./CustomKanban";

function Model({ url }) {
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene} dispose={null} />;
}

export default function AdminDashboard() {
  return (
    <div>
      <div>
        {/* <h1 className="m-10 text-3xl font-bold">Dashboard</h1> */}

        <Stats />
      </div>
      <div className="divider"></div>
        <div className=" rounded-md mr-3">
          <SentimentAnalysis />
        </div>
      <h1 className="m-10 text-3xl font-bold">Graphs</h1>

      <div className="grid grid-cols-2 gap-4 py-10 mx-auto m-auto rounded-md">
        <div className=" rounded-md ml-3">
          {/* <PieChart /> */}
        </div>
        <div className=" rounded-md m-3">
          {/* <BarChart /> */}
        </div>
        <div className=" rounded-md mr-3">
          {/* <LineChart /> */}
        </div>
      </div>
      
      {/* <div className="Container mx-auto py-14">
        <Canvas style={{ width: "400px", height: "400px" }}>
          <ambientLight intensity={5} />
          <spotLight position={[20, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Model url="/models/thecontrolroom/scene.gltf" />
          <OrbitControls />
        </Canvas>
      </div> */}
      <div>
        {/* <CustomKanban /> */}
      </div>
      <h1 className="m-10 text-3xl font-bold">Reports</h1>
      <EmergencyReport/>
    </div>
  );
}
