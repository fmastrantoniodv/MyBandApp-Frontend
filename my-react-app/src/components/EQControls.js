import React, { useState } from 'react';

function EQControls({ audioContext }) {
  // Estado para almacenar las frecuencias de corte de los filtros
  const [lowFrequency, setLowFrequency] = useState(200);
  const [midFrequency, setMidFrequency] = useState(1000);
  const [highFrequency, setHighFrequency] = useState(5000);

  // Función para aplicar los filtros de sonido
  const applyFilters = () => {
    // Crear filtros de tipo BiquadFilterNode
    const lowFilter = audioContext.createBiquadFilter();
    const midFilter = audioContext.createBiquadFilter();
    const highFilter = audioContext.createBiquadFilter();

    // Configurar los filtros
    lowFilter.type = 'lowshelf';
    lowFilter.frequency.value = lowFrequency;
    midFilter.type = 'peaking';
    midFilter.frequency.value = midFrequency;
    highFilter.type = 'highshelf';
    highFilter.frequency.value = highFrequency;

    // Conectar los filtros en serie
    lowFilter.connect(midFilter);
    midFilter.connect(highFilter);

    // Conectar la entrada y la salida del componente
    lowFilter.connect(audioContext.destination);

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
  React.useEffect(() => {
    const disconnectFilters = applyFilters();
    return () => {
      // Desconectar los filtros cuando el componente se desmonta
      disconnectFilters();
    };
  }, [lowFrequency, midFrequency, highFrequency, audioContext]);

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
          min="20"
          max="2000"
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
          min="200"
          max="5000"
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
          min="1000"
          max="20000"
          step="10"
          value={highFrequency}
          onChange={handleHighFrequencyChange}
        />
      </div>
    </div>
  );
}

export default EQControls;
