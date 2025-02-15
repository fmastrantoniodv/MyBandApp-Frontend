import Crunker from "crunker";

export default async function exportWavToFile(audioBuffers, fileName){
    const crunker = new Crunker()
    crunker._sampleRate = 48000
    const mergeBuffer = crunker.mergeAudio(audioBuffers)
    const exportBlob = crunker.export(mergeBuffer, 'audio/mp3')
    var url = window.URL.createObjectURL(exportBlob.blob)
    var anchor = document.createElement('a')
    document.body.appendChild(anchor)
    anchor.style = 'display: none'
    anchor.href = url
    anchor.download = `${fileName}.wav`
    anchor.click()
    window.URL.revokeObjectURL(url)
    anchor.remove()
    return 'success'
}
