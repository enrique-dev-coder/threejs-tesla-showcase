import React from 'react';
import { Suspense } from 'react';
import Dragable from './Dragable';
import BoundingBox from './BoundingBox';
import Model from './Model';
//sin el trnasformGroup en los gragable se hace un cagadero y pudes sacar todos los componentes del modelo
const Cars = () => {
  return (
    <Suspense fallback={null}>
      <Dragable transformGroup>
        <BoundingBox
          //visible
          position={[4, 3, 0]}
          dims={[3, 2, 6]}
          offset={[0, -0.4, 1]}
        >
          <Model
            path="/tesla_model_3/scene.gltf"
            scale={new Array(3).fill(0.01)}
            //controlar la posicion desde la bounding box
            //position={[4, 0.6, 0]}
          />
        </BoundingBox>
      </Dragable>
      <Dragable transformGroup>
        <BoundingBox
          //visible
          position={[-4, 3, 0]}
          dims={[3, 2, 6]}
          offset={[0, -0.8, 0]}
        >
          <Model
            path="/tesla_model_s/scene.gltf"
            scale={new Array(3).fill(0.7)}
          />
        </BoundingBox>
      </Dragable>
      <Dragable transformGroup>
        <group rotation={[0, 1, 0]}>
          <Model
            path="/robot_playground/scene.gltf"
            scale={new Array(3).fill(0.7)}
            position={[0, 1, 0]}
          />
        </group>
      </Dragable>
    </Suspense>
  );
};

export default Cars;
