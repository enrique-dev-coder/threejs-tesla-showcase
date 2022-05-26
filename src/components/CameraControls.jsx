import { useFrame } from '@react-three/fiber';
import state from '../state';
const CameraControls = () => {
  //creamos un vector3 que es una representacion de uin vector en 3D new THREE.Vector3( 0, 1, 0 );
  //el metodo .set es para darle los x y z al vector
  //el lerp es de vector 3 y la ide es interpolar vectores

  useFrame(({ camera, scene }) => {
    if (state.activeMesh.name !== state.activeMeshName) {
      state.activeMesh = scene.getObjectByName(state.activeMeshName) || {};
    }

    //vamos a condicionar si se tienen que modificar los orbit controls
    //revisar si mi posicion de la camara es igual a la posicion de la camara del state
    if (state.shouldUpdate) {
      camera.position.lerp(state.cameraPos, 0.1);
      //hacer que los robit controls enfoquen a una posicion la que queremos es la posicion del traget
      scene.orbitControls.target.lerp(state.target, 0.1);
      //como orbit controls esta attach a la escenea podemos hacer scene.orbitcontrols
      scene.orbitControls.update();
      //copiamos el vector de la posicion de la camara
      //el sub es para substraer un vector
      //es una resta de vectores de esas que no me acuerdo nada como hacer
      //de la posiocn actual de la camara le rstas el vector de la poscion del estado de la camara
      //el punto length es para calcular una distancia entonces sacamos la distancia de la resta de los dos vectores
      const diff = camera.position.clone().sub(state.cameraPos).length();
      //para que la diferencia sea 0 pues obviamente deben ser iguales
      if (diff < 0.1) {
        state.shouldUpdate = false;
      }
    }
  });
  return null;
};

export default CameraControls;
