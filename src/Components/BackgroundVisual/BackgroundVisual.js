
import {Suspense } from 'react';


import { Canvas } from '@react-three/fiber';
import {Stars,OrbitControls} from "@react-three/drei"

import './BackgroundVisual.css'

// import HRzentrale from './Model/HRzentrale';
import HRzentrale_LR from './Model/Model_lowres';


function Boxxx() {
  return (
    <mesh      
    >
      {/* <boxBufferGeometry attach="geometry" 

      />
      <meshStandardMaterial dithering={true} color={"red"} /> */}
    </mesh>
  );
}


export function BackgroundVisual({live}){
  return(

    <div className="bg-visual"> 
    
        <Canvas
          camera={{ zoom: .9, position: [0, 0, 15] }}
          // orthographic camera={{ zoom: 2.1, position: [0, 0, 25] }}
        >
    
          <pointLight position={[10,10, 10]} intensity={1.1}/>
          <ambientLight />

           <Suspense fallback={<Boxxx scale={[0.1]} position={[0, 0, 0]} />}>
            {/* <HRshuttle rotation={[Math.PI * 0.02,Math.PI * 1.45, Math.PI * -0.07]} position={[0,0,0]}  scale={0.08} /> */}
            <HRzentrale_LR rotation={[0 ,Math.PI * 1.45, 0]} position={[0,-0.35,0]}  scale={0.1}/>
           </Suspense>
   
            <Stars radius={200} depth={50} count={5000} factor={4} saturation={0} fade />
            <OrbitControls />
         </Canvas>
      </div>
    )
}

