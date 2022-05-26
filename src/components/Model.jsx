import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
const Model = ({ path, scale, position }) => {
  const model = useLoader(GLTFLoader, path);
  console.log(path, model);
  //agregamos el modelo a la
  //primiitve hereda todas las propiedades de objeto
  //el new Array(1) = [1,1,1]

  let mixer;
  //condicionale si tienen animaciones los modelos
  //en este caso el array trae un solo aniamtion clip
  if (model.animations.length > 0) {
    mixer = new THREE.AnimationMixer(model.scene);
    model.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.play();
    });
  }

  //llamar mixer al rendr loop , para tener acceso a eso hay que llamar al useFrame de react three

  useFrame((scene, delta) => {
    mixer?.update(delta);
  });

  //para agregar sombras a todo un modelo tenemos que usar un traverse, el traverse es un metodo de object3D que le pasara un callback a todos los children
  //en este caso vamos a revisar si del modelo hay algun meshpar aplicar shadow properties
  model.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      //la propiedad de side es para ver de que lado se proyectan las sombras
      child.material.side = THREE.FrontSide;
    }
  });
  return <primitive object={model.scene} scale={scale} position={position} />;
};

export default Model;
