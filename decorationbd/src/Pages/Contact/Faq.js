import React from 'react'
import { FaChevronDown } from "react-icons/fa";
import "./Faq.scss";
function Faq({faq,index,toggleFaq}) {
  return (
    <div className={"faq" + `${faq.open?" open":""}`} onClick={()=>toggleFaq(index)}>
      <div className='faq-question'>
        {faq.question}
        <FaChevronDown className='768px:inline hidden'/>
      </div>
      <div className='faq-answer'>
        {faq.answer}
      </div>
    </div>
  )
}

export default Faq
