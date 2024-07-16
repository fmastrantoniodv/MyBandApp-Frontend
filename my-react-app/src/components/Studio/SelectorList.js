import React, { useEffect, useState } from 'react';

function SelectorList({ textButton, onClickButton, arrayList }) {
  const [pressState, setPressState] = useState(false)

  useEffect(()=>{
    
  }, [])   

  const handleClickButton = () => {
    setPressState(!pressState)
    onClickButton()
  }
  
    return (
      <div>
        <ul>
            {
                arrayList.map(item =>{
                    return <li>{item.id}</li>
                })
            }
        </ul>
      </div>
    );
  }

  export default SelectorList;
  