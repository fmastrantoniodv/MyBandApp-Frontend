import React, { useState, useEffect, useRef } from 'react';

const CurrentTime = ({ playing }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
      if(playing === 'play'){
        intervalRef.current = setInterval(() => {
          setCurrentTime((prevTime) => prevTime + 97);
        }, 97);
      }else if(playing === 'pause'){
        clearInterval(intervalRef.current);
      }
      else{
        clearInterval(intervalRef.current);
        setCurrentTime(0)
        return () => clearInterval(intervalRef.current);
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
      <span>{formatTiempo(currentTime)}</span>
      </div>
  ) ;
};

export default CurrentTime;