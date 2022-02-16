
import { React, Suspense, useRef, useEffect, useMemo } from 'react';


import * as THREE from 'three'
import { Canvas } from '@react-three/fiber';
import {Stars, Box, OrbitControls, useFBX, MeshDistortMaterial, Text } from "@react-three/drei"

import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { shaderMaterial } from '@react-three/drei/core/useGLTF'


import './BackgroundVisual.css'

import Objecto from './arterien.glb'


const textProps = {
  fontSize: 3.9,
  font: '../public/Font/Georama/Georama-Medium.ttf'
}

function Title({ layers = undefined, ...props }) {
  const group = useRef()
  useEffect(() => {
    group.current.lookAt(0, 0, 0)
  }, [])

  return (
    <group {...props} ref={group}>
      <Text depthTest={false} material-toneMapped={false} {...textProps} layers={layers}>
        HALLO:Radio
      </Text>
    </group>
  )
}


function TitleCopies({ layers }) {
  const vertices = useMemo(() => {
    const y = new THREE.IcosahedronGeometry(12)
    return y.vertices
  }, [])

  return (
    <group name="titleCopies">
      {vertices.map((vertex, i) => (
        <Title name={'titleCopy-' + i} position={vertex} layers={layers} />
      ))}
    </group>
  )
}

function Scene() {
  return (
    <group name="sceneContainer">
      <TitleCopies />
    </group>
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

const Fallback = () => (
  <Boxxx />
);
const Sphere = (props) => {
  return (
    <mesh position={props.position}>
      <sphereBufferGeometry args={[0.25, 24, 24]} />
      <meshStandardMaterial color={"red"} />
    </mesh>
  );
};


function Grid() {
  const x = 10;
  const y = 10;

  const spheres = Array(x * y)
    .fill()
    .map((s, i) => {
      return (
        <mesh
          position={[x * -0.5 + Math.floor(i / x), y * -0.5 + (i % y), 0]}
        >
        <boxBufferGeometry attach="geometry"
          attach="geometry"
        />
          <MeshDistortMaterial
              attach="material"
              distort={1} // Strength, 0 disables the effect (default=1)
              speed={1} // Speed (default=1)
            />
        </mesh>
      );
    });

  return spheres;
}

function Ggg() {
  const gltf = useLoader(GLTFLoader, Objecto)
  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
    </Suspense>
  )
}


export function BackgroundVisual(){
  return(

    <div className="bg-visual"> 
    
        <Canvas>
          <Stars />
          <ambientLight  intensity={1}/>
          <OrbitControls />
            {/* <Ggg /> */}
          <Title />
         </Canvas>
      </div>
    )
}

