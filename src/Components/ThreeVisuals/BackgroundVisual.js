
import { React, Suspense } from 'react';


import { Canvas } from '@react-three/fiber';
import {Stars, Box, OrbitControls, useTexture, Text } from "@react-three/drei"

import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'


function SceneFBX() {
  const obj = useLoader(OBJLoader, '/3DModel/arterien.obj')
  return <primitive position={10,10,10}  scale={1.4} object={obj} >
     <meshLambertMaterial attach="material" color="hotpink" />
  </primitive>

}

function Scene() {
  const gltf = useLoader(GLTFLoader, './3dModel/suzanne.gltf')
  return (
    <Suspense fallback={null}>
      <primitive object={gltf.suzanne} />
    </Suspense>
  )
}

function Boxxx() {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

export function BackgroundVisual(){
  return(

    <div className="bg-visual">
        <Canvas>
          <Stars />
          <ambientLight  intensity={1}/>
          <OrbitControls />
          <Boxxx />
          {/* <Suspense fallback={null}>
            <SceneFBX />
        </Suspense> */}
        </Canvas>
      </div>
    )
}