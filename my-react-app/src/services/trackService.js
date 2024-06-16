export const getTrackById = async ( pathFolder, trackId ) => {
    try {
        fetch("http://localhost:3001/api/samples/"+pathFolder+"/"+trackId)
        .then(response => response)
        
    } catch (error) {
        
    }
}