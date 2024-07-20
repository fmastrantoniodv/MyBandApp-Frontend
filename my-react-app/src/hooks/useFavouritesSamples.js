import { useEffect, useState } from 'react';
import { getUserFavsServ } from '../services/users/getUserFavsServ';

const useFavouritesSamples = () => {
    const [favouritesSamples, setFavouritesSamples] = useState(null)
    const [loading, setLoading] = useState(true)
    const userId = '665b28e287fa373281f47938'
    
    useEffect(() => {
      if(favouritesSamples !== null) return
      getUserFavsServ(userId).then(res =>{
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
    
