import { useState, useEffect } from 'react';
import {
  EffectComposer,
  DepthOfField,
  DotScreen,
  Sepia,
  Noise,
  Vignette,
  Bloom,
  GodRays,
} from '@react-three/postprocessing';
import { useThree } from '@react-three/fiber';

const Effects = () => {
  const [lights, setLights] = useState(null);
  const { scene } = useThree();
  useEffect(() => {
    if (scene.lights && scene.lights.length === 3) {
      setLights(scene.lights);
    }
  }, [scene.lights]);
  console.log(lights);
  return lights ? (
    <EffectComposer>
      {/*     <DepthOfField
      //por ejemplo asi agregamos el depth of field que da cierta profundidad a la escena, aunquen no me gusta como se ve xd
      focusDistance={0}
      focalLength={0.02}
      bokehScale={2}
      height={480}
    /> */}
      {/*         <DotScreen scale={20} angle={45} /> */}
      {/* <Sepia /> */}
      {/*  <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} /> */}
      <Noise opacity={0.02} />
      {/*    <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
      {/*Obtienes el array de luces que se cargo en el useEffect
       todo el pedo que se hizo fue para pasar un array de objeots de luces,
       esos objetos se pueden pasar dese la escena
       
      
      */}
      {lights.map((light) => (
        <GodRays key={light.current.uuid} sun={light.current} />
      ))}
    </EffectComposer>
  ) : null;
};

export default Effects;
