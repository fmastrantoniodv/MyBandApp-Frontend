import Crunker from "crunker";

export default function exportWavToFile(audioBuffers){
    console.log('exportWavToFile.audioBuffers', audioBuffers)
    const crunker = new Crunker()
    crunker._sampleRate = 48000
    const mergeBuffer = crunker.mergeAudio(audioBuffers)
    const exportBlob = crunker.export(mergeBuffer, 'audio/mp3')
    var url = window.URL.createObjectURL(exportBlob.blob)
    var anchor = document.createElement('a')
    document.body.appendChild(anchor)
    anchor.style = 'display: none'
    anchor.href = url
    anchor.download = 'audio.wav'
    anchor.click()
    window.URL.revokeObjectURL(url)
}
