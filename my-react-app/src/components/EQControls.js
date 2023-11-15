import React, { useState, useEffect } from 'react';
import knobSvg from '../img/knob.svg'

export function EQKnob({ value, handleOnChange }) {
  const maxRotatevalue = 45;
  const minRotateValue = -150;
  const rangoDeg = 195;
  const rangoTotal = 40;

  const [rotateDegValue, setRotateDegValue] = useState('')
  
  useEffect(()=>{
    //const rotateValue = value * 2.5 ;
    setRotateDegValue((rangoDeg / rangoTotal) * value)
    
  }, [value])
  
  return (
    <div className='eq-knob-container'>
      <input
        className='eq-knob-input'
        type="range"
        min="-30"
        max="10"
        step="1"
        value={value}
        onChange={handleOnChange}
      />
      <div className='eq-knob-svg'>
        <img 
          src={knobSvg} 
          alt="perilla eq"
          style={{
            position: "absolute",
            transform: "rotate("+rotateDegValue+"deg)"
          }}
        ></img>
      </div>
      <span>{value > 0 ? "+"+value : value}</span>
    </div>
  )

}

function EQControls({ waveformObj, eqValues, onChangeEqValues }) {

  // Estado para almacenar el gain de los band EQ
  const [lowFrequency, setLowFrequency] = useState(0);
  const [midFrequency, setMidFrequency] = useState(0);
  const [highFrequency, setHighFrequency] = useState(0);

  // Función para aplicar los filtros de sonido
  const applyFilters = () => {
    // Crear filtros de tipo BiquadFilterNode
    const lowFilter = waveformObj.audioCtx.createBiquadFilter();
    const midFilter = waveformObj.audioCtx.createBiquadFilter();
    const highFilter = waveformObj.audioCtx.createBiquadFilter();

    // Configurar los filtros
    // BAJOS
    lowFilter.type = 'lowshelf';
    lowFilter.frequency.value = 500;
    lowFilter.gain.value = lowFrequency;

    // MEDIOS
    midFilter.type = 'peaking';
    midFilter.frequency.value = 1600;
    midFilter.gain.value = midFrequency;

    // AGUDOS
    highFilter.type = 'highshelf';
    highFilter.frequency.value = 10000;
    highFilter.gain.value = highFrequency;

    // Conectar los filtros en serie
    waveformObj.source.connect(lowFilter)
    lowFilter.connect(midFilter);
    midFilter.connect(highFilter);

    // Conectar la entrada y la salida del componente
    highFilter.connect(waveformObj.audioCtx.destination);

    // Devolver la función para desconectar los filtros
    return () => {
      lowFilter.disconnect();
      midFilter.disconnect();
      highFilter.disconnect();
    };
  };

  // Manejar cambios en las frecuencias de corte
  const handleLowFrequencyChange = (e) => {
    setLowFrequency(parseFloat(e.target.value));
    updateEQValues()
  };

  const handleMidFrequencyChange = (e) => {
    setMidFrequency(parseFloat(e.target.value));
    updateEQValues()
  };

  const handleHighFrequencyChange = (e) => {
    setHighFrequency(parseFloat(e.target.value));
    updateEQValues()
  };

  const updateEQValues = ( ) => {
    var values = {
      low: lowFrequency,
      mid: midFrequency,
      high: highFrequency
    }
    onChangeEqValues(values)
  }

  // Aplicar los filtros cuando cambian las frecuencias de corte
  useEffect(() => {
    console.log(eqValues)
    if(waveformObj === null) return
    const disconnectFilters = applyFilters();

    return () => {
      // Desconectar los filtros cuando el componente se desmonta
      disconnectFilters();
    };
  }, [lowFrequency, midFrequency, highFrequency, waveformObj]);

  return (
    <div className='eq-container'>
      <div className='eq-parameter'>
        <label>Bajos</label>
        <EQKnob 
          value={lowFrequency}
          handleOnChange={handleLowFrequencyChange}>
        </EQKnob>
      </div>
      <div className='eq-parameter'>
        <label>Medios</label>
        <EQKnob 
          value={midFrequency}
          handleOnChange={handleMidFrequencyChange}>
        </EQKnob>
      </div>
      <div className='eq-parameter'>
        <label>Agudos</label>
        <EQKnob 
          value={highFrequency}
          handleOnChange={handleHighFrequencyChange}>
        </EQKnob>
      </div>
    </div>
  );
}

export default EQControls;
