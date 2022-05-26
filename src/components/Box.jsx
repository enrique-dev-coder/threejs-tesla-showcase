import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react';
import { useBox } from '@react-three/cannon';
const Box = (props) => {
  //agregamos muna masa al obejot de confugaracion
  const [ref, api] = useBox(() => ({ mass: 1, ...props }));
  //usamos el  ref para darle la rotacion al objeto
  //const ref = useRef();
  //cargamos la textura
  //NOTE  el loader es una fucnion async porque va a cargar una textura para que funcione podemos usar suspense para que espere todas la llamadas async antes de renderear el componente
  const texture = useLoader(THREE.TextureLoader, '/tierra.jpg');
  useFrame((state) => {
    //agarramos el obejot de mesh lo cual es el cubito con el material por el use REF
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  const handlePointerDown = (e) => {
    console.log(e);
    //NOTE guardar el objeto en el window, esto es como manejar un estado global lo cual no es bueno para produccion
    e.object.active = true;
    window.activeMesh = e.object;
    if (window.activeMesh) {
      scaleDown(window.activeMesh);
      window.activeMesh.active = false;
    }
  };

  const handlePointerEnter = (e) => {
    //hacer mas grande el cubo cuando entre el mouse
    e.object.scale.x = 1.5;
    e.object.scale.y = 1.5;
    e.object.scale.z = 1.5;
  };
  const scaleDown = (object) => {
    object.scale.x = 1;
    object.scale.y = 1;
    object.scale.z = 1;
  };
  const handlePointerLeave = (e) => {
    if (!e.object.active) {
      scaleDown(e.object);
    }
  };
  return (
    //hacemos esto para darle propiedades como la position a la caja
    //el fog false es para que no le afecte la niebla al material
    //el fog property viene de mesh standard material
    <mesh
      ref={ref}
      hola="hola"
      api={api}
      {...props}
      //api de las fisicas como propiedad
      onPointerDown={handlePointerDown}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      castShadow
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial
        //la propiedad map es la que carga la textura
        map={texture}
      />
    </mesh>
  );
};

export default Box;
