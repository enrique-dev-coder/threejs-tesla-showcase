import * as THREE from 'three';
import { useMemo } from 'react';
import { useThree, useLoader } from '@react-three/fiber';
//fondo
const Background = () => {
  const texture = useLoader(THREE.TextureLoader, '/autoshop.jpg');
  //el attach se usa para las propiedades de la escena y el primitive es como poner un objeto basico en react three fiber
  //al usar un loader se tiene que usar el suspense porque esta cargando async
  const { gl } = useThree();
  //Equirectanguralr texture recibe el render y la textura como argumentos
  //al parecer un cubeRenderTarget quiere decir que es como si se creara una camara de cubo
  //para el equirectangurlar Use this method if you want to convert an equirectangular panorama to the cubemap format.
  const formatted = useMemo(
    () =>
      new THREE.WebGLCubeRenderTarget(
        texture.image.height
      ).fromEquirectangularTexture(gl, texture),
    []
  );

  return <primitive attach="background" object={formatted.texture} />;
};

export default Background;
