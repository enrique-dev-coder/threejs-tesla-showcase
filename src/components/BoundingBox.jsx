import { useBox } from '@react-three/cannon';

import React from 'react';
//caja contenedora
//la bounding box es una caja que toma como grupo a los modelos algo asi como un wrapper
//tiene la posicon en el que estara el modelo
//el offset es para aomodar el modelo en la boundingbox
const BoundingBox = ({
  position = [0, 0, 0],
  offset = [0, 0, 0],
  dims = [1, 1, 1],
  visible = false,
  children,
}) => {
  const [ref, api] = useBox(() => ({
    mass: 1,
    args: dims,
    position: position,
  }));
  //el group es como un contenedor de otros objetos
  return (
    <group ref={ref} api={api}>
      <mesh scale={dims} visible={visible}>
        <boxBufferGeometry />
        <meshPhysicalMaterial wireframe color="green" />
      </mesh>
      <group position={offset}>{children}</group>
    </group>
  );
};

export default BoundingBox;
