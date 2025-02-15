import React, {useEffect, useRef, useState} from "react";
import playIcon from '../../img/playIcon.svg'
import pauseIcon from '../../img/pauseIcon.svg'
import useAudioComponent from "../../hooks/useAudioComponent";
import { useUser } from '../../contexts/UserContext'
import LottieAnimation from "../Register/LoadingAnimation";

export default function PlaySample({sampleInfo}){
    const [playing, setPlaying] = useState(true)
    const [loading, setLoading] = useState(true)
    const { playingSample, setPlayingSample } = useUser()
    const containerRef = useRef()
    const audioComponent = useAudioComponent(sampleInfo, containerRef)
    
    useEffect(()=>{
        if(!audioComponent) return
        setLoading(false)
        if(playing && playingSample === sampleInfo.id){
            autoPlay()
        }
        if(playingSample !== null && playingSample !== sampleInfo.id){
            audioComponent.stop()
            setPlaying(false)
        }
    }, [playingSample, audioComponent])

    const handlePlaySample = () => {
        if(loading) return
        if(!playing){
            audioComponent.play()
            setPlayingSample(sampleInfo.id)
        }else{
            audioComponent.stop()
            setPlayingSample(null)
        }
        setPlaying(!playing)
    }

    const autoPlay = () => {
        audioComponent.play()
    }

    return (
        <>
            <button className="btn-project-controls" onClick={() => handlePlaySample()}>
            <div style={{display: "none"}} ref={containerRef} />{
                loading ? 
                <LottieAnimation width={25} height={25} />
                :
                (
                    !playing ? <img src={playIcon} alt="icono de reproducir" width="25px" /> : <img src={pauseIcon} alt="icono de pausar" width="25px" />
                )
                
            }
            </button>
        </>
    )
}