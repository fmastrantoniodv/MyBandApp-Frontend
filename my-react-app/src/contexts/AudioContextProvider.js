import React, { createContext, useContext } from 'react';

const AudioContext = createContext();

export const useAudioContext = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  return (
    <AudioContext.Provider value={audioContext}>
      {children}
    </AudioContext.Provider>
  );
};