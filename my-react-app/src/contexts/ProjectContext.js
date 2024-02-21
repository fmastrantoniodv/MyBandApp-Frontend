import React, { useContext, createContext } from "react";

const ProjectContext = createContext()
const AudioContext = createContext();

export function useAudioContext(){
    return useContext(AudioContext)
}

export default ProjectContext;