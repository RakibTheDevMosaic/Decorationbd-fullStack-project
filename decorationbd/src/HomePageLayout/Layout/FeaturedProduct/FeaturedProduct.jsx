import React from 'react'
import "./FeaturedProduct.scss";
import { Link } from 'react-router-dom';

const FeaturedProduct = ({data}) => {
  console.log(data)
  const d = data.name;
  // const product_name = d.replace(/\s+/g,"-");
  const product_name = encodeURIComponent(d.replace(/\//g, '~'));
  return (
    <div className='productSection shadow-2xl shadow-black rounded-sm'>
     <div className='prodContainer'>
     <Link to={`/product/${product_name}`}><img src={data?.product_imgs?.[0]?.images} alt="" /></Link>
       <div className="textAndPrice">
       <Link to={`/product/${product_name}`}>
       <h4>
      {data?.name?.length>40 ? data?.name?.slice(0,40) + "..." : data?.name}
      </h4>
       </Link>
      <div className="price text-[gray]  1500px:mr-[12px] mr-0">
            <span className="lineThroughPrice line-through
            text-md 1350px:text-[13px] mr-[6px]">{Number(data?.price).toFixed(2)}
            <strong className='text-[16px] 1350px:text-[13px] font-[400] font-Roboto'>৳</strong></span>
            <span className='text-[#007bc4] font-bold text-md 1350px:text-[13px]'>{Number(data?.discount_price).toFixed(2)}<strong 
            className='text-[18px] 1350px:text-[13px] font-bold font-Roboto'>৳</strong></span>
          </div>
       </div>
     </div>
    </div>
  )
}

export default FeaturedProduct
