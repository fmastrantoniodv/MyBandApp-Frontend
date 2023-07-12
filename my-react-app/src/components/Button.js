import React from 'react';

function Button({ textButton, onClickButton }) {
    return (
    <button className={ textButton+'Button' } onClick={onClickButton}>{textButton}</button>
    );
  }

  export default Button;
  