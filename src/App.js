import { Suspense } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import Orbit from './components/Orbit';
import Floor from './components/Floor';
import Lights from './components/Lights';
import Background from './components/Background';
import ColorPicker from './components/ColorPicker';
import Cars from './components/Cars';
import { Physics } from '@react-three/cannon';
import CameraControls from './components/CameraControls';
import CameraButtons from './components/CameraButtons';
import Effects from './components/Effects';

//NOTE para usar una textura se tiene que cargar con un testure loader que se usa desde el hook

function App() {
  //el animation loop se usa desde el useFrame
  //el point light es un punto de luz que es invisible y slae desde el origen
  //un uso comun de esto es simular un foco

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {/*color picker*/}
      <ColorPicker />
      <CameraButtons />
      <Canvas
        style={{ background: 'black' }}
        //poner la camara desde arriba
        camera={{ position: [6, 6, 6] }}
        shadows
        //opciones de rendereizado recomendadas por post processing
        gl={{
          powerPreference: 'high-performance',
          antialias: false,
          stencil: false,
          depth: false,
        }}
      >
        <CameraControls />
        <Orbit />
        <Lights />
        <Physics>
          <Cars />
          <Floor position={[0, -0.5, 0]} />,
          <Suspense fallback={null}>
            <Background />
          </Suspense>
          <axesHelper args={[5]} visible={false} />
        </Physics>
        {/*la fog va a ser adjuntada a la propiedad de fog de la escena
        scene tiene apropiedades como fog background etc*/}
        {/* <fog attach="fog" args={['white', 1, 10]} /> */}
        {/*efectos de post processing se agregan en el effects composer*/}
        <Effects />
      </Canvas>
    </div>
  );
}

export default App;
