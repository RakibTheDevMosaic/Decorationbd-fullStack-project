import React, { useEffect, useRef, useState } from 'react'
import {RxCross1} from "react-icons/rx";
import styles from "../../Styles/Styles"
import {AiOutlineShoppingCart} from "react-icons/ai"
import { GiBuyCard } from "react-icons/gi";
import "./QuickView.scss";
import { useAddItemToCartMutation, useFetchCartItemsQuery } from '../../Redux/CartSlice/cartApi';
import { toast } from 'react-toastify';
import { getToken } from '../../Redux/UserAndAuthServices/LocalStorageService';


// import {productData} from "../../Static/Data"
const QuickView = ({data,setOpen,open,setSelectedProduct}) => {
    // const [click ,setClick]= useState(false);
    // const [select,setSelect] = useState(false);
    // console.log(data)
    const {access_token} = getToken();
    const [selectedImg,setSelectedImg] = useState(process.env.REACT_APP_IMG_URL + (data?.product_imgs?.[0]?.images || ''));
    const [count, setCount] = useState(1);

    const decrementQuantity = () => {
      if (count > 1) {
        setCount(count - 1);
      }
    };
    const incrementQuantity = () => {
      setCount(count + 1);
    };
    const { data: cartItems, error, isLoading, refetch} = useFetchCartItemsQuery();
    const [addItemToCart] = useAddItemToCartMutation();
    // const Quickref = useRef(null)

    // let handler = (e)=>{
    //   console.log(e.target)
    //     if(Quickref.current.contains(e.target)){
    //       console.log(Quickref.current)
    //       setOpen(false);
    //     }else if(!Quickref.current.contains(e.target)){
    //       setOpen(false);
    //     }
    // }
    // useEffect(()=>{
    //   document.addEventListener("click", handler);
    //   return()=>{
    //     document.removeEventListener("click",handler);
    //   }
    // })
    if (!open) return null;
    
    const handleAddToCart = async () => {
      try {
        if (access_token) {
          const response = await addItemToCart({ products_id: data.id, quantity: count });
          if (response.data) {
            const productName = response.data.data.products?.name;
      
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
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(data?.description || "", 'text/html');
    const plainTextDescription = parsedHtml.body.textContent || "";

  return (
    <div className='bg-[#fff]'>
      {data?(
        <div className="fixed w-full h-screen top-0 left-0 
        bg-[#00000010] z-50 flex items-center
        justify-center">
            <div className="relative w-[90%] 768px:w-[60%] 
            h-[90vh] overflow-y-scroll 768px:h-[75vh] 
            bg-white rounded-md shadow-md p-4">
                <RxCross1 size={25} className="absolute right-3 top-3 z-50" 
                onClick={()=>setOpen(false)}/>

                <div className="block w-full 768px:flex">
                    <div className='w-full 768px:w-[55%] '>
                        <div className='w-full h-[75%] mb-2 overflow-hidden relative'>
                        <img src={selectedImg} className='w-[400px] h-[400px] 
                              object-contain ' alt=""/>
                              {/* <IoIosArrowBack size={25} className='absolute top-[45%] left-[50px]
                              bg-white rounded-full text-center p-1'/>
                              <IoIosArrowForward size={25} className='absolute top-[45%] right-[50px]
                               bg-white rounded-full text-center p-1' onClick={()=>setSelectedImg(selectedImg+1)}/> */}
                            </div>
                        
                        <div className="images">
                            {data?.product_imgs?.map((image,i)=>(
                                <img src={process.env.REACT_APP_IMG_URL+image.images} alt="" key={i} 
                                onClick={()=>setSelectedImg(process.env.REACT_APP_IMG_URL+image.images)} className='img1'/>
                            ))}
                        </div>
                    </div>
                    <div className='w-full 768px:w-[45%] pt-5 pl-[5px] pr-[5px] mt-[60px]'>
                        <h2 className={`${styles.productTitle} capitalize mb-2 1350px:text-[14px]`}>{data?.name}</h2>
                        <p className='font-semibold text-[gray] mt-[5px] 1350px:text-[12px]'>{plainTextDescription?.length>100 ? plainTextDescription?.slice(0,100) + "..." : plainTextDescription}</p>
                        <div className='flex pt-3 mb-2'>
                            <h4 className={`${styles.productDiscountPrice} 1350px:text-[13px]`}>৳ {data?.discount_price}</h4>
                            <h4 className={`line-through font-[600] text-[16px] ml-3 1350px:text-[13px]`}>
                            <strong className='text-[16px] 1350px:text-[13px] font-[600] font-Roboto'>৳</strong> {data?.price? data.price:null}</h4>
                        </div>
                        <div className="flex items-center pt-4">
                            <button className='py-1
                             px-4 1350px:px-3 text-center text-white bg-[#077bc4] text-[19px] 1350px:text-[13px]'
                             onClick={decrementQuantity}>-</button>
                            <span className='py-1 px-5 text-center 1350px:text-[13px]'>{count}</span>
                            <button className='py-1
                             px-4 1350px:px-3 text-center text-white bg-[#077bc4] text-[19px] 1350px:text-[13px]'
                             onClick={incrementQuantity}>+</button>
                        </div>
                        <div className="flex items-center mt-4 gap-[30px]">
                           <div className={`w-[140px] h-[40px] 1350px:h-[35px] my-1 flex justify-center items-center bg-[#077bc4] addCart rounded-md`}
                           onClick={handleAddToCart}>
                            <span className='text-white font-bold flex items-center justify-center 1350px:text-[13px]'>
                                Add to cart <AiOutlineShoppingCart className='ml-2 1350px:text-[13px]'/></span>
                           </div>
                           <div className={`w-[140px] h-[40px] 1350px:h-[35px] my-1 flex justify-center items-center bg-[orangered] buy rounded-md`}>
                            <span className='text-[#fff] font-bold flex items-center justify-center 1350px:text-[13px]'>
                                Buy now <GiBuyCard className='ml-2 1350px:text-[13px]'/></span>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      ):null}
    </div>
  )
}

export default QuickView
