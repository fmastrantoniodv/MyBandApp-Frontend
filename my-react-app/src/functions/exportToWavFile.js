import Crunker from "crunker";

export default function exportWavToFile(audioBuffers){
    console.log('exportWavToFile.audioBuffers', audioBuffers)
    const crunker = new Crunker()
    const mergeBuffer = crunker.mergeAudio(audioBuffers)
    const exportBlob = crunker.export(mergeBuffer, 'audio/wav')
    //const downloadLink = crunker.download(exportBlob, 'testExport')
    return exportBlob

}
