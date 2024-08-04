import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import "./BannerSlider.scss";
import DropDown from "../Layout/StickyCategory/SickyCategory";
import useFetch from "../../customHooks/useFetch";

const BannerSlider = () => {
  const bData = useFetch('api/sliderImg/');
  console.log(bData)
  const [currentSlider, setCurrentSlider] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const prevSlider = () => {
    setCurrentSlider(currentSlider === 0 ? bData?.length - 1 : currentSlider - 1);
  };
  const nextSlider = () => {
    setCurrentSlider(currentSlider === bData?.length - 1 ? 0 : currentSlider + 1);
  };

  useEffect(() => {
    let timeOut = null;
    timeOut =
      autoplay &&
      setTimeout(() => {
        nextSlider();
      }, 3500);
  });



  return (
      <div className="flex  1280px:justify-between  justify-center 1280px:w-[94%] 1350px:w-[94.15%] mx-auto">
        <div className="category_dropdown 1280px:block  
        hidden">
            <DropDown/>
        </div>
        <div className="carousle !mx-auto">
      <div className="carousle_wrapper ">
        {bData?.map((item, index) => {
       
          return (
            <div
              key={index}
              className={
                index === currentSlider
                  ? "carousle_card carousle_card-active"
                  : "carousle_card"
              } onMouseEnter={()=>setAutoplay(false)} onMouseLeave={()=>setAutoplay(true)}
            >
              <img src={process.env.REACT_APP_IMG_URL+item.img} alt={item.title} />
            </div>
          );
        })}
        <div className="arrow_left" onClick={prevSlider}>
          <IoIosArrowBack />
        </div>
        <div className="arrow_right" onClick={nextSlider}>
          <IoIosArrowForward />
        </div>
        <div className="pagination">
          {bData?.map((_, index) => {
            return (
              <div
                key={index}
                className={
                  index === currentSlider
                    ? "pagination_dot pagination_dot-active"
                    : "pagination_dot"
              } onClick={()=>{setCurrentSlider(index)}}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
      </div>
  );
};

export default BannerSlider;
