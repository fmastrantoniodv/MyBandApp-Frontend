import React, { useContext, useEffect } from "react";
import ProjectContext from "../contexts/ProjectContext";
import Button from "./Button";
import AudioTrack from "./AudioTrack";


export default function ProjectEditor ({ params }) {
    //Obtengo el projectContext
    const context = useContext(ProjectContext);
    console.log('samplelist')
    console.log(context.sampleList)

    useEffect(() => {
        //context.pushWavesuferList();
        return () => {
        };
      }, []);
       
    const playProject = () => {
         console.log('Play')
         context.sampleList.map(sample => {
            return sample.waveform.play()
         })
     }
    
    const stopProject = () => {
        console.log('Stop')
        context.sampleList.map(sample => {
           return sample.waveform.stop()
        })
    }

    const pauseProject = () => {
        console.log('Pause')
        context.sampleList.map(sample => {
           return sample.waveform.pause()
        })
    }
    
    return (
        <>
            <h1>{context.name}</h1>
            <div className='projectControls' >
                <Button textButton='Play' onClickButton={() => playProject()}></Button>
                <Button textButton='Stop' onClickButton={() => stopProject()}></Button>
                <Button textButton='Pause' onClickButton={() => pauseProject()}></Button>
                <span style={{marginLeft: '20px'}}>00:00:00
                    {
                        //formatTiempo(this.state.currentTime)
                    }
                </span>
            </div>
            <div className="tracksContainer">
                {   
                    context.sampleList.map(sample => {
                        return <AudioTrack key={sample.name} sample={sample}/>
                        })
                }
            </div>
        </>
        )
}