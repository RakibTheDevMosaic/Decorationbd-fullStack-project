import React, { useState } from 'react'
import Style from "../../../Styles/Styles";
import "./HomeDecor.scss";
import pic from "../../../Assets/img/bannerImg/banner4.jpg"
import { productData } from '../../../Static/Data';
import FeaturedProduct from "../FeaturedProduct/FeaturedProduct.jsx"
// import ProductCard from '../../../components/ProductCard/ProductCard.jsx';
import HdProductCard from "../../../components/HomeDecProCard/HdProductCard.jsx"
import image from "../../../Assets/img/ProductNotFound/img4.jpg";
import useFetch from '../../../customHooks/useFetch.js';
const HomeDecor = ({open,setOpen}) => {
  const hAndDAllData = useFetch('api/HomeDecorAll/');
  // console.log(hAndDAllData);
  const wallShelfData = useFetch('api/WallShelf/');
  const flowerStandData = useFetch('api/FlowerStand/');
  const floorLempData = useFetch('api/FloorLemp/');
  const tableLempData = useFetch('api/TableLemp/');
  const [active,setActive] = useState(1);
  const [allData,setAllData] = useState(true);
  const [wallShelf,setWallShelf] = useState(false);
  const [floorLemp,setFloorLemp] = useState(false);
  const [flowerStand,setflowerStand] = useState(false);
  const [tableLemp,setTableLemp] = useState(false);
  return (
    <div className={`1350px:w-[94%] 1350px:mx-auto 1024px:w-[98%] 1280px:w-[96%] 768px:mx-auto 
     ml-0 homeDecorContainer  1024px:p-[5px] p-[2px]`}>
      <div className="bannerAndFeatureSection ml-[10px] grid grid-cols-1">
        <div className="bannerPart">
            <img src={pic} alt="" />
            <h1 className='font-Roboto font-bold'>smart <br /> computing</h1>
            <button>Read more</button>
        </div>
        <div className="featuredPart">
          <h1 className='font-bold rounded-xl shadow-lg shadow-slate-500' >featured products</h1>
          <div className="grid grid-cols-1 grid-rows-5 1500px:w-[90%] w-[92%] mx-auto">
            {hAndDAllData?.slice(0,5).map((i,index)=>(
              <FeaturedProduct data={i} key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="homeDecorProductSection">
          <div className="headingSbcategory font-bold">
              <h1>home & decor</h1>
          <div className="subCategories font-semibold 300px:overflow-x-scroll whitespace-nowrap scroll scroll-smooth 768px:overflow-x-hidden">
          <span className={`${active===1?"text-[#077bc4]":""}`}
          onClick={()=>{
            setActive(1);
            setAllData(true);
            setWallShelf(false);
            setFloorLemp(false);
            setflowerStand(false);
            setTableLemp(false);
          }}>
            All
          </span>
          <span className={`${active===2?"text-[#077bc4]":""}`}
          onClick={()=>{
            setActive(2);
            setAllData(false);
            setWallShelf(true);
            setFloorLemp(false);
            setflowerStand(false);
            setTableLemp(false);
          }}>
            Wall - Shelf
          </span>
          <span className={`${active===3?"text-[#077bc4]":""}`}
          onClick={()=>{
            setActive(3);
            setAllData(false);
            setWallShelf(false);
            setFloorLemp(false);
            setflowerStand(true);
            setTableLemp(false);
          }}>Flower- Stand</span>
          <span className={`${active===4?"text-[#077bc4]":""}`}
          onClick={()=>{
            setActive(4);
            setAllData(false);
            setWallShelf(false);
            setFloorLemp(true);
            setflowerStand(false);
            setTableLemp(false);
          }}> Floor-Lemp</span>
          <span className={`${active===5?"text-[#077bc4]":""}`}
          onClick={()=>{
            setActive(5);
            setAllData(false);
            setWallShelf(false);
            setFloorLemp(false);
            setflowerStand(false);
            setTableLemp(true);
          }}> Table-Lemp</span>
          </div> 
          </div>


           <div>
            {allData?(
               <div>
               {hAndDAllData?.length===0?(
                         <div
                         className={`homeDecorProductCard`}
                       >
                         <img src={image} alt="" className='1024px:w-[1000px] w-full 1024px:h-[500px] h-full 
                         1024px:object-cover object-contain'/>
                       </div> 
                 ): (
                   <div className={`grid grid-cols-2 gap-[5px] md:grid-cols-2 md:gap-[5px] lg:grid-cols-4 
                   lg:gap-[5px] xl:grid-cols-5 xl:gap-[5px] homeDecorProductCard`}>
                     {hAndDAllData?.map((item,index)=>(
                       <HdProductCard
                       data={item}
                       key={index}
                       open={open}
                       setOpen={setOpen}
                     />
                     ))}
                    </div>)}
                  </div>
            ):null}
            {wallShelf?(
             <div>
             {wallShelfData?.length===0?(
                       <div
                       className={`homeDecorProductCard`}
                     >
                       <img src={image} alt="" className='1024px:w-[1000px] w-full 1024px:h-[500px] h-full 
                       1024px:object-cover object-contain'/>
                     </div> 
               ): (
                 <div className={`grid grid-cols-2 gap-[5px] md:grid-cols-2 md:gap-[5px] lg:grid-cols-4 
                 lg:gap-[5px] xl:grid-cols-5 xl:gap-[5px] homeDecorProductCard`}>
                   {wallShelfData?.map((item,index)=>(
                     <HdProductCard
                     data={item}
                     key={index}
                     open={open}
                     setOpen={setOpen}
                   />
                   ))}
                  </div>)}
                </div>
            ):null}
            {flowerStand?(
           <div>
           {flowerStandData?.length===0?(
                     <div
                     className={`homeDecorProductCard`}
                   >
                     <img src={image} alt="" className='1024px:w-[1000px] w-full 1024px:h-[500px] h-full 
                     1024px:object-cover object-contain'/>
                   </div> 
             ): (
               <div className={`grid grid-cols-2 gap-[5px] md:grid-cols-2 md:gap-[5px] lg:grid-cols-4 
               lg:gap-[5px] xl:grid-cols-5 xl:gap-[5px] homeDecorProductCard`}>
                 {flowerStandData?.map((item,index)=>(
                   <HdProductCard
                   data={item}
                   key={index}
                   open={open}
                   setOpen={setOpen}
                 />
                 ))}
                </div>)}
              </div>
            ):null}
            {floorLemp?(
           <div>
           {floorLempData?.length===0?(
                     <div
                     className={`homeDecorProductCard`}
                   >
                     <img src={image} alt="" className='1024px:w-[1000px] w-full 1024px:h-[500px] h-full 
                     1024px:object-cover object-contain'/>
                   </div> 
             ): (
               <div className={`grid grid-cols-2 gap-[5px] md:grid-cols-2 md:gap-[5px] lg:grid-cols-4 
               lg:gap-[5px] xl:grid-cols-5 xl:gap-[5px] homeDecorProductCard`}>
                 {floorLempData?.map((item,index)=>(
                   <HdProductCard
                   data={item}
                   key={index}
                   open={open}
                   setOpen={setOpen}
                 />
                 ))}
                </div>)}
              </div>
            ):null}
            {tableLemp?(
            <div>
            {tableLempData?.length===0?(
                      <div
                      className={`homeDecorProductCard`}
                    >
                      <img src={image} alt="" className='1024px:w-[1000px] w-full 1024px:h-[500px] h-full 
                      1024px:object-cover object-contain'/>
                    </div> 
              ): (
                <div className={`grid grid-cols-2 gap-[5px] md:grid-cols-2 md:gap-[5px] lg:grid-cols-4 
                lg:gap-[5px] xl:grid-cols-5 xl:gap-[5px] homeDecorProductCard`}>
                  {tableLempData?.map((item,index)=>(
                    <HdProductCard
                    data={item}
                    key={index}
                    open={open}
                    setOpen={setOpen}
                  />
                  ))}
                 </div>)}
               </div>
            ):null}
           </div>
      </div>
    </div>
  )
}

export default HomeDecor
