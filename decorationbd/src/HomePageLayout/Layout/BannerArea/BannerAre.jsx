import React, { useEffect, useState } from 'react'
import "./BannerArea.scss"
import useFetch from "../../../customHooks/useFetch"
const BannerAre = () => {
  const banData = useFetch('api/banner/');
  return (
    <div className={`1350px:w-[94%] 1024px:w-[98%] 1280px:w-[95%] mx-auto w-[98%] `}>
      <div className="imageContainer grid grid-cols-1 md:grid-cols-3">
        <div className="firstImg">
           <img src={process.env.REACT_APP_IMG_URL+banData?.[0]?.img} alt="" />
        </div>
        <div className="midTwoimg grid grid-cols-1 grid-rows-2">
            <div className="midImg1"><img src={process.env.REACT_APP_IMG_URL+banData?.[1]?.img} alt="" /></div>
            <div className="midImg2"><img src={process.env.REACT_APP_IMG_URL+banData?.[2]?.img} alt="" /></div>
        </div>
        <div className="lastImg">
            <img src={process.env.REACT_APP_IMG_URL+banData?.[3]?.img} alt="" />
        </div>
      </div>
    </div>
  )
}

export default BannerAre
