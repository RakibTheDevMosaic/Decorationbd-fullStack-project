import React from 'react'
import BannerSlider from "../HomePageLayout/Slider/BannerSlider.jsx";
import EndLine from '../HomePageLayout/Layout/BannerEndLine/EndLine.jsx';
import MonitorArm from '../HomePageLayout/Layout/MonitorArmCategory/MonitorArm.jsx';
import BannerArea from "../HomePageLayout/Layout/BannerArea/BannerAre.jsx"
import HomeDecor from "../HomePageLayout/Layout/Home&Decor/HomeDecor.jsx";
import Banner2 from "../HomePageLayout/Layout/Banner2/Banner2.jsx";
import CategoryProductSection from "../HomePageLayout/Layout/CatProdSection/CatProdSec.jsx";
import ServiceBanner from "../HomePageLayout/Layout/ServiceBanner/ServiceBanner.jsx";


const HomePage = ({open,setOpen,count,decrementQuantity,incrementQuantity,categories}) => {
  return (
    <div>
      <BannerSlider categories={categories}/>
      <EndLine/>
      <MonitorArm open={open} setOpen={setOpen}
      count={count} 
      decrementQuantity={decrementQuantity} incrementQuantity={incrementQuantity}/>
      <BannerArea/>
      <HomeDecor open={open} setOpen={setOpen}/>
      <Banner2/>
      <CategoryProductSection open={open} setOpen={setOpen}/>
      <ServiceBanner/>
    </div>
  )
}

export default HomePage
