import { useRef, useEffect, useState } from 'react';
import { extend, useThree } from '@react-three/fiber';
//los controles siempre estan en threejs examples jsm controls
import { DragControls } from 'three/examples/jsm/controls/DragControls';

//extender los drag controls a react three fiber
extend({ DragControls });

//NOTE el constructor de los drag controls toma objects,camera y dom element
//obtenemos la camara u el domElemnt(gl)  de useThree
//los dragable controles sera un envoltorio de todos los objetos que  vana ser dragable
//el equivalente del group const group = new THREE.Group() // <group>
//en threejs un grupo se hace para trabjar con grupos de objetos en 3D
/**
 * 
 * const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );

const cubeA = new THREE.Mesh( geometry, material );
cubeA.position.set( 100, 100, 0 );

const cubeB = new THREE.Mesh( geometry, material );
cubeB.position.set( -100, -100, 0 );

//create a group and add the two cubes
//These cubes can now be rotated / scaled etc as a group
const group = new THREE.Group();
group.add( cubeA );
group.add( cubeB );

scene.add( group );

el grupo lo agregmos al final a la escena
 */

const Dragable = (props) => {
  //el useRef lo utilizamos para que nos deje acceder a lo que hay dnetro del grupo algo asi como para seleccionarlo
  //dentro estan los children que son los objetos
  const groupRef = useRef();
  const controlsRef = useRef();
  const [children, setChildren] = useState([]);
  const { camera, gl, scene } = useThree();
  //usaremos el useEffect para que cuando se rendericen esos objetos en 3D se guarden en una varible
  //y se pasen como argumento a los drag controls
  useEffect(() => {
    //despues del primer render estos se pasan al array de children
    setChildren(groupRef.current.children);
  }, []);

  //usamos otro useEffect cuando se cargen los children se le pone un evento

  useEffect(() => {
    //agregamos un evet istenr a add contorls
    //seleccionamos el objeto con current y usamos el metodo addEventListener con un tipo y una funcion de callback
    //en la documentaicon de spueden encontrar los eventos  a los cuales se tiene acceso
    //https://threejs.org/docs/index.html?q=drag#examples/en/controls/DragControls
    controlsRef.current.addEventListener(
      'hoveron',
      (e) => (scene.orbitControls.enabled = false)
    );
    //evento de cuando dejas de hacer hover se activan otra vez los controles
    controlsRef.current.addEventListener(
      'hoveroff',
      (e) => (scene.orbitControls.enabled = true)
    );
    controlsRef.current.addEventListener('dragstart', (e) => {
      //sacmos el nombre del objeto , es imporate por ejemplo para segregar la pintura del carro
      console.log(e.object);
      e.object.api?.mass.set(0);
    });
    controlsRef.current.addEventListener('dragend', (e) =>
      e.object.api?.mass.set(1)
    );
    controlsRef.current.addEventListener('drag', (e) => {
      e.object.api?.position.copy(e.object.position);
      e.object.api?.velocity.set(0, 0, 0);
    });
    //cada que se carge el children por eso esta ahi en el useEffect()
  }, [children]);

  console.log(children);
  //recordemos que cuando un componente envuleve a otros eso soon un array de children
  //por eso es normal que se haga un destruturing comom {children}

  return (
    <group ref={groupRef}>
      {/*Estos controles por alguna razon van con minuscula y se psana dentro del gupo para que sean renderizados obviamente*/}
      <dragControls
        transformGroup={props.transformGroup}
        ref={controlsRef}
        args={[children, camera, gl.domElement]}
      />
      {props.children}
    </group>
  );
};

export default Dragable;
