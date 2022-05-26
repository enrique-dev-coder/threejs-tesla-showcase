import * as THREE from 'three';
//model3 name :name: "Capot001_CAR_PAINT_0"
//model s name:  "object005_bod_0"
//vamos a comparar vectores por eso creamos unos nuevos con THREE
const state = {
  //el estado inicial , inicia con el nombre del modelo de tesla 3
  activeMesh: {},
  activeMeshName: 'Capot001_CAR_PAINT_0',
  cameraPos: new THREE.Vector3(9, 2, 4),
  target: new THREE.Vector3(4, 0, 0),
  shouldUpdate: true,
};

export default state;
