import React, { useEffect, useState } from 'react';

function Button({ textButton, onClickButton, state, faderID }) {
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
      <button key={faderID+textButton+"Button"} id={faderID+textButton+"Button"} className={textButton+'Button' + (pressState ? '-press':'') } onClick={() => handleClickButton()}>{textButton}</button>
    );
  }

  export default Button;
  