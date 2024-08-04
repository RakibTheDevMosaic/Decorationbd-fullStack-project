import React, { useEffect, useState } from "react";
import "./Contact.scss";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { MdWifiCalling3 } from "react-icons/md";
import { FaRegEnvelope } from "react-icons/fa6";
import l1 from "../../Assets/img/ContactImage/location/location-4.jpg";
import l2 from "../../Assets/img/ContactImage/location/location-3.jpg";
import l3 from "../../Assets/img/ContactImage/location/location-2.jpg";
import l4 from "../../Assets/img/ContactImage/location/location-1.jpg";
import { ConData } from "./ContactData";
import Faq from "./Faq";

const ContactPage = () => {
  const [showAns, setShowAns] = useState(ConData);
  const [isLoaded, setIsLoaded] = useState(false);
  const toggleFaq = (index) => {
    setShowAns(
      showAns.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }
        return faq;
      })
    );
  };

  return (
    <div className="ContactSection">
      <div className="backgroundImage">
        {/* <img src={bg} alt="" /> */}
        <div className="bgtext">
          <h1>Keep In Touch with Us</h1>
          <div className="linktext">
            <span>
              <Link to="/">home</Link>
            </span>
            <span>/</span>
            <span>
              <Link to="/contact">contact</Link>
            </span>
          </div>
        </div>
      </div>

      <div className="storelocation w-[100%] 1024px:w-[98%] 1280px:w-[96%] 1500px:w-11/12 mx-auto">
        <div className="heaingSection">
          <h5>LOCATION STORE</h5>
          <h1>Where We Are</h1>
          <p>
            The perfect way to enjoy brewing tea on low hanging fruit to
            identify. Duis autem vel eum iriure dolor in hendrerit in vulputate
            velit esse molestie consequat, vel illum dolore eu feugiat nulla
            facilisis.
          </p>
        </div>
        <div
          className="locImgContainer gap-[10px] lg:gap-[10px] 1280px:gap-[15px] 1350px:gap-0 grid grid-cols-1 
        md:grid-cols-2 lg:grid-cols-4"
        >
          <div className="firstImg">
            <div className="img ">
              <img src={l1} alt="" />
            </div>
            <div className="iconsAndheading">
              <h3>26 Rue Pelleport - Paris</h3>
              <div className="icons">
                <div className="icon">
                  <FaLocationDot />
                  <span>
                    <small className="text-[#077bc4] text-[14px] font-bold">
                      Find us
                    </small>{" "}
                    <br />
                    Rue Saint-Antoine, Paris, Franc
                  </span>
                </div>
                <div className="icon">
                  <MdWifiCalling3 />
                  <span>
                    <small className="text-[#077bc4] text-[14px] font-bold">
                      Call us
                    </small>{" "}
                    <br />
                    (+100) 123 456 7890
                  </span>
                </div>
                <div className="icon">
                  <FaRegEnvelope />
                  <span>
                    <small className="text-[#077bc4] text-[14px] font-bold">
                      Mail us
                    </small>{" "}
                    <br />
                    DevMosaic @gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="firstImg">
            <div className="img">
              <img src={l2} alt="" />
            </div>
            <div className="iconsAndheading">
              <h3>150 Stanley Rd - London</h3>
              <div className="icons">
                <div className="icon">
                  <FaLocationDot />
                  <span>
                    <small className="text-[#077bc4] text-[14px] font-bold">
                      Find us
                    </small>{" "}
                    <br />
                    Brick Ln, Spitalfields, London, UK
                  </span>
                </div>
                <div className="icon">
                  <MdWifiCalling3 />
                  <span>
                    <small className="text-[#077bc4] text-[14px] font-bold">
                      Call us
                    </small>{" "}
                    <br />
                    (+100) 123 456 7890
                  </span>
                </div>
                <div className="icon">
                  <FaRegEnvelope />
                  <span>
                    <small className="text-[#077bc4] text-[14px] font-bold">
                      Mail us
                    </small>{" "}
                    <br />
                    DevMosaic @gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="firstImg">
            <div className="img">
              <img src={l3} alt="" />
            </div>
            <div className="iconsAndheading">
              <h3>1357 Prospect - New York</h3>
              <div className="icons">
                <div className="icon">
                  <FaLocationDot />
                  <span>
                    <small className="text-[#077bc4] text-[14px] font-bold">
                      Find us
                    </small>{" "}
                    <br />
                    Atlantic, Brooklyn, New York, US
                  </span>
                </div>
                <div className="icon">
                  <MdWifiCalling3 />
                  <span>
                    <small className="text-[#077bc4] text-[14px] font-bold">
                      Call us
                    </small>{" "}
                    <br />
                    (+100) 123 456 7890
                  </span>
                </div>
                <div className="icon">
                  <FaRegEnvelope />
                  <span>
                    <small className="text-[#077bc4] text-[14px] font-bold">
                      Mail us
                    </small>{" "}
                    <br />
                    DevMosaic @gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="firstImg">
            <div className="img">
              <img src={l4} alt="" />
            </div>
            <div className="iconsAndheading">
              <h3>86 Georgia Rd - Mardrid</h3>
              <div className="icons">
                <div className="icon">
                  <FaLocationDot />
                  <span>
                    <small className="text-[#077bc4] text-[14px] font-bold">
                      Find us
                    </small>
                    <br />
                    Calle del Correo, 4, Madrid, Spain
                  </span>
                </div>
                <div className="icon">
                  <MdWifiCalling3 />
                  <span>
                    <small className="text-[#077bc4] text-[14px] font-bold">
                      Call us
                    </small>{" "}
                    <br />
                    (+100) 123 456 7890
                  </span>
                </div>
                <div className="icon">
                  <FaRegEnvelope />
                  <span>
                    <small className="text-[#077bc4] text-[14px] font-bold">
                      Mail us
                    </small>{" "}
                    <br />
                    DevMosaic @gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mapSection hidden 768px:block">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3026.021529818787!2d-73.93399982482394!3d40.6734945713994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25c7eb506aa85%3A0x892a180666ea67af!2s1357%20Prospect%20Pl%2C%20Brooklyn%2C%20NY%2011213%2C%20USA!5e0!3m2!1sen!2sbd!4v1701000159158!5m2!1sen!2sbd"
          width="100%"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="faqSection w-[100%] 1024px:w-[98%] 1280px:w-[96%] 1350px:w-[94%] mx-auto">
        <div className="fullfaq">
          <div className="headingPart">
            <h4>INFORMATION QUESTIONS</h4>
            <h1>FREQUENTLY ASKED QUESTIONS</h1>
          </div>
          <div className="faqs">
            {showAns.map((faq, i) => (
              <Faq key={i} faq={faq} index={i} toggleFaq={toggleFaq} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
