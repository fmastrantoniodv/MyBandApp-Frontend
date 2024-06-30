import { useEffect, useState } from 'react';

const useProject = ( idProject ) => {
    const [projectInfo, setProjectInfo] = useState(null)
    const [loading, setLoading] = useState(true)
    const fetchProject = async () => {
      setLoading(true)
      try {
        const response = await fetch(`http://localhost:3001/api/project/${idProject}`)
        const result = await response.json();
        setProjectInfo(result)
      } catch (error) {
        console.error('Error fetching data: ',error)
      } finally{
        setLoading(false)
      }
    }
    useEffect(() => {
        console.log(`[useProject].[useEffect]`)
        fetchProject()
    }, []);
    
    if(loading){
      return 'Loading'
    }

    return projectInfo
  }

  export default useProject;
