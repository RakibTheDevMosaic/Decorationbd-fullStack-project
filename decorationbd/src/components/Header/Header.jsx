import React, { useEffect, useRef, useState } from "react";
import Styles from "../../Styles/Styles.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../Assets/img/Logo.png";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoMdMenu } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import Navbar from "./Navbar.jsx";
import AnimationNavbar from "./AnimationNavbar.jsx"
import { productData } from "../../Static/Data.js";
import CartPopup from "../../components/CartPopup/CartPopup.jsx"
// import WishListPopup from "../../components/WishListPopup/WishListPopup.jsx"
import DropDown from "../../components/DropDown/DropDown.jsx";
import "./Header.scss";
import "../CartPopup/CartPopup.scss"
import {  RxCross2 } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { FcAbout } from "react-icons/fc";
import { MdContactPhone } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import MobileSideBarCategory from "../../components/MobileSideBarCategory/MobileSideBarCategory.jsx"
import useFetch from "../../customHooks/useFetch.js";
import { getToken } from "../../Redux/UserAndAuthServices/LocalStorageService.js";
import usrProfilepic from "../../Assets/img/ProfileImg/developer.png";
import { useSelector } from "react-redux";
import { useFetchCartItemsQuery } from "../../Redux/CartSlice/cartApi.js";
import {useGetLoggedUserQuery} from "../../Redux/UserAndAuthServices/userAuthApi.js";

const Header = ({dropDown,setDropDown}) => {
  const { data: cartItems, error, isLoading, refetch} = useFetchCartItemsQuery();
  // const [cartData,setCartData] = useState(cartItems)
  const totalCartItems = cartItems?.[0]?.total_cartitems;
  const totalPrice = cartItems?.[0]?.total_price;
  const AllProductData = useFetch('api/products/');
  const [ActiveHeading,setActiveHeading] = useState(1);
  const [active, setActive] = useState(false);
  const[searchTerm,setSearchTerm] = useState("");
  const [searchData,setSearchData] = useState(null);
  const [openCart,setOpencart] = useState(false);
  const navigate = useNavigate();
  // state for mobile
  const [openMobileSideBar,setOpenMobileSideBar] = useState(false);
  const [activeMenu,setActiveMenu] = useState(2);
  const handleSearchChange = (e)=>{
    const term = e.target.value;
    setSearchTerm(term);

    const filteredData = AllProductData && AllProductData?.filter((product)=>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredData);
  }


  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  useEffect(()=>{
    refetch();
  },[])

  // const cartButton = document.getElementById('cartButton');
  // const cartpopup = document.getElementById('cartpopup');
  

  // let cartRef = useRef();

  // useEffect(() => {
  //   const handler = (e) => {
  //     if (!cartRef.current.contains(e.target) && e.target.id !== 'cartpopup') {
  //       setOpencart(false);
  //     }
  //   };
  
  //   document.addEventListener('click', handler);
  
  //   return () => {
  //     document.removeEventListener('click', handler);
  //   };
  // }, [setOpencart]);

  let searchRef = useRef();

   useEffect(() => {
    const handler = (e) => {
      if (!searchRef.current.contains(e.target)) {
        setSearchData(null);
      }
    };
  
    document.addEventListener('click', handler);
  
    return () => {
      document.removeEventListener('click', handler);
    };
  }, [setSearchData]);
  const location = useLocation()

  const { access_token } = getToken();
  // const { username } = useSelector(state => state.user)
  const { data:profileData, isSuccess, refetch:profilerefetch } = useGetLoggedUserQuery(access_token)
  // console.log(profileData)
  useEffect(()=>{
    profilerefetch()
  },[profileData,isSuccess])
  return (
    <>
      <div className="1280px:h-[80px] h-full w-full bg-[#212121]">
        <div className={`${Styles.section}`}>
          <div
            className="hidden 1280px:h-[40%] 1280px:py-[10px] 1280px:flex 
       w-full items-center justify-between "
          >
            <div className="1350px:ml-[80px] 1280px:ml-[40px]">
              <Link to="/">
                <img src={logo} alt="logo" className="h-[60%]  w-[60%] object-contain"/>
              </Link>
            </div>
            {/* search box */}
            <div className="relative w-[40%]" ref={searchRef}>
              <input
                type="text"
                placeholder="Search Product..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="h-[34px] w-[88%] px-2  1280px:ml-[110px] 1350px:ml-[80px] text-[12px] 
            border-[#212121] border-[2px] rounded-md outline-none"
              />
              <AiOutlineSearch
                size={20}
                className="absolute 1280px:right-[-40px] 1350px:right-[-10px] top-1.5 cursor-pointer 
            "
              />
              {searchData  && searchData.length !== 0 ? (
                <div className="absolute max-h-[70vh] bg-white shadow-[gray]
                shadow-md z-[9] w-[87%]  ml-[83px] overflow-y-scroll">
                  {searchData&& searchData.map((i,index)=>{
                    const d = i.name;
                    
                    const Product_name = encodeURIComponent(d.replace(/\//g, '~'));
                    return(
                      <Link to={`/product/${Product_name}`} >
                        <div className="flex w-full items-start py-3" key={index} onClick={()=>{setSearchTerm("");setSearchData(null)}}>
                          <img src={process.env.REACT_APP_IMG_URL + i.product_imgs[0].images} alt="" className="w-[30px] h-[30px] ml-[10px] mr-[10px]"/>
                          <h1 className="font-semibold text-[#077bc4] 1280px:text-[14px] 1350px:text-[12px]">{i.name}</h1>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ):null}
            </div>

              {
                access_token ? (
                <div className='flex items-center'>
                  <div className="flex items-center gap-[10px] cursor-pointer group hover:bg-[rgba(255,255,255,0.2)] p-[5px] rounded-[5px]" onClick={()=>{navigate('/profile')}}>
                     <div className="w-[40px] h-[40px] overflow-hidden rounded-full border-[3px] border-[#2fb203]">
                     <img src={process.env.REACT_APP_IMG_URL+profileData?.profile_picture} alt="" className="w-full h-full object-cover"/>
                     </div>
                      <div className="text-[#fff] group-hover:text-white">
                        <p className="text-[10px] font-[400]">Hello,{profileData?.username}</p>
                        <h6 className="text-[12px] font-[500]">Orders & Account</h6>
                      </div>
                  </div>

                </div>) : (
                    <div className={`${Styles.normal_flex}`}>
                    <div className=" cursor-pointer  flex items-center gap-[10px] px-[8px] py-[4px]
                    rounded-md group hover:bg-white hover:text-[#242424]"
                    onClick={()=>navigate('/login')}>
                      <FaRegUser
                        size={18}
                        className=" group-hover:text-black text-white text-[14px]"
                      /><span className="text-white group-hover:text-black font-[400] capitalize text-[14px]"
                      >login</span>  
    
                    </div><span className="text-white px-[15px]">|</span>
                    <div className="cursor-pointer rounded-md group hover:bg-white px-[5px] py-[4px]"
                    onClick={()=>navigate('/signUp')}>
                    <span className="text-white group-hover:text-black font-[400]  capitalize text-[14px]"
                      >sign up</span>
                    </div>
                </div>
                )
              }    

          


          </div>
        </div>
      </div>
        <div>
            {
              active ? (<div className={`${
                active === true ? "shadow shadow-[gray] fixed top-0 left-0 z-10 headerAnimation" : null
              }
           hidden 1280px:flex items-center justify-between w-full bg-[#242424] h-[60px] z-[9]`}>
            <div className={`1350px:${Styles.section} 1280px:w-[97%] mx-auto relative ${Styles.normal_flex} justify-between `}>
            <div className="overflow-hidden h-full p-1 ">
                <Link to={`/`}>
                 <img src={logo} alt="" className="h-[50%] w-[50%] object-contain"/>
                </Link>
              </div>
              <div className={`${Styles.normal_flex}`}>
            <AnimationNavbar ActiveHeading={ActiveHeading} setActiveHeading={setActiveHeading}/>
          </div>
          <div className="flex">
            <div className={`${Styles.normal_flex} 1350px:mr-[20px]`}>
              <div className="relative cursor-pointer mr-[15px] " onClick={()=>setOpencart(true)}>
                <AiOutlineShoppingCart size={25} className="text-white"/>
                <span
                  className="absolute right-0 top-0 rounded-full bg-[#007bc4] w-[14px]
              h-[14px]  p-0 m-0 text-white font-mono text-[10px] text-center"
                >
                  {access_token ? (<>
                      {cartItems?.length === 0 ? 0 : totalCartItems}
                  </>):0}
                  {/* {access_token === null && cartItems?.length === 0 ? 0 : totalCartItems} */}
                </span>
              </div>
              <span className="text-sm font-[600] text-white">
              {access_token ? (<>
                      {cartItems?.length === 0 ? '0.00' : Number(totalPrice).toFixed(2)}
                  </>):'0.00'}
                {/* {access_token === null && cartItems?.length === 0 ? '0.00' : Number(totalPrice).toFixed(2)}<strong className="mr-2">৳</strong> */}
              </span>
            </div>
          </div>
            </div>

              </div>):(<div className={`${active === true ? "shadow shadow-[gray] fixed top-0 left-0 z-10 headerAnimation" : null
        }
     hidden 1280px:flex items-center justify-between w-full bg-[#eaeaea] h-[60px] z-[99] 
     border-b-[1px] border-[rgba(0,0,0,0.3)]`}>
              <div className={`1350px:${Styles.section} 1280px:w-[97%] mx-auto relative ${Styles.normal_flex} justify-between `}>
              <div className="relative h-[56px] w-[350px] mt-[2px] ml-5 hidden 1280px:block"
              onClick={()=>{
                if (location.pathname !== "/" && location.pathname !== "/shop") {
                  setDropDown(!dropDown);
                }
                
              }}>
                <IoMdMenu size={22} className="absolute left-2 top-4 text-white" />
                <button
                  className="h-[100%] w-full flex items-center justify-between
            pl-10 py-2 bg-[#007bc4] font-sans text-[14px] font-[500] select-none rounded-t-md uppercase text-white"
                >
                  browse categories
                </button>
                <IoIosArrowDown
                  size={18}
                  className="absolute right-2 top-4 cursor-pointer text-white"
                />
              </div>
              <div className={`${Styles.normal_flex}`}>
            <Navbar ActiveHeading={ActiveHeading} setActiveHeading={setActiveHeading}/>
          </div>
          <div className="flex">
            <div className={`${Styles.normal_flex} mr-[50px]`} >
              <div className="relative cursor-pointer mr-[15px] " onClick={()=>setOpencart(true)} id="cartButton">
                <AiOutlineShoppingCart size={25} />
                <span
                  className="absolute right-0 top-0 rounded-full bg-[#007bc4] w-[14px]
              h-[14px]  p-0 m-0 text-white font-mono text-[10px] text-center"
                >
                  {access_token ? (<>
                      {cartItems?.length === 0 ? 0 : totalCartItems}
                  </>):0}
                  {/* {access_token === null && cartItems?.length === 0 ? 0 : totalCartItems} */}
                </span>
              </div>
              <span className="text-sm font-[600]">
              {access_token ? (<>
                      {cartItems?.length === 0 ? '0.00' : Number(totalPrice).toFixed(2)}
                  </>):'0.00'}
              {/* {access_token === null && cartItems?.length === 0 ? '0.00' : Number(totalPrice).toFixed(2)}<strong className="mr-2">৳</strong> */}
              </span>

            
            </div>
          </div>
          {
            dropDown? (
              <div className={`absolute top-[58px] left-[20px] dropDown`}>
                <DropDown setDropDown={setDropDown} />
              </div>
            ):null
          }
      
              </div>

              </div>)
            }

            {/* Cart popup */}


            {
            openCart?(
              <div  className='fixed top-0 left-0 w-full h-screen bg-[#0000004b] z-10 ' id='cartpopup' >
                <div className={`fixed top-0 right-0 min-h-screen z-50
       bg-white flex flex-col justify-between 1280px:w-[25%] 768px:w-[60%] 1024px:w-[45%] w-[80%]
        shadow-md rounded-sm cartPopup`}
       >
                  <CartPopup setOpencart={setOpencart} openCart={openCart}/>
                </div>
              </div>
            ):null
          }
        </div>

      {/* mobile header */}
      <div className={`${openCart? 'z-0' : 'z-20'} w-[100%] h-[70px] 768px:h-[75px]  fixed bg-black text-white  top-0 left-0 
      shadow shadow-[#fff] rounded-sm 1280px:hidden`}>
        <div className="w-full flex items-center justify-between">
          <div onClick={()=>{setOpenMobileSideBar(true)}} className="flex items-center 768px:gap-[5px]
          gap-[2px]">
            <IoMdMenu size={30}
            className="ml-4 text-white"
            /> <span className="uppercase font-[600] 
            hidden 768px:inline 768px:text-[18px] text-white">menu</span>
          </div>
          <div>
            <Link to='/'>
              <img src={logo} alt="" className="mt-2 cursor-pointer 768px:h-[60px] h-[50px] w-[150px]
              768px:mr-[50px] object-contain"/>
            </Link>
          </div>
          <div className="relative mr-[20px]" onClick={()=>setOpencart(true)}>
            <AiOutlineShoppingCart size={30} className=" text-white"/>
            <span
                  className="absolute right-0 top-0 rounded-full bg-[#007bc4] w-4
              h-4  p-0 m-0 text-white font-mono text-[12px] text-center"
                >
                  {access_token ? (<>
                      {cartItems?.length === 0 ? 0 : totalCartItems}
                  </>):0}
                </span>
          </div>
        </div>
        {/* header sideBar */}
        {
          openMobileSideBar&&(
            <div className="fixed w-full h-full left-0 top-0 bg-[#0000005f] z-20">
              <div className={`${openMobileSideBar?"openSideBar":""} fixed w-[80%] 768px:w-[60%] 1024px:w-[50%] bg-[#fff] 
              h-screen top-0 left-0 z-10 overflow-y-scroll`}>
                <div className="flex justify-end pr-3">
                  <RxCross2 size={30} className="mt-5 text-black"
                  onClick={()=>setOpenMobileSideBar(false)}/>
                </div>
                <div className="my-8 w-[94%] m-auto h-[40px] relative shadow-md shadow-[gray] rounded-sm py-1">
                  <input type="search"
                  placeholder="Search for products..."
                  className="h-[40px] w-full px-8  text-[#242424] 
                  outline-none placeholder:text-[16px] " 
                  value={searchTerm}
                  onChange={handleSearchChange}
                  />
                   <AiOutlineSearch
                size={19}
                className="absolute right-1 text-[gray] top-[9px] cursor-pointer
            "
              />
                  {
                    searchData  && searchData.length !== 0 ?  (
                      <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                        {
                          searchData&& searchData.map((i,index)=>{
                            const d = i.name;
                            const Product_name = encodeURIComponent(d.replace(/\//g, '~'));
                            return(
                              <Link to={`/product/${Product_name}`} key={index}>
                              <div className="flex items-center my-1"  onClick={()=>{setOpenMobileSideBar(false);setSearchTerm("");setSearchData(null)}}>
                                <img src={process.env.REACT_APP_IMG_URL + i.product_imgs[0].images} alt="" className="w-[50px] h-[50px] mr-[10px] object-contain"/>
                                <h5 className="font-semibold text-[#242424]">{i.name}</h5>
                              </div></Link>
                            )
                          } )
                        }
                      </div>
                    ) : null
                  }
                </div>
                <div className="w-[96%] flex items-center justify-center mx-auto">
                  <h4 className={`${activeMenu===1? "border-b-[3px] border-[#077bc4] bg-[#eee]":""} 
                  py-2 w-[45%] pl-5 uppercase text-[20px] font-[400] text-[#242424]`}
                  onClick={()=>{
                    setActiveMenu(1);
                  }}>menu</h4>
                  <h4 className={`${activeMenu===2? "border-b-[3px] border-[#077bc4] bg-[#eee]":""}
                  py-2 w-[55%] pl-5 uppercase text-[20px] font-[400] text-[#242424]`}
                  onClick={()=>{
                    setActiveMenu(2);
                  }}>categories</h4>
                </div>
                <div>
                {
                  activeMenu===1 && (
                    <div className="w-[96%] ml-[15px] flex flex-col justify-center mt-[30px] ">
                      <div className="mb-[20px]">
                       <Link to="/" className="flex gap-[10px] items-center" onClick={()=>setOpenMobileSideBar(false)}>
                        <FaHome size={30} className="text-[#242424]"/>
                        <h4 className="text-[18px] uppercase text-[#242424] font-[400] mt-[6px]">home</h4>
                       </Link>
                      </div>
                      <div className="mb-[20px]">
                       <Link to="/shop" className="flex gap-[10px] items-center" onClick={()=>setOpenMobileSideBar(false)}>
                        <CiShop size={30} className="text-[#242424]"/>
                        <h4 className="text-[18px] uppercase text-[#242424] font-[400] mt-[6px]">shop</h4>
                       </Link>
                      </div>
                      <div className="mb-[20px]">
                       <Link to="/about" className="flex gap-[10px] items-center" onClick={()=>setOpenMobileSideBar(false)}>
                        <FcAbout size={30} className="text-[#242424]"/>
                        <h4 className="text-[18px] uppercase text-[#242424] font-[400] mt-[6px]">about us</h4>
                       </Link>
                      </div>
                      <div className="mb-[26px]">
                       <Link to="/contact" className="flex gap-[10px] items-center" onClick={()=>setOpenMobileSideBar(false)}>
                        <MdContactPhone size={30} className="text-[#242424]"/>
                        <h4 className="text-[18px] uppercase text-[#242424] font-[400] mt-[6px]">contact us</h4>
                       </Link>
                      </div>
                      {!access_token? (
                        <div className="mb-[15px]">
                        <div  className="flex gap-[10px] items-center">
                         <FaRegUserCircle size={30} className="text-[#242424]"/>
                         <h4 className="text-[18px] uppercase text-[#242424] font-[500] mt-[6px]"><span onClick={()=>{
                           navigate('/login');
                           setOpenMobileSideBar(false)
                         }}>login</span> / <span onClick={()=>{navigate('/signUp');setOpenMobileSideBar(false)}}>registration</span></h4>
                        </div>
                       </div>
                      ):(
                        <div className="mt-[50px] w-[calc(100%-15px)] ">
                          <div className=" w-[50%] mx-auto text-center flex flex-col items-center">
                            <img src={process.env.REACT_APP_IMG_URL+profileData?.profile_picture} alt="profile_pic" 
                            className="w-[80px] h-[80px] overflow-hidden 
                            rounded-full border-[3px] border-[#2fb203] object-cover"/>
                            <p className="text-[16px] text-[#242424] font-[400] mt-[10px]">Hello, {profileData?.username}</p>
                            <Link to='/profile' className="w-[120px] h-[30px] border-[2px] border-[#2fb203] outline-none py-1 
                            text-[14px] text-[#242424] font-[400] mt-[10px]"
                            onClick={()=>setOpenMobileSideBar(false)}>View Profile</Link>
                          </div>
                        </div>
                      )}

                    </div>
                  )
                }
                {
                  activeMenu===2 && (
                    <div className="w-[94%] mx-auto mt-[35px]">
                      <MobileSideBarCategory setOpenMobileSideBar={setOpenMobileSideBar}/>
                    </div>
                  )
                }
                </div>
              </div>
            </div>
          )
        }
        {/* Mobile cart popUp */}
        {/* {
            openCart?(
              <CartPopup setOpencart={setOpencart}/>
            ):null
          } */}
      </div>
    </>
  );
};

export default Header;
