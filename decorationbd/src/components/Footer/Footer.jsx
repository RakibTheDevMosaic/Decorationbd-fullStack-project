import React from "react";
// import Style from "../../../Styles/Styles";
import logo from "../../Assets/img/footerlogo.png";
import lg from "../../Assets/img/pay.png";
import { FaEnvelope, FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa6";
// import { FaRegEnvelope } from "react-icons/fa";
import { FaMobile } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";

import "./Footer.scss";
const Footer = () => {
  return (
    <div className={`footerSection`}>

        
        {/*  */}
      
      

      
      <div
        className="others flex 768px:items-center 300px:flex-col 300px:justify-center 
        768px:flex-row 768px:gap-[10px] 300px:w-[100%] h-[100%] 1024px:w-[90%] 1024px:h-[100%]
        1350px:w-[85%] 1350px:h-[80%] mx-auto "
      >
        <div className="footerImg">
          <div className=" ">
            <img src={logo} alt="" className="1280px:w-[200px] 1280px:h-[200px] 
            300px:w-[155px] 300px:h-[170px] 300px:mx-auto 768px:w-[180px] 768px:h-[180px] 768px:mx-0 object-contain "/>
          </div>
     
        </div>
        <div className="category ">
          <div className="title">popular categories</div>
          <div className="items">
            <div>Monitor Arm/Stand</div>
            <div>Pets house</div>
            <div>Home & Decor</div>
            <div>New Arrival</div>
          </div>
        </div>
        <div className="links ">
          <div className="title">Useful Links</div>
          <div className="items">
            <div>About Us</div>
            <div>Payment Method</div>
            <div>Delivery Policy</div>
            <div>Return & Refund Policy</div>
            <div>Terms & Conditions</div>
          </div>
        </div>
        <div className="contact 1350px:mb-[20px]">
          <div className="title">Contact Us</div>
          <div className="item">
            <FaMobile />
            <span>+8801717381296</span>
          </div>
          <div className="item">
            <FaEnvelope />
            <span> mnhodarajib@gmail.com</span>
          </div>
          <div className="item ">
      
          <a href="#" className="1350px:text-[14px] ">
            <FaFacebookF />
          </a>
          <a href="#" className="1350px:text-[14px] ">
            <FaInstagram />
          </a>
          <a href="#" className="1350px:text-[14px] ">
            <FaTwitter />
          </a>
          <a href="#" className="1350px:text-[14px] ">
            <FaYoutube />
          </a>
          <a href="#" className="1350px:text-[14px] ">
            <FaPinterestP />
          </a>
        
          </div>
        </div>
      </div>
      
      <div className="w-full bg-[#000000] h-[10%]">
        <div className="1350px:w-[88%] 1280px:w-[90%] 768px:w-[90%] w-[100%] bg-[#27292c] justify-center mx-auto rounded-sm
        text-[13px] h-[50px] text-[#d4d5d5] font-[600] flex items-center">all rights reserved © 2020 - 2024 decorationbd.com ​</div>
      </div>
    </div>
  );
};

export default Footer;
