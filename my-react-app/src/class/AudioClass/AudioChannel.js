import React from 'react';
import '../../App.css';
import '../../components/studio';
import Button from '../../components/Button.js';
import VolumeController from '../../components/VolumeController/VolumeController';



class AudioChannel extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        volume: 0.7,
        muted: false
      }
    }
    
    muteChannel(){
        if(this.state.muted === true){
            this.setState({ muted: false})
        }else{
            this.setState({ muted: true})
        }
        this.props.sample.mute(this.state.muted)
    }

    soloChannel = () => {
        this.props.onSolo(this.props.sample)
    }

    getFileName(){
        const fileNameWithExtension = this.props.sample._src.split('/').pop(); // "file.txt"
        const fileNameWithoutExtension = fileNameWithExtension.substr(0, fileNameWithExtension.lastIndexOf('.'));
        return fileNameWithoutExtension;
    }
    render() {
        return (
            <>
            <div key={this.getFileName()} className='audioControlsChannel'>
                <div className='audioControlsSample'>
                    <span className='displayName'>{this.getFileName()}</span>
                </div>
                <div className='audioControlsEQ'></div>
                <div className='audioControlsVolume'>
                
                <VolumeController sampleSource={this.props.sample}></VolumeController>
                </div>
                <div className='audioControlsOutputRouterButtons'>
                    <Button textButton='M' onClickButton={() => {this.muteChannel()}}/>
                    <Button textButton='S' onClickButton={this.soloChannel}/>
                    <Button textButton='R' onClickButton={() => {}}/>
                </div>
                <br />
            </div>
            </>
        )
    }
  }

  export default AudioChannel;