import React, { useState, useEffect } from 'react';

function EQControls({ waveformObj }) {

  // Estado para almacenar las frecuencias de corte de los filtros
  const [lowFrequency, setLowFrequency] = useState(0);
  const [midFrequency, setMidFrequency] = useState(0);
  const [highFrequency, setHighFrequency] = useState(0);

  //console.log(waveformObj.source)

  console.log({
    lowFrequency: lowFrequency,
    midFrequency: midFrequency,
    highFrequency: highFrequency
  })

  // Función para aplicar los filtros de sonido
  const applyFilters = () => {
    // Crear filtros de tipo BiquadFilterNode
    console.log('EQControls')
    console.log(waveformObj.audioCtx)
    const lowFilter = waveformObj.audioCtx.createBiquadFilter();
    const midFilter = waveformObj.audioCtx.createBiquadFilter();
    const highFilter = waveformObj.audioCtx.createBiquadFilter();

    console.log(lowFilter)
    // Configurar los filtros
    // BAJOS
    lowFilter.type = 'highpass';
    lowFilter.frequency.value = lowFrequency;
    lowFilter.gain.value = 1500;

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
    lowFilter.connect(waveformObj.audioCtx.destination);

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
  };

  const handleMidFrequencyChange = (e) => {
    setMidFrequency(parseFloat(e.target.value));
  };

  const handleHighFrequencyChange = (e) => {
    setHighFrequency(parseFloat(e.target.value));
  };

  // Aplicar los filtros cuando cambian las frecuencias de corte
  useEffect(() => {
    const disconnectFilters = applyFilters();
    return () => {
      // Desconectar los filtros cuando el componente se desmonta
      disconnectFilters();
    };
  }, [lowFrequency, midFrequency, highFrequency, waveformObj.audioCtx]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div 
      style={{display: 'flex'}}>
        <label style={{width: '50%'}}>Bajos:</label>
        <input
        style={{width: '50%'}}
          type="range"
          min="0"
          max="24000"
          step="10"
          value={lowFrequency}
          onChange={handleLowFrequencyChange}
        />
      </div>
      <div style={{display: 'flex'}}>
        <label style={{width: '50%'}}>Medios:</label>
        <input
        style={{width: '50%'}}
          type="range"
          min="-40"
          max="40"
          step="10"
          value={midFrequency}
          onChange={handleMidFrequencyChange}
        />
      </div>
      <div style={{display: 'flex'}}>
        <label style={{width: '50%'}}>Agudos:</label>
        <input
        style={{width: '50%'}}
          type="range"
          min="-40"
          max="40"
          step="10"
          value={highFrequency}
          onChange={handleHighFrequencyChange}
        />
      </div>
    </div>
  );
}

export default EQControls;
