import { extend, useThree } from '@react-three/fiber';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
extend({ OrbitControls });

const Orbit = () => {
  const { camera, gl } = useThree();
  //si hacemos el attach , esto le da acceso al objeto de scene para btener las propiedades de orbit controls
  return (
    <orbitControls attach="orbitControls" args={[camera, gl.domElement]} />
  );
};

export default Orbit;
