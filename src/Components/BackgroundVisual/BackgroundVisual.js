
import { useRef, useEffect, useMemo, Suspense } from 'react';


import * as THREE from 'three'
import { Canvas, useLoader} from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import {Stars, Stage, Box, OrbitControls, useFBX,GradientTexture, MeshDistortMaterial, Text } from "@react-three/drei"

import './BackgroundVisual.css'

import Model from './Model/Model';

const textProps = {
  fontSize: 3.9,
  // font: '../public/Font/Georama/Georama-Medium.ttf'
}



function TCal({ layers = undefined, ...props }) {
  const group = useRef()
  useEffect(() => {
    group.current.lookAt(0, 0, 0)
  }, [])
       
  return (
    <group {...props} ref={group}>
      <Text depthTest={false} material-toneMapped={true} {...textProps} layers={layers}>
        {props.name}
      </Text>
     
    </group>
  )
}

function Title({ layers = undefined, ...props }) {
  const group = useRef()
  useEffect(() => {
    group.current.lookAt(0, 0, 0)
  }, [])

  return (
    <group {...props} ref={group}>
      <Text depthTest={false} material-toneMapped={true} {...textProps} layers={layers}>
        HALLO:Radio

        <MeshDistortMaterial
              color="white"
              attach="material"
              // wireframe={true}
              distort={0.} // Strength, 0 disables the effect (default=1)
              speed={0.2} // Speed (default=1)
    >
              <GradientTexture
             
      stops={[0, 1]} // As many stops as you want
      colors={['blue', 'purple']} // Colors need to match the number of stops
      colors={['blue', 'purple']} // Colors need to match the number of stops
      size={512} // Size is optional, default = 1024
    />
            
            </MeshDistortMaterial>

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



function Boxxx() {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" />
      {/* <meshLambertMaterial attach="material" color="hotpink" /> */}
      <meshStandardMaterial dithering={true} color={"red"} />
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
              distort={0} // Strength, 0 disables the effect (default=1)
              speed={1} // Speed (default=1)
            />
        </mesh>
      );
    });

  return spheres;
}

function Scene() {
  const gltf = useLoader(GLTFLoader, Model)
  return ( 
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
    </Suspense>
  )
}

export function BackgroundVisual({week}){
  const ref = useRef()
  
  return(

    <div className="bg-visual"> 
    
        <Canvas>

        <Suspense fallback={<Title scale={12} position={[0, 0, 0]} inpText=""/>}>
        <Stage controls={ref} preset="rembrandt" intensity={1}  environment="city">
          <Model scale={2} >

          </Model>
        </Stage>
      </Suspense>


          <Stars />
          {/* <ambientLight  intensity={0.}/> */}
          <OrbitControls />

          {/* <TCal name=
          {week ? 
            "ahhh"
            // console.log(week[0][0].summary)
            :
            "loading..." 
          }
          /> */}

          
         </Canvas>
      </div>
    )
}

