import React, { useContext } from "react";
import ProjectContext from "../contexts/ProjectContext";
import Button from "./Button";
import CreateWaveform from "./CreateAudioWaveform/CreateWaveform";


export default function ProjectEditor ({ params }) {
    console.log('Entré al componente ProjectEditor')

    //Obtengo el projectContext
    const context = useContext(ProjectContext);
    console.log('contextProject:')
    console.log(context.soundsProject.sounds)
    
    //Inicialzo el array de objetos wavesurfer
    const wavesurferObj = [];

    //Cargo el array con los waveforms
    context.soundsProject.sounds.map(sound => {
        wavesurferObj.push(new CreateWaveform(sound.src))
    })
        
    const playProject = () => {
         console.log('Play')
         wavesurferObj.map(sample => {
            return console.log(sample[0].play())
         })
     }
    
    const stopProject = () => {
        console.log('Stop')
        wavesurferObj.map(sample => {
           return console.log(sample[0].stop())
        })
    }

    const pauseProject = () => {
        console.log('Pause')
        wavesurferObj.map(sample => {
           return console.log(sample[0].pause())
        })
    }
    
    return (
        <>
        <h1>Soy el nuevo componenten ProjectEditor, nombre {context.name}</h1>
            
        <div className='projectControls' >
                <Button textButton='Play' onClickButton={() => playProject()}></Button>
                <Button textButton='Stop' onClickButton={() => stopProject()}></Button>
                <Button textButton='Pause' onClickButton={() => pauseProject()}></Button>
                <span style={{marginLeft: '20px'}}>
                    {
                        //formatTiempo(this.state.currentTime)
                    }
                </span>
            </div>
            <div className='channelsContainer'>
                <div className='channelsControls'>
                    {
                    //context.soundsProject.sounds.map(sound => {
                    //    return <AudioChannel key={sound.name} sample={sound} onSolo={this.onSoloSample}/>;
                    //})
                    }
                </div>
                <div className='channelsSprites' style={{ width: '100%'}}>
                    <div className='spritesContainer'>
                    <div id='spectro'></div>
                    </div>
                </div>    
            </div>        
            
        </>
        )
}