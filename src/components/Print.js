import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useReactToPrint } from 'react-to-print'


 const Print=({referance})=> {

  return (

    <div className='mainpage-main-1' ref={referance} style={{width:"100%",height:window.innerHeight}}>
            <h1>selam </h1>
            <h1>selam </h1>
            <h1>selam </h1>
            <h1>selam </h1>
    </div>
  
  )
}

export default Print