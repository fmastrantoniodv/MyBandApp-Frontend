import React, {useEffect, useRef, useState} from "react";
import playIcon from '../../img/playIcon.svg'
import pauseIcon from '../../img/pauseIcon.svg'
import useAudioComponent from "../../hooks/useAudioComponent";
import { useUser } from '../../contexts/UserContext'

export default function PlaySample({sampleInfo}){
    const [playing, setPlaying] = useState(false)
    const { playingSample, setPlayingSample } = useUser()
    const containerRef = useRef()
    const audioComponent = useAudioComponent(sampleInfo, containerRef)
    
    useEffect(()=>{
        if(!audioComponent) return
        if(playingSample !== null && playingSample !== sampleInfo.id){
            audioComponent.stop()
            setPlaying(false)
        }
    }, [playingSample])

    const handlePlaySample = () => {
        if(!playing){
            audioComponent.play()
            setPlayingSample(sampleInfo.id)
        }else{
            audioComponent.stop()
            setPlayingSample(null)
        }
        setPlaying(!playing)
    }

    return (
            <button className="btn-project-controls" onClick={() => handlePlaySample()}>
                <div style={{display: "none"}} ref={containerRef} />{
                    !playing ? <img src={playIcon} alt="icono de reproducir" width="25px" /> : <img src={pauseIcon} alt="icono de pausar" width="25px" />
                }
            </button>
    )
}