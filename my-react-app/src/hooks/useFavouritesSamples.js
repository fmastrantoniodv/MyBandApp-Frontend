import { useEffect, useState } from 'react';
import { getUserFavsServ } from '../services/usersServ';
import { useUser } from '../contexts/UserContext';

const useFavouritesSamples = () => {
    const [favouritesSamples, setFavouritesSamples] = useState(null)
    const [loading, setLoading] = useState(true)
    const { user } = useUser()
    
    useEffect(() => {
      if(favouritesSamples !== null) return
      getUserFavsServ(user.id).then(res =>{
        console.log('[useFavouritesSamples.js].[useEffect].res=', res)
        if(res.status != 200) return
        console.log('[useFavouritesSamples.js].[useEffect].res.data=', res.data)
        setFavouritesSamples(res.data)
        setLoading(false)
      })
    }, []);

    if(!loading) return favouritesSamples
  
  }


  export default useFavouritesSamples;
    
