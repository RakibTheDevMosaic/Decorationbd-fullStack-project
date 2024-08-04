import React, { useState } from 'react';
import Styles from "../../../Styles/Styles.js";
import { productData } from "../../../Static/Data.js";
import "./CartProdSec.scss";
// import HdProductCard from '../../../components/HomeDecProCard/HdProductCard.jsx';
import CatSecProdCard from "../../../components/CatSecProCard/CatProdCard.jsx"
import image from "../../../Assets/img/ProductNotFound/img4.jpg"
import useFetch from '../../../customHooks/useFetch.js';
const CatProdSec = ({open,setOpen}) => {
  const KitchenwareData = useFetch('api/Kitchenware/');
  console.log(KitchenwareData)
  const furnitureData = useFetch('api/Furniture/');
  const swingsData = useFetch('api/Swings/');
  const cncData = useFetch('api/Cnc/');
  const [active,setActive] = useState(1);
  const [sArm,setSamr] = useState(true);
  const [dArm,setDarm] = useState(false);
  const [VArm,setVarm] = useState(false);
  const [Other,setOtharm] = useState(false);
  return (
    <div className='1350px:w-[94%] 1350px:mx-auto 1024px:w-[98%] 1280px:w-[96%] 
    w-[100%]   mx-auto catProdSection'>
    <div
      className={`w-full h-full catProdContainer`}>
      <div className={` text-start flex 300px:flex-col 300px:gap-[5px] 768px:flex-row 768px:gap-[30px] 1024px:gap-[40px]
      1350px:gap-[60px] 768px:items-center`}>
        <h1 className='font-semibold'>CATEGORIES</h1>
        <div className="catsubCategories font-semibold 300px:overflow-x-scroll whitespace-nowrap scroll scroll-smooth 768px:overflow-x-hidden">
      <span className={`${active===1?"text-[#077bc4]":""}`}
          onClick={()=>{
            setActive(1);
            setSamr(true);
            setDarm(false);
            setVarm(false);
            setOtharm(false);
          }}>
            Kitchenware
          </span>
          <span className={`${active===2?"text-[#077bc4]":""}`}
          onClick={()=>{
            setActive(2);
            setSamr(false);
            setDarm(true);
            setVarm(false);
            setOtharm(false);
          }}>
            Furniture 
          </span>
          <span className={`${active===3?"text-[#077bc4]":""}`}
          onClick={()=>{
            setActive(3);
            setSamr(false);
            setDarm(false);
            setVarm(true);
            setOtharm(false);
          }}>Swings</span>
          <span className={`${active===4?"text-[#077bc4]":""}`}
          onClick={()=>{
            setActive(4);
            setSamr(false);
            setDarm(false);
            setVarm(false);
            setOtharm(true);
          }}>Cnc Products</span>
      </div>
      </div>

      <div>
      {sArm?(
       <div >
       {KitchenwareData?.length===0?(
          <div
          className={` catSecProductCard`}
        >
          <img src={image} alt="" className='w-full 1024px:h-[500px] h-full 1024px:object-cover object-contain'/>
        </div>
       ):(
          <div
          className={`grid grid-cols-2 gap-[5px] md:grid-cols-2 md:gap-[10px] 
         lg:grid-cols-4 lg:gap-[10px] xl:grid-cols-6 xl:gap-[5px] catSecProductCard`}
        >
          {KitchenwareData?.map((i, index) => <CatSecProdCard data={i} key={index} open={open} setOpen={setOpen}/>)}
        </div>
       )}
     </div>
      ):null}
      {dArm?(
          <div >
          {furnitureData?.length===0?(
             <div
             className={` catSecProductCard`}
           >
             <img src={image} alt="" className='w-full 1024px:h-[500px] h-full 1024px:object-cover object-contain'/>
           </div>
          ):(
             <div
             className={`grid grid-cols-2 gap-[5px] md:grid-cols-2 md:gap-[10px] 
            lg:grid-cols-4 lg:gap-[10px] xl:grid-cols-6 xl:gap-[5px] catSecProductCard`}
           >
             {furnitureData?.map((i, index) => <CatSecProdCard data={i} key={index} open={open} setOpen={setOpen}/>)}
           </div>
          )}
        </div>
      ):null}
      {VArm?(
         <div >
         {swingsData?.length===0?(
            <div
            className={` catSecProductCard`}
          >
            <img src={image} alt="" className='w-full 1024px:h-[500px] h-full 1024px:object-cover object-contain'/>
          </div>
         ):(
            <div
            className={`grid grid-cols-2 gap-[5px] md:grid-cols-2 md:gap-[10px] 
           lg:grid-cols-4 lg:gap-[10px] xl:grid-cols-6 xl:gap-[5px] catSecProductCard`}
          >
            {swingsData?.map((i, index) => <CatSecProdCard data={i} key={index} open={open} setOpen={setOpen}/>)}
          </div>
         )}
       </div>
      ):null}
      {Other?(
        <div >
        {cncData?.length===0?(
           <div
           className={` catSecProductCard`}
         >
           <img src={image} alt="" className='w-full 1024px:h-[500px] h-full 1024px:object-cover object-contain'/>
         </div>
        ):(
           <div
           className={`grid grid-cols-2 gap-[5px] md:grid-cols-2 md:gap-[10px] 
          lg:grid-cols-4 lg:gap-[10px] xl:grid-cols-6 xl:gap-[5px] catSecProductCard`}
         >
           {cncData?.map((i, index) => <CatSecProdCard data={i} key={index} open={open} setOpen={setOpen}/>)}
         </div>
        )}
      </div>
      ):null}
      </div>
    </div>
  </div>
  )
}

export default CatProdSec
