import React, {useContext} from 'react';
import '../../App.css';
import '../../views/studio';
import { Howl, Howler} from 'howler';
import Button from '../../components/Button.js';
import AudioChannel from './AudioChannel';
import Waveform from './../../components/AudioWaveformRender/Waveform';
import ProjectContext from '../../contexts/ProjectContext';

const audioFolder = './../../samples/';

class AudioGroup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        playing: false,
        currentTime: 0,
        projectDuration: 0,
        solo: false
      }
      this.context = new AudioContext();
      this.sounds = props.sounds.map(sound => new Howl({
      ...sound,
      context: this.context,
      onload: () => {this.getProjectDuration()},
      onend: () => {this.stopProject()}
    }));
    }
    
    getProjectDuration(){
        this.sounds.forEach(sound => {
            if(sound._duration > this.state.projectDuration){
                this.setState({ projectDuration: Math.floor(sound._duration * 1000)})
                console.log(sound._duration)
            }
        }
        )
    }

    playProject(currentTime){
       // this.stopProject()
        this.setState({ 
            playing: true
         });
        const interval = setInterval(() => {
            if(this.state.playing === true){
            this.setState({currentTime: this.state.currentTime + 1})
            }
        },1)
        //this.sounds.forEach(sound => sound.play());
        console.log('play project to: '+this.state.projectDuration+'ms')
        
    }
    
    stopProject(){
        console.log('stop project at: '+this.state.currentTime+'ms')
        this.setState({
            currentTime: 0,
            playing: false})
        this.sounds.forEach(sound => sound.stop());
        console.log(this.state.currentTime)
    }
    
    pauseProject(){
        this.state.playing = false;
        this.sounds.forEach(sound => sound.pause());
    }

    componentWillUnmount() {
      // Call the unload() method on each Howl instance to release the audio resources
      this.sounds.forEach(sound => sound.unload());
    }

    onSoloSample = (sample) =>{
        //if(sample._mute === true)
        console.log(sample._mute)
        console.log(sample._muted)
        if(this.state.solo === true){
            this.setState({ solo: false});
            this.sounds.map(sound => {
                sound.mute(false);
            });
        }else{
            this.sounds.map(sound => {
                if(sound._sounds[0]._id === sample._sounds[0]._id){
                    sound.mute(false);
                    this.setState({ solo: true});
                }else{
                    sound.mute(true);
                }
            })
        }
        
    }
    
    render() {

      return (
        <>
        <div className='projectControls' >
                <Button textButton='Play' onClickButton={() => {this.playProject()}}></Button>
                <Button textButton='Stop' onClickButton={() => {this.stopProject()}}></Button>
                <Button textButton='Pause' onClickButton={() => {this.pauseProject()}}></Button>
                <span style={{marginLeft: '20px'}}>{formatTiempo(this.state.currentTime)}</span>
            </div>
            <div className='channelsContainer'>
                <div className='channelsControls'>
                    {this.sounds.map((sample) => {
                        return <AudioChannel key={sample._src} sample={sample} onSolo={this.onSoloSample}/>;
                    })
                    }
                </div>
                <div className='channelsSprites' style={{ width: '100%'}}>
                    <div className='spritesContainer'>
                    {
                        
                        this.sounds.map((sample) => {
                            return(
                                <>
                                    <Waveform audioUrl={sample._src} sampleDuration={this.state.projectDuration} projectState={this.state.playing}/> 
                                </>
                            ) 
                        })
                        
                    }
                    
                    </div>
                </div>    
            </div>        
        </>
      );
    }
  }

 
  
    const formatTiempo = (tiempo) => {
        const millis = tiempo;
        const segs = Math.floor((tiempo % 60000) / 1000);
        const mins = Math.floor(tiempo / 60000);
  
      return `${mins.toString().padStart(2, '0')}:${segs
        .toString()
        .padStart(2, '0')}.${millis.toString().substr(0,2).padStart(2, '0')}`;
    };

    function calcularTiempoTranscurrido() {
        var fechaActual = new Date(); // Obtener la fecha y hora actual
        var fechaEspecifica = new Date("2023-06-01T12:00:00"); // Ejemplo de fecha y hora específica
      
        var tiempoTranscurrido = fechaActual - fechaEspecifica; // Restar las dos fechas para obtener la diferencia en milisegundos
      
        // Calcular los componentes del tiempo transcurrido
        var segundos = Math.floor(tiempoTranscurrido / 1000);
        var minutos = Math.floor(segundos / 60);
        var horas = Math.floor(minutos / 60);
        var dias = Math.floor(horas / 24);
      
        // Ajustar los valores para que no excedan los límites
        segundos %= 60;
        minutos %= 60;
        horas %= 24;
      
        // Mostrar el tiempo transcurrido
        console.log("Tiempo transcurrido: " + dias + " días, " + horas + " horas, " + minutos + " minutos, " + segundos + " segundos");
      }
      
  export default AudioGroup;