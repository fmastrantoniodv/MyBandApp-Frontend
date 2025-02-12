import React, {useEffect, useRef, useState} from "react";
import playIcon from '../../img/playIcon.svg'
import pauseIcon from '../../img/pauseIcon.svg'
import useAudioComponent from "../../hooks/useAudioComponent";
import { useUser } from '../../contexts/UserContext'

export default function PlaySample({sampleInfo}){
    const [playing, setPlaying] = useState(false)
    const [loading, setLoading] = useState(true)
    const { playingSample, setPlayingSample } = useUser()
    const containerRef = useRef()
    const audioComponent = useAudioComponent(sampleInfo, containerRef)
    
    useEffect(()=>{
        console.log('[PlaySample.js].useEffect.sampleInfo=', sampleInfo)
        console.log('[PlaySample.js].useEffect.audioComponent=', audioComponent)
        if(!audioComponent) return
        setLoading(false)
        if(playingSample !== null && playingSample !== sampleInfo.id){
            audioComponent.stop()
            setPlaying(false)
        }
    }, [playingSample, audioComponent])

    const initAudioComponent = async () => {
        
    }

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
        <>
            <button className="btn-project-controls" onClick={() => handlePlaySample()}>
            <div style={{display: "none"}} ref={containerRef} />{
                loading ? 
                <span>...</span>
                :
                (
                    !playing ? <img src={playIcon} alt="icono de reproducir" width="25px" /> : <img src={pauseIcon} alt="icono de pausar" width="25px" />
                )
                
            }
            </button>
        </>
    )
}