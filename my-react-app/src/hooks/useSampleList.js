import {useState} from "react";

export const useSampleList = () => {
    const [projectChannelList, setProjectChannelList] = useState(null)

    const initProjectChannelList = (projectSampleList) => {
        setProjectChannelList(projectSampleList)
    }

    const addChannelToList = (item) => {
        var updatedChannelList = projectChannelList
        var newChannel = {
          id: item.id,
          sampleName: item.sampleName,
          duration: item.duration,
          collectionCode: item.collectionCode,
          tempo: item.tempo,
          channelConfig: {
            states: {
                "solo": false,
                "muted": false
            },
            volume: 0.7,
            EQ: {
                low: 0,
                mid: 0,
                high: 0
            }
        }}
        updatedChannelList.push(newChannel)
        setProjectChannelList(updatedChannelList)
      }
      
      const deleteChannelFromList = ( idChannel ) => {
        setProjectChannelList(projectChannelList.filter(value => value.id !== idChannel))      
      }

      const getSampleList = () => { return projectChannelList }
    return [initProjectChannelList, addChannelToList, deleteChannelFromList, getSampleList]
}