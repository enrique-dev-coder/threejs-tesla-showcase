import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';

//foco xd
//en la docmuentacion de threejs vienen las propiedadades del material
//mesh hereda las propiedades de object3D
const Bulb = (props) => {
  const ref = useRef();
  const { scene } = useThree();
  //console.log(scene); si hay lights xd
  //vamos a adjuntar una referencia para que cuando se renderice el objeto la tenga
  useEffect(() => {
    if (scene.lights) {
      scene.lights.push(ref);
    } else {
      scene.lights = [ref];
    }
  }, []);
  console.log(scene.lights);
  return (
    //ese ref es para que te agarren lo mesh
    <mesh {...props} ref={ref}>
      {/*agregar luz al foco y habilitamos la propiedad de castShadow */}
      <pointLight
        castShadow
        shadow-mapSize-height={2 ** 10}
        shadow-mapSize-width={2 ** 10}
        shadow-radius={10}
      />
      {/*en los args paso como array los argumentos que quiero meodificar*/}
      <sphereBufferGeometry args={[0.2, 20, 20]} />
      <meshPhongMaterial emissive="yellow" />
    </mesh>
  );
};

export default Bulb;
