import { useBox } from '@react-three/cannon';

//piso
const Floor = (props) => {
  //en la documentacion de usebox dice que se tiene que dar un ref y un callback con las propiedades
  //los objetos con fisicas ya deben estar dentro de un pshycs context provider

  const [ref, api] = useBox(() => ({ args: [20, 1, 20], ...props }));
  //argumentos del constructor se pasan como args en base a un array de como viene en la documentacion
  //es como tener width : 10 ,height:1, depth:10
  //recibir todas las props de mesh
  //el piso a recibir sombra
  return (
    <mesh {...props} receiveShadow ref={ref}>
      <boxBufferGeometry args={[200, 1, 200]} />
      <meshPhysicalMaterial
        color="white"
        visible={true}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
};

export default Floor;
