import React from 'react';

function Button({ textButton, onClickButton, state }) {
  let classState = ''  
  if(state == true){
    classState = '-active'
  }

    return (
    <button className={ textButton+'Button'+classState } onClick={onClickButton}>{textButton}</button>
    );
  }

  export default Button;
  