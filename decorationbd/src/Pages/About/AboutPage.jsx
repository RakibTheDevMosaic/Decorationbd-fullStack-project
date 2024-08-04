import React from "react";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa6";
// import p1 from "../../Assets/img/About image/Monitro Arm3.jpeg";
import p1 from "../../Assets/img/About image/mA2.jpg"
import p2 from "../../Assets/img/About image/mr.jpg";
import p3 from "../../Assets/img/About image/MonitorArm.jpg";
import d1 from "../../Assets/img/About image/peopleImg/dev1.jpg";
import d2 from "../../Assets/img/About image/peopleImg/wd.jpeg";
import d3 from "../../Assets/img/About image/peopleImg/ddv.png";
import d4 from "../../Assets/img/About image/peopleImg/dev4.jpg";
import "./AboutPage.scss";

const AboutPage = () => {
  return (
    <div className="aboutSection">
      <div className="paragraphSection">
       <div className="allParas w-[100%] 300px:w-[98%] 1500px:w-11/12 1024px:w-[98%] 1280px:w-[96%]
       grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 ">
       <div className="para1">
          <div className="smallTxt">SOME WORDS ABOUT US</div>
          <div className="bigTxt">
            Well-coordinated teamwork speaks About Us
          </div>
        </div>
        <div className="para2">
          <h3>We love what we do</h3>
          <p>
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia.
          </p>
          <button>read more...</button>
        </div>
        <div className="para3">
          <h3>Our working process</h3>
          <p>
            She packed her seven versalia, put her initial into the belt and
            made herself on the way.
          </p>
          <button>read more...</button>
        </div>
       </div>
      </div>
      <div className="onlineStore w-[100%] 300px:w-[98%] 1280px:w-[96%] 1500px:w-11/12 mx-auto">
        <div className="imagePart">
          <img src={p1} alt="" />
        </div>
        <div className="paraPart">
          <h1>About our online store</h1>
          <div className="someParagraphs">
            <div className="p1">
              Risus suspendisse a orci penatibus a felis suscipit consectetur
              vestibulum sodales dui cum ultricies lacus interdum.
            </div>
            <div className="p2">
              One morning, when Gregor Samsa woke from troubled dreams, he found
              himself transformed in his bed into a horrible vermin. He lay on
              his armour-like back, and if he lifted his head a little he could
              see his brown belly, slightly domed and divided by arches into
              stiff.
            </div>
            <div className="p3">
              Dictumst per ante cras suscipit nascetur ullamcorper in nullam
              fermentum condimentum torquent iaculis reden posuere potenti
              viverra condimentum dictumst id tellus suspendisse
            </div>
          </div>
          <div className="bottomPart">
            <div className="txt">Developed by <span>DevMosaic</span> @ 2023.</div>
            <div className="icons">
              <span>
                <FaFacebookF />
              </span>
              <span>
                <FaEnvelope />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="ourTeam w-[98%] 300px:w-[96%] 1024px:w-[98%] 1280px:w-[96%] 1500px:w-11/12 mx-auto">
        <div className="headingPart">
          <h5 className="smalltxt">WORDS ABOUT US</h5>
          <h1>Our Team</h1>
          <p>
            Convallis ullamcorper aliquet ultrices orci cum vestibulum lobortis
            erat.
          </p>
        </div>
        <div className=" profilePart grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[10px] lg:gap-[8px] xl:gap-[10px] 1500px:gap-[5px]">
          <div className="prsn rounded-md shadow-md shadow-black">
            <div className="img">
              <img src={d1} alt="" />
            </div>
            <h2>Mark Jance</h2>
            <h5>CEO / FOUNDER</h5>
            <div className="socialIcons">
              <span>
                <FaFacebookF />
              </span>
              <span>
                <FaTwitter />
              </span>
              <span>
                <FaLinkedinIn />
              </span>
              <span>
                <FaInstagram />
              </span>
            </div>
          </div>
          <div className="prsn rounded-md shadow-md shadow-black">
          <div className="img">
              <img src={d4} alt="" />
            </div>
            <h2> Aviana Plummer</h2>
            <h5>CEO / FOUNDER</h5>
            <div className="socialIcons">
              <span>
                <FaFacebookF />
              </span>
              <span>
                <FaTwitter />
              </span>
              <span>
                <FaLinkedinIn />
              </span>
              <span>
                <FaInstagram />
              </span>
            </div>
          </div>
          <div className="prsn rounded-md shadow-md shadow-black">
           <div className="img">
              <img src={d2} alt="" />
            </div>
            <h2> Braydon Wilkerson</h2>
            <h5>CEO / FOUNDER</h5>
            <div className="socialIcons">
              <span>
                <FaFacebookF />
              </span>
              <span>
                <FaTwitter />
              </span>
              <span>
                <FaLinkedinIn />
              </span>
              <span>
                <FaInstagram />
              </span>
            </div>
          </div>
          <div className="prsn rounded-md shadow-md shadow-black">
          <div className="img">
              <img src={d3} alt="" />
            </div>
            <h2>Kristin Watson </h2>
            <h5>CEO / FOUNDER</h5>
            <div className="socialIcons">
              <span>
                <FaFacebookF />
              </span>
              <span>
                <FaTwitter />
              </span>
              <span>
                <FaLinkedinIn />
              </span>
              <span>
                <FaInstagram />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bottomImgSection w-[100%] 300px:w-[98%] 1280px:w-[96%] 1500px:w-11/12 mx-auto">
        <div className="imgContainer1">
          <div className="img">
            <img src={p2} alt="" />
          </div>
          <div className="heading">
            <h1>Our company history and facts</h1>
          </div>
          <p>
            I should be incapable of drawing a single stroke at the present
            moment; and yet I feel that I never was a greater artist than now.
          </p>
        </div>
        <div className="imgContainer2">
          <div className="img">
            <img src={p3} alt="" />
          </div>
          <div className="heading">
            <h1>Design & development process demonstration</h1>
          </div>
          <p>
            A wonderful serenity has taken possession of my entire soul,like
            these sweet mornings of spring which I enjoy with my whole heart.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
