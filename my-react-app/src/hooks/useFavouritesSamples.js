import { useEffect, useState } from 'react';
import '../App.css'

const useFavouritesSamples = () => {
    const [favouritesList, setFavouritesList] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        console.log(`[useFavouritesSamples].[useEffect]`)
        if(loading){
            fetch("http://localhost:3001/api/fav")
            .then(response => response.json())
            .then(json => {
              console.log(json)
              setFavouritesList(json)
              setLoading(false)
            })
        }
    }, []);
    
    return favouritesList
  }

  export default useFavouritesSamples;
