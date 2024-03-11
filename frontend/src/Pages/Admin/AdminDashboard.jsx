import React from "react";
import UsersDepartment from "./charts/UsersDepartment";
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

      <div className="mx-auto max-w-screen-xl mt-16 px-2 py-16 sm:px-4 md:py-8 lg:px-4 rounded-lg ring-2 ring-red-600 text-center items-center">
      <h1 className="m-10 text-3xl font-bold">Users & Reports by Department</h1>

      <div className="grid grid-cols-1 gap-4 py-10 mx-auto m-auto rounded-md">
      <div className="flex-col justify-center items-center">
        <div className=" rounded-md ml-3">
          <UsersDepartment/>
        </div>
        <div className=" rounded-md m-3">
        <LineChart />
        </div>
      </div>
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
