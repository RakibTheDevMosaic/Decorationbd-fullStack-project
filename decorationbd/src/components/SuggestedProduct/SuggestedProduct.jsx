import React, { useEffect, useState } from 'react'
import Styles from "../../Styles/Styles"
// import { productData } from '../../Static/Data';
import ShopProduct from "../../components/ShopProduct/ShopProduct"
import useFetch from '../../customHooks/useFetch';
// import axios from 'axios';
const SuggestedProduct = ({data,open,setOpen}) => {
    const allprodctData = useFetch('api/products/')
    // console.log(allprodctData);
    // console.log(data);
  
      
      const [products, setProducts] = useState(null);
    
      
      useEffect(() => {
        if (allprodctData) {
          const filteredData = allprodctData?.filter((i) => i?.Category?.catname === data?.Category?.catname);
          setProducts(filteredData);
        }
      }, [allprodctData, data.Category]);
    
      // rest of the component
  
  return (
    <>
    {
        data ? (
            <div className={`768px:p-4 300px:p-1 p-1 ${Styles.section} bg-[#eaeaea] mb-[50px]`}>
                <h2 className={`${Styles.heading} text-[28px] 1350px:text-[22px] 1350px:pb-[5px] font-[600] text-[orangered]
                border-b border-white mb-5 1350px:mb-3 ml-[10px]`}>
                    Related Products
                </h2>
                <div className="productsPart grid grid-cols-2 gap-[6px]
        md:grid-cols-2 md:gap[15px] lg:grid-cols-4 xl:grid-cols-6 300px:w-[98%] w-[86%] 1350px:w-[96%] mx-auto">
           {products && products.map((i,index)=>(
              <ShopProduct data={i} key={index} open={open} setOpen={setOpen}/>
           ))}
           
        </div>
          </div>
        ) : null
    }
    </>
  )
}

export default SuggestedProduct
