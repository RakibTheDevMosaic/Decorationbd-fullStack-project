import React, { useState } from 'react'
import "./EndLine.scss"
// import Style from "../../../Styles/Styles";
const EndLine = () => {
    const [loadEndLine,setLoadEndLine] = useState(false)
  return (
    <div className={`h-[30px] 768px:h-[50px] 1500px:h-[80px] 1024px:h-[60px] 1500px:w-11/12 mx-auto w-[97%] 1280px:w-[94%] 1280px:mx-auto
     mt-[30px] mb-[30px] 1500px:ml-[94px] 1500px:mr-[50px] overflow-hidden`} >
      <div className={`h-full w-full p-[3px] bg-black ${loadEndLine?"":"sliding-line"} `}
      onLoad={()=>{setLoadEndLine(true)}}></div>
    </div>
  )
}

export default EndLine
