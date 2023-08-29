import React, { useContext, createContext } from "react";

const ProjectContext = createContext()
const AudioContext = createContext();

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export function useAudioContext(){
    return useContext(AudioContext)
}

export default ProjectContext;