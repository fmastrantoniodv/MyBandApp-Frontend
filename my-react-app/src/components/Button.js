import React from 'react';

function Button({ textButton, onClickButton, state }) {

  let classState = '';

  if(state === true){
    classState = '-press'
  }else{
    classState = ''
  }    
  
    return (
      <button className={ textButton+'Button'+classState } onClick={onClickButton}>{textButton}</button>
    );
  }

  export default Button;
  