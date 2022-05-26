import React from 'react';
import state from '../state';
const style = {
  zIndex: 1,
  position: 'absolute',
  bottom: '30vh',
  //left: '40vw',
  height: '30px',
  width: '30px',
  background: 'white',
  textAlign: 'center',
  borderRadius: '100%',
  fontSize: 20,
  fontWeight: 'bold',
  cursor: 'pointer',
  border: '1px solid black',
};

const CameraButtons = () => {
  //el estado global se prodria decir trae una camara position y un target la idea es que cuando se le de click agarre  la poscion y el target que le estamos pasamndo con el boton
  const positions = {
    //saber a cual carro tamos viendo (pintura)
    1: {
      cameraPos: [9, 2, 4],
      target: [4, 0, 0],
      name: 'Capot001_CAR_PAINT_0',
    },
    2: {
      cameraPos: [1, 2, 5],
      target: [-4, 0, 0],
      name: 'object005_bod_0',
    },
  };
  const handleClick = (num) => {
    //usas el set para darle ese valor al vector y los ... para copiar todo el array de positions y el numero que le des
    state.cameraPos.set(...positions[num].cameraPos);
    state.target.set(...positions[num].target);
    state.activeMeshName = positions[num].name;
    state.shouldUpdate = true;
  };

  return (
    <>
      <div
        onClick={(e) => handleClick(2)}
        style={{
          //truco para hacer posicionamiento respecto a largo  y hancho de la pantalla
          left: '40vw',
          ...style,
        }}
      >
        {'<'}
      </div>
      <div
        onClick={(e) => handleClick(1)}
        style={{
          //truco para hacer posicionamiento respecto a largo  y hancho de la pantalla

          right: '40vw',
          ...style,
        }}
      >
        {'>'}
      </div>
    </>
  );
};

export default CameraButtons;
