import WaveSurfer from "wavesurfer.js"
import React, { useRef, useState, useEffect, useCallback } from "react"

// WaveSurfer hook
const useWavesurfer = (containerRef, options) => {
    const [wavesurfer, setWavesurfer] = useState(null)
    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
      if (!containerRef.current) return
  
      const ws = WaveSurfer.create({
        ...options,
        container: containerRef.current,
      })
  
      setWavesurfer(ws)
      console.log('se creo el wavesurfer siguiente: ')
      console.log(ws)
      return () => {
        ws.destroy()
      }
    }, [options, containerRef])

    return wavesurfer
  }

export default useWavesurfer