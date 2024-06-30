import { useEffect, useState } from 'react';

const useFavouritesSamples = () => {
    const [favouritesList, setFavouritesList] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        console.log(`[useFavouritesSamples].[useEffect]`)
        if(loading){
            fetch("http://localhost:3001/api/users/getUserFavsList/665b28e287fa373281f47938")
            .then(response => response.json())
            .then(json => {
              console.log(`[useFavouritesSamples].[useEffect].result=`,json)
              setFavouritesList(json)
              setLoading(false)
            })
        }
    }, []);
    
    return favouritesList
  }

  export default useFavouritesSamples;
