import React, { useState, useEffect } from 'react';

const CurrentTime = ( playing ) => {
    const [tiempo, setTiempo] = useState(0);

    useEffect(() => {
      if(playing === true){
      const interval = setInterval(() => {
        setTiempo(tiempo => tiempo + 1);
      }, 1);
  
      return () => clearInterval(interval);
      }else{
        const interval = setInterval(() => {
          setTiempo(0);
        }, 1);
    
        return () => clearInterval(interval);
      }
    }, []);

    const formatTiempo = tiempo => {
        const millis = tiempo;
        const segs = Math.floor((tiempo % 60000) / 1000);
        const mins = Math.floor(tiempo / 60000);
  
      return `${mins.toString().padStart(2, '0')}:${segs
        .toString()
        .padStart(2, '0')}.${millis.toString().padStart(3, '0')}`;
    };
  
  return tiempo;
};

export default CurrentTime;