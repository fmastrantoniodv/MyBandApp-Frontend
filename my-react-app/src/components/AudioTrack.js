import React, { useContext, useEffect } from "react";
import AudioTrackControls from "./AudioTrackControls";

export default function AudioTrack ({ sample }) {
    console.log('AudioTrack sample:')
    console.log(sample)

    //Obtengo el projectContext
    //const context = useContext(ProjectContext);

    useEffect(() => {
        //context.pushWavesuferList();
        return () => {
            
        };
      }, []);
      
    return (
        <>  
            <div className='channelContainer'>
                <div className='channelControls'>
                <AudioTrackControls sample={sample} sampleName={sample.name}/>
                </div>
                <div className='channelSprites' style={{ width: '100%'}}>
                    <div className='spritesContainer'>
                    <div id={sample.name}></div>
                    </div>
                </div>    
            </div>        
        </>
        )
}