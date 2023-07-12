import React, { useContext } from "react";
import ProjectContext from "../contexts/ProjectContext";
import Waveform from "./AudioWaveformRender/Waveform";
import Button from "./Button";
import CreateWaveform from "./CreateAudioWaveform/CreateWaveform";
import AudioChannel from "../class/AudioClass/AudioChannel";


export default function ProjectEditor ({ params }) {
    console.log('entré al componente ProjectEditor')
    const context = useContext(ProjectContext);
    console.log('context:')
    console.log(context.soundsProject.sounds)
    
    const playProject = (currentTime) => {
        /*
         const interval = setInterval(() => {
             if(this.state.playing === true){
             this.setState({currentTime: this.state.currentTime + 1})
             }
         },1)
         */
         //this.sounds.forEach(sound => sound.play());
         console.log('play')
         context.wavesurferObj.map(sound =>{
            return console.log(sound)
         })
         
     }
     
     const wavesurferObj = [];
    context.soundsProject.sounds.map(sound => {
        console.log('sounds.sounds.map ')
        console.log(sound.src)
        wavesurferObj.push(new CreateWaveform(sound.src))
})

    
    //console.log(wavesurferObj)
    
    return (
        <>
        <h1>Soy el nuevo componenten ProjectEditor, nombre {context.name}</h1>
            
        <div className='projectControls' >
                <Button textButton='Play' onClickButton={() => playProject()}></Button>
                <Button textButton='Stop' onClickButton={() => {this.stopProject()}}></Button>
                <Button textButton='Pause' onClickButton={() => {this.pauseProject()}}></Button>
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