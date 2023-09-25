import React, { useState, useEffect } from 'react';

const CurrentTime = ({ playing, audioCtxMaster }) => {
    const [tiempo, setTiempo] = useState(0);
    useEffect(() => {
      if(playing === true){
      const interval = setInterval(() => {
        setTiempo(audioCtxMaster.currentTime * 1000);
      }, 100);
  
      return () => clearInterval(interval);
      }else{
        const interval = setInterval(() => {
          setTiempo(0);
        }, 1);
    
        return () => clearInterval(interval);
      }
    }, [playing]);

    const formatTiempo = tiempo => {
        const millis = Math.floor(tiempo);
        const segs = Math.floor((tiempo % 60000) / 1000);
        const mins = Math.floor(tiempo / 60000);
        const millisString = millis.toString()
        const miliseg = millisString.substring(millisString.length - 3)
      return `${mins.toString().padStart(2, '0')}:${segs
        .toString()
        .padStart(2, '0')}.${miliseg.toString().padStart(3, '0')}`;
    };
  
  return(
    <div className='currentTime'>{formatTiempo(tiempo)}</div>
  ) ;
};

export default CurrentTime;