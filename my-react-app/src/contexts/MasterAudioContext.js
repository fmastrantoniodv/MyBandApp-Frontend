import React, {useEffect, useState} from "react";
import exportToWavFile from '../functions/exportToWavFile'

const Context = React.createContext({})

const AudioContext = window.AudioContext || window.webkitAudioContext;

export function MasterAudioContextProvider({children, value}){
    const [masterAudioCtx, setMasterAudioCtx] = useState(new AudioContext())
    const [mainGainNode, setMainGainNode] = useState(masterAudioCtx.createGain())
    const [trackList, setTrackList] = useState([])
    const [playBackCurrentTime, setPlayBackCurrentTime] = useState(0)

    useEffect(()=>{
        console.log('[MasterAudioContextProvider].[useEffect].trackList', trackList)
    },[trackList])

    const addTrackToList = ( newTrack ) => {
        setTrackList(prevState => [...prevState, newTrack])
    }

    const getTrack = ( trackId ) => {
        return trackList.find(value => value.mediaContainer.id === trackId)
    }

    const deleteTrack = ( trackId ) => {
        setTrackList(trackList.filter(value => value.mediaContainer.id !== trackId))
    }
    /*
    const getPlayBackCurrentTime = () => {
        setPlayBackCurrentTime(trackList[0].backend.ac.currentTime)
        return playBackCurrentTime
    }
*/
    const playBackTracks = ( playBackAction ) => {
        if(playBackAction === 'play'){
            trackList.map(track => track.play())
        }else if(playBackAction === 'stop'){
            trackList.map(track => track.stop())
        }else if(playBackAction === 'pause'){
            trackList.map(track => track.pause())
        }
    }
  
    function getAudioOfflineBuffer(waveSurfer) {
        console.log('getAudioOfflineBuffer.wavesurfer',waveSurfer)
        var offlineContext = new OfflineAudioContext(waveSurfer.backend.source.channelCount, waveSurfer.backend.buffer.duration * waveSurfer.backend.ac.sampleRate, waveSurfer.backend.ac.sampleRate);        
        var buffer = waveSurfer.backend.buffer;
        var source = offlineContext.createBufferSource();
        source.buffer = buffer;
        console.log('getAudioOfflineBuffer.source',source)

        const gainNode = offlineContext.createGain();
        if(waveSurfer.isMuted){
            gainNode.gain.value = 0;
        }else{
            gainNode.gain.value = waveSurfer.backend.gainNode.gain.value;
        }
        source.connect(gainNode);
        console.log('getAudioOfflineBuffer.gainNode', gainNode)

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
    
    const exportWavFile = () => {
        processWaveSurfers(trackList).then((results) => {
            exportToWavFile(results)
        }).catch((e)=>{
            console.error('Failed to process. error=', e)
        })
    }

    const onSoloChannel = (trackId) => {
        if(getTrack(trackId).onSolo){
            trackList.map(value => {
                    value.setMute(false)
                    value.onSolo = false
            })
        }else{
            trackList.map(value => {
                if(value.mediaContainer.id === trackId){
                    value.setMute(false)
                    value.onSolo = true
                }else{
                    value.setMute(true)
                    value.onSolo = false
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
                onSoloChannel
                //getPlayBackCurrentTime
            }}>{children}
            </Context.Provider>
}

export default Context