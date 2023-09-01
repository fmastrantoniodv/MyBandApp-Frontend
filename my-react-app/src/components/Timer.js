import React, { useState, useEffect } from 'react';

function Timer({ isRunning, elapsedTime }) {
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);
        elapsedTime(elapsedTimeInSeconds); // Llamamos a la función elapsedTime pasada como prop
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning, startTime, elapsedTime]);

  return (
    <div>
      <p>Time elapsed: {elapsedTime} seconds</p>
    </div>
  );
}

export default Timer;