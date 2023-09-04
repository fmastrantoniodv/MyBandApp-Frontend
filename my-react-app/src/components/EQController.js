import React from "react"

function EQController({ sampleSource }){

    // Create Web Audio context
    const audioContext = new AudioContext()

    // Define the equalizer bands
    const eqBands = [100, 1600, 14000]

    // Create a biquad filter for each band
    const filters = eqBands.map((band) => {
    const filter = audioContext.createBiquadFilter()
    filter.type = 'peaking'
    filter.gain.value = Math.random() * 40 - 20
    filter.Q.value = 1 // resonance
    filter.frequency.value = band // the cut-off frequency
    return filter
    })

    console.log(sampleSource.sample)


    // Create a MediaElementSourceNode from the audio element
    const mediaNode = audioContext.createMediaElementSource(sampleSource)

    // Connect the filters and media node sequentially
    const equalizer = filters.reduce((prev, curr) => {
      prev.connect(curr)
      return curr
    }, mediaNode)

    // Connect the filters to the audio output
    equalizer.connect(audioContext.destination)

    // Create a vertical slider for each band
    const container = document.createElement('p')
    filters.forEach((filter) => {
    const slider = document.createElement('input')
    slider.type = 'range'
    slider.orient = 'vertical'
    slider.style.appearance = 'slider-vertical'
    slider.style.width = '8%'
    slider.min = -40
    slider.max = 40
    slider.value = filter.gain.value
    slider.step = 0.1
    slider.oninput = (e) => (filter.gain.value = e.target.value)
    container.appendChild(slider)
    })
    document.body.appendChild(container)
    }

export default EQController