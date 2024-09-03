import React, {useEffect, useState, useRef} from "react";
import exportToWavFile from '../functions/exportToWavFile'

const Context = React.createContext({})

const AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext

export function MasterAudioContextProvider({children, value}){
    const [masterAudioCtx, setMasterAudioCtx] = useState(audioCtx)
    const [mainGainNode, setMainGainNode] = useState(masterAudioCtx.createGain())
    const [trackList, setTrackList] = useState([])
    const [projectBPM, setProjectBPM] = useState(110)
    const [playbackState, setPlaybackState] = useState('false')

    useEffect(()=>{
        console.log('[MasterAudioContextProvider].[useEffect].trackList', trackList)
        syncTempoTracks()
    },[projectBPM])

    const syncTempoTracks = () => {
        trackList.map(track => {
            if(track.waveformComponent.backend.source.playbackRate !== undefined){
                const playbackRate = projectBPM / track.tempo;
                track.waveformComponent.setPlaybackRate(playbackRate)
            }
        })
    }

    const addTrackToList = ( newTrack ) => {
        console.log('[MasterAudioContextProvider].[addTrackToList].newTrack', newTrack)
        setTrackList(prevState => [...prevState, newTrack])
    }

    const getTrack = ( trackId ) => {
        return trackList.find(value => value.id === trackId)
    }

    const deleteTrack = ( trackId ) => {
        setTrackList(trackList.filter(value => value.id !== trackId))
    }

    const playBackTracks = ( playbackAction ) => {
        if(trackList.length < 1) return

        if(playbackAction === 'play'){
            trackList.map(track => track.waveformComponent.play())
            syncTempoTracks()
        }else if(playbackAction === 'stop'){
            trackList.map(track => track.waveformComponent.stop())
        }else if(playbackAction === 'pause'){
            trackList.map(track => track.waveformComponent.pause())
        }
        setPlaybackState(playbackAction)
    }

    const getTracklist = () =>{
        return trackList
    }
  
    function getAudioOfflineBuffer(sample) {
        const waveSurfer = sample.waveformComponent
        var offlineContext = new OfflineAudioContext(waveSurfer.backend.source.channelCount, waveSurfer.backend.buffer.duration * waveSurfer.backend.ac.sampleRate, waveSurfer.backend.ac.sampleRate);
        var buffer = waveSurfer.backend.buffer;
        var source = offlineContext.createBufferSource();
        source.buffer = buffer;
        const playbackRate = projectBPM / sample.tempo
        source.playbackRate.value = playbackRate
        const gainNode = offlineContext.createGain();
        if(waveSurfer.isMuted){
            gainNode.gain.value = 0;
        }else{
            gainNode.gain.value = waveSurfer.backend.gainNode.gain.value;
        }
        source.connect(gainNode);

        const lowFilter = offlineContext.createBiquadFilter();
        lowFilter.type = 'lowshelf';
        lowFilter.frequency.value = 500;
        lowFilter.gain.value = waveSurfer.backend.filters[0].gain.value;
        
        const midFilter = offlineContext.createBiquadFilter();
        midFilter.type = 'peaking';
        midFilter.frequency.value = 1600;
        midFilter.gain.value = waveSurfer.backend.filters[1].gain.value;

        const highFilter = offlineContext.createBiquadFilter();
        highFilter.type = 'highshelf';
        highFilter.frequency.value = 10000;
        highFilter.gain.value = waveSurfer.backend.filters[2].gain.value;
        gainNode.connect(lowFilter)
        lowFilter.connect(midFilter)
        midFilter.connect(highFilter)
        highFilter.connect(offlineContext.destination)
        
        // Start rendering
        return new Promise(function(resolve, reject) {
            offlineContext.oncomplete = function(event) {
                resolve(event.renderedBuffer);
            };
            source.start();
            offlineContext.startRendering();
        });
    }

    async function processWaveSurfers(waveSurfers) {
        var results = [];
        var promises = waveSurfers.map(function(waveSurfer) {
            return getAudioOfflineBuffer(waveSurfer).then(function(renderedBuffer) {
                results.push(renderedBuffer);
            }).catch(function(error) {
                console.error('Failed to get audio offline buffer:', error);
            });
        })
        return Promise.all(promises).then(function() {
            return results;
        });
    }
    
    const exportWavFile = async () => {
        const resultProcessWaveSufers = await processWaveSurfers(trackList)
        const resultExportToWavFile = await exportToWavFile(resultProcessWaveSufers)
        if(resultExportToWavFile === 'success'){
            return resultExportToWavFile
        }else{
            return 'ERROR'
        }
    }

    const onSoloChannel = (trackId) => {
        if(getTrack(trackId).waveformComponent.onSolo){
            trackList.map(value => {
                    value.waveformComponent.setMute(false)
                    value.channelConfig.states.muted = false
                    value.waveformComponent.onSolo = false
                    value.channelConfig.states.solo = false
            })
        }else{
            trackList.map(value => {
                if(value.id === trackId){
                    value.waveformComponent.setMute(false)
                    value.channelConfig.states.muted = false
                    value.waveformComponent.onSolo = true
                    value.channelConfig.states.solo = true
                }else{
                    value.waveformComponent.setMute(true)
                    value.channelConfig.states.muted = true
                    value.waveformComponent.onSolo = false
                    value.channelConfig.states.solo = false
                }
            })
        }
    }

    return  <Context.Provider value={{
                masterAudioCtx,
                mainGainNode,
                setMainGainNode,             
                exportWavFile,
                getTrack,
                addTrackToList,
                deleteTrack,
                playBackTracks,
                onSoloChannel,
                getTracklist,
                setProjectBPM,
                projectBPM,
                playbackState
            }}>{children}
            </Context.Provider>
}

export default Context