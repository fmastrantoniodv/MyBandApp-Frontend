import React, { useEffect, useState } from 'react';

function Button({ textButton, onClickButton, state, fatherId }) {
  const [pressState, setPressState] = useState(false)

  useEffect(()=>{
    setPressState(state)
  }, [state])

  let classState = '';

  if(pressState === true){
    classState = '-press'
  }else{
    classState = ''
  }    

  const handleClickButton = () => {
    setPressState(!pressState)
    onClickButton()
  }
  
    return (
      <button key={fatherId+textButton} 
        id={fatherId+textButton} 
        className={`button-output-channel ${textButton === 'M' ? 'mute' : 'solo'} ${pressState ? ' pressed' : ''}`}
        onClick={() => handleClickButton()}>{textButton}</button>
    );
  }

  export default Button;
  