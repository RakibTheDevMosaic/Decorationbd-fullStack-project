import React, { useEffect, useState } from 'react';
import { FaOpencart } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { Link } from 'react-router-dom'
import { GiCheckMark } from "react-icons/gi";
import "./CartSecProCard.scss";
import QuickView from '../QuickView/QuickView';
import { useAddItemToCartMutation, useFetchCartItemsQuery } from '../../Redux/CartSlice/cartApi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken } from '../../Redux/UserAndAuthServices/LocalStorageService';

const CatProdCard = ({data,open,setOpen}) => {
  const { data: cartItems, error, isLoading, refetch} = useFetchCartItemsQuery();
  const [addItemToCart] = useAddItemToCartMutation();
  const d = encodeURIComponent(data.name.replace(/\//g, '~'));
  const [selectedProduct,setSelectedProduct] = useState(null)
  const {access_token} = getToken()
  const handleAddToCart = async () => {
    try {
      if (access_token) {
        const response = await addItemToCart({ products_id: data.id, quantity: 1 });
        if (response.data) {
          const productName = response.data.data.products?.name;
          console.log('Product name:', productName);
      
          if (productName) {
            toast.success(`${productName.length>15?productName.slice(0,15)+' ':productName} added to cart successfully`);
          } else {
            console.error('Product name not found');
          }
          refetch()
        } else {
          console.error('Failed to add item to cart');
        }
      }
      else{
        toast.error('Login first... Please!!!')
      }

    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  const handleQuickView = async (productId) => {
    if (!productId) {
        console.error("Product ID is undefined");
        return;
    }
    console.log(productId)
    try {
        const result = await axios.get(`${process.env.REACT_APP_API_URL}api/QuickView/${productId}`);
        console.log(result);
        setSelectedProduct(result.data);
        setOpen(true);
    } catch (error) {
        console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    if (!open) {
        setSelectedProduct(null); // Reset selected product when modal is closed
    }
  }, [open]);
    // const product_name = d.replace(/\s+/g,"-");
  return (
    <div className='w-full 300px:h-[450px] h-[430px] 1024px:h-[430px] 1350px:h-[390px] bg-white rounded-md card-container3
    shadow-sm  768px:p-3 1024px:p-2 1280px:p-[2px]  p-[5px] relative cursor-pointer'>
      <div className="flex justify-end">
        </div>
        
            <div className='imgContainer3 bg-black overflow-hidden'>
            <Link to={`/product/${d}`}>
            <img src={data.product_imgs[0].images} alt="" className='768px:w-[94%] 1024px:w-[96%] 1280px:w-[98%] 1500px:w-[94%] w-[98%] img
            mx-auto 768px:mt-[5px] 1024px:mt-[3px] 1280px:mt-[2px] 1500px:mt-[5px] mt-[2px] 768px:mb-[5px] 1024px:mb-[3px] 1280px:mb-[2px] 1500px:mb-[5px] mb-[2px] 
            h-[200px] 300px:h-[235px] 768px:h-[245px] 1350px:h-[200px] object-cover'/>
             </Link>
             <span className='quickView3'><IoIosSearch size={16} title='Quick View'
            onClick={()=>{handleQuickView(data.id)}}/></span>
            {open && selectedProduct ? (
                  <QuickView open={open} setOpen={setOpen} data={selectedProduct}/>
                ) : null}
            </div>
       
    
        <Link to={`/product/${d}`}>
          <h4 className='pb-3 font-[500] text-[#077bc4] 768px:pt-2 pt-[6px] 
          768px:ml-[10px] 1280px:ml-[5px] 1500px:ml-[10px] ml-[5px] 
          1350px:text-[14px] 1024px:text-[18px] 1280px:text-[16px] 768px:text-[19px] 300px:text-[16px] text-[14px]'>
            {data.name.length>18 ? data.name.slice(0,18) + "..." : data.name}
          </h4>
        </Link>
        <div className='flex flex-col items-center 
        768px:ml-[8px] 1280px:ml-0 1500px:ml-[8px] ml-[5px] gap-1 mr-2 1280px:mr-0 1500px:mr-2 stockAndPrice 
         overflow-hidden w-full'>
        <div className="stock3 flex items-center
         justify-between gap-[1px] mr-[18px] 768px:mr-0">
            (<GiCheckMark className='text-[#007bc4] 300px:text-[16px] text-[14px] 1280px:text-[12px] 1350px:text-[13px]'/>
            <span className='capitalize font-semibold italic 1350px:text-[13px] 768px:text-[16px]
             1024px:text-[14px] 1280px:text-[11px]'>{data.stock}</span>)
          </div>
          <div className="price3 text-black  mr-[5px] 1280px:mr-[1px] 1500px:mr-[5px] mb-[10px] 768px:mb-0">
          <span className="lineThroughPrice line-through font-[500]
            300px:text-[15px] 768px:text-[16px] 1350px:text-[13px] 1024px:text-[14px] 1280px:text-[13px] text-[13px] mr-[2px]">{data.price}
            <strong className='300px:text-[15px] 768px:text-[16px] 1350px:text-[13px] 1024px:text-[14px] 1280px:text-[14px] text-[13px] font-[600]'>৳</strong></span>
            <span className='text-[#007bc4] font-bold 300px:text-[15px] 768px:text-[16px] 1350px:text-[13px]
            1024px:text-[14px] 1280px:text-[13px] text-[13px]'>{data.discount_price}<strong 
            className='300px:text-[15px] 768px:text-[16px] 1350px:text-[13px] 1024px:text-[14px] 1280px:text-[13px] text-[13px] font-bold font-Roboto'>৳</strong></span>
          </div>
        </div>

        <div className="btn3">
          <div className="add-to-cart3 font-semibold" onClick={handleAddToCart}>add to cart</div>
          {/* <div className="cart-icon3"><FaOpencart/></div> */}
        </div>
    </div>
  )
}

export default CatProdCard
