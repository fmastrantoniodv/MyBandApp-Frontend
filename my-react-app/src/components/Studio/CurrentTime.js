import React, { useState, useEffect, useContext } from 'react';
import MasterAudioContext from "../../contexts/MasterAudioContext";

const CurrentTime = ({ playing }) => {
    const [tiempo, setTiempo] = useState();
    const [prevTiempo, setPrevTiempo] = useState(0);
    const {masterAudioCtx} = useContext(MasterAudioContext)

    useEffect(() => {

      if(playing === 'true'){
      const interval = setInterval(() => {
        setTiempo(prevTiempo + masterAudioCtx.currentTime * 1000);
      }, 100);
      return () => clearInterval(interval);

      }else if(playing === 'pause'){
        setPrevTiempo(tiempo)
      }
      else{
        const interval = setInterval(() => {
          setTiempo(0);
          setPrevTiempo(0)
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
    <div className='current-time'>
      <span>{formatTiempo(tiempo)}</span>
      </div>
  ) ;
};

export default CurrentTime;