import { useEffect, useState } from 'react';

const useProject = ( idProject ) => {
    const [projectInfo, setProjectInfo] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        console.log(`[useProject].[useEffect]`)
        if(loading){
            fetch("http://localhost:3001/api/project/66690805adc54fa0044019e1")
            .then(response => response.json())
            .then(json => {
              console.log(json)
              setProjectInfo(json)
              setLoading(false)
            })
            .catch (e => {
              console.log(e)
              setLoading(false)
            })
          }
    }, []);
    
    return projectInfo
  }

  export default useProject;
