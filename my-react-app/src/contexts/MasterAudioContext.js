import React, {useEffect, useState} from "react";
import exportToWavFile from '../functions/exportToWavFile'

const Context = React.createContext({})

const AudioContext = window.AudioContext || window.webkitAudioContext;

export function MasterAudioContextProvider({children, value}){
    const [masterAudioCtx, setMasterAudioCtx] = useState(new AudioContext())
    const [mainGainNode, setMainGainNode] = useState(masterAudioCtx.createGain())
    const [trackList, setTrackList] = useState([])

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

    const playBackTracks = ( playBackAction ) => {
        if(playBackAction === 'play'){
            trackList.map(track => track.play())
        }else if(playBackAction === 'stop'){
            trackList.map(track => track.stop())
        }else if(playBackAction === 'pause'){
            trackList.map(track => track.pause())
        }
    }
    /*
    function getAudioOfflineBuffer(track) {
        console.log('getAudioOfflineBuffer.track', track.backend.offlineAc)
        //var offlineContext = new OfflineAudioContext(track.backend.source.channelCount, track.backend.buffer.duration * track.backend.ac.sampleRate, track.backend.ac.sampleRate);
        //var offlineContext = new OfflineAudioContext(sourceNode.channelCount, sourceNode.buffer.duration * audioContext.sampleRate, audioContext.sampleRate);
        // Clone the audio graph into the offline context
        //track.backend.gainNode.connect(track.backend.offlineAc.destination);
        var renderedBuffer
        track.backend.offlineAc.startRendering().then((renderedResult) => {return renderedBuffer = renderedResult})
        
        return renderedBuffer
    }
*/
    function getAudioOfflineBuffer(waveSurfer) {
        // Create an OfflineAudioContext with the same sample rate and duration as your audio
        console.log('getAudioOfflineBuffer.wavesurfer',waveSurfer)
        var offlineContext = new OfflineAudioContext(waveSurfer.backend.source.channelCount, waveSurfer.backend.buffer.duration * waveSurfer.backend.ac.sampleRate, waveSurfer.backend.ac.sampleRate);
        
        // Get audio buffer
        var buffer = waveSurfer.backend.buffer;

        // Create a buffer source
        var source = offlineContext.createBufferSource();
        source.buffer = buffer;
        console.log('getAudioOfflineBuffer.source',source)

        const gainNode = offlineContext.createGain();
        if(waveSurfer.isMuted){
            gainNode.gain.value = 0;
        }else{
            gainNode.gain.value = waveSurfer.backend.gainNode.gain.value;
        }
        // Connect the buffer source to the gainNode
        source.connect(gainNode);
        console.log('getAudioOfflineBuffer.gainNode', gainNode)

        //gainNode.connect(offlineContext.destination)

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
            // Listen for the complete event to resolve the promise
            offlineContext.oncomplete = function(event) {
                resolve(event.renderedBuffer);
            };

            // Start rendering
            source.start();
            offlineContext.startRendering();
        });
    }

    async function processWaveSurfers(waveSurfers) {
        // Create an array to store the results
        var results = [];
    
        // Map over each WaveSurfer instance and call getAudioOfflineBuffer
        var promises = waveSurfers.map(function(waveSurfer) {
            return getAudioOfflineBuffer(waveSurfer).then(function(renderedBuffer) {
                // Save the result to the array
                results.push(renderedBuffer);
            }).catch(function(error) {
                console.error('Failed to get audio offline buffer:', error);
            });
        });
    
        // Wait for all promises to resolve
        return Promise.all(promises).then(function() {
            // Return the array of results
            return results;
        });
    }
    
    const exportWavFile = () => {
        var arrayBuffersToExport = [];

        processWaveSurfers(trackList).then((results) => {
            console.log('result',results)
            exportToWavFile(results)
        }).catch((e)=>{
            console.error('Failed to process. error=', e)
        })
        /*
        trackList.map(track => {
            console.log(track)
            
            getAudioOfflineBuffer(track).then(function(renderedBuffer) {
                // Do something with the rendered buffer
                arrayBuffersToExport.push(renderedBuffer)
            }).catch(function(error) {
                console.error('Failed to get audio offline buffer:', error);
            });
            
            //arrayBuffersToExport.push(track.backend.buffer)
        })
        */
        
        //exportToWavFile(arrayBuffersToExport)
    }

    return  <Context.Provider value={{
                masterAudioCtx,
                mainGainNode,
                setMainGainNode,             
                exportWavFile,
                getTrack,
                addTrackToList,
                deleteTrack,
                playBackTracks
            }}>{children}
            </Context.Provider>
}

export default Context