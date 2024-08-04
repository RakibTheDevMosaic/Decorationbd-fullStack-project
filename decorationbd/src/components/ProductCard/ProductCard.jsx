import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { GiCheckMark } from "react-icons/gi";
import "./ProductCard.scss";
import { FaOpencart } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import QuickView from "../../components/QuickView/QuickView.jsx"
import { useAddItemToCartMutation, useFetchCartItemsQuery } from '../../Redux/CartSlice/cartApi.js';
import useFetch from '../../customHooks/useFetch.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken } from '../../Redux/UserAndAuthServices/LocalStorageService.js';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../../Redux/CartSlice/CartSlice.js';


const ProductCard = ({data,open,setOpen,count,decrementQuantity,incrementQuantity}) => {
  // console.log(data)
  const { data: cartItems, error, isLoading, refetch} = useFetchCartItemsQuery();
  const [addItemToCart] = useAddItemToCartMutation();
  // const [hoverCartIcon,setHoverCartIcon] = useState(false);
  // const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity,setQuantity] = useState(1);
  const decrementNumber = ()=>{
    if(quantity>1){setQuantity(quantity-1)}
  }
  const incrementNumber = ()=>{setQuantity(quantity+1)}
  const d = encodeURIComponent(data.name.replace(/\//g, '~'));
  // const d = data?.name
  // const product_name = d.replace(/\s+/g,"-");

  // const handleAddToCart = (data)=>{
  //   dispatch(addToCart(data))
  // }
  const {access_token} = getToken();
  const handleAddToCart = async () => {
    try {
      if (access_token) {
        const response = await addItemToCart({ products_id: data.id, quantity: quantity });
        if (response.data) {
          // console.log(response.data);
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


  // const quickData = useFetch(`api/QuickView/${data.id}`);
  // console.log(quickData);



  return (
    <div className='w-full 768px:h-[500px] 1280px:h-[430px] 1350px:h-[420px] 300px:h-[480px] h-[440px] bg-black rounded-md card-container
    shadow-sm 768px:p-3 1024px:p-[5px] 1350px:p-[2px] p-[8px] relative cursor-pointer'>
      <div className="flex justify-end">
        </div>
        <div className='imgContainer'>
          <Link to={`/product/${d}`}>
            <img src={ data.product_imgs[0].images} alt="" className='img 768px:w-[94%] w-[98%] 1024px:w-[98%] 1350px:w-[98%]
            mx-auto 768px:mt-[5px] 1024px:mt-[2px]  mt-[2px] 768px:h-[220px] 1280px:h-[200px] 300px:h-[220px] h-[170px] object-cover'/>
          </Link>
            <span className='quickView'
            onClick={() => handleQuickView(data.id)}><IoIosSearch size={16} title='Quick View'
            /></span>
                {open && selectedProduct ? (
                  <QuickView open={open} setOpen={setOpen} data={selectedProduct}/>
                ) : null}
        </div> 
        <Link to={`/product/${d}`}>
          <h4 className='pb-3 font-[500] text-white 768px:pt-2 pt-[5px] 
          768px:ml-[14px] 1024px:ml-[7px] 1350px:ml-[5px] ml-[5px] 768px:text-xl 1024px:text-[18px] 1350px:text-[14px]
           300px:text-[16px] text-[14px]'>
            {data?.name?.length>18 ? data?.name?.slice(0,18) + "..." : data.name}
          </h4>
        </Link>
        <div className='flex items-center 768px:ml-[14px] 1024px:ml-[5px]  justify-center 
        768px:justify-between flex-col 768px:flex-row 1350px:flex-col'>
        <div className="stock text-white flex items-center 768px:gap-[2px] ">
            (<GiCheckMark className='text-[#007bc4] 768px:text-[16px] 1024px:text-[14px] 1280px:text-[12px] 1350px:text-[13px] ml-[3px] 768px:ml-0'/>
            <span className='capitalize italic text-[12px] 300px:text-[14px] 768px:text-[14px] 1024px:text-[13px] 1280px:text-[12px]
            1350px:text-[12px] mr-[2px] 768px:mr-0'>{data.stock}</span>)
          </div>
          <div className="price text-white  768px:mr-[12px] 1024px:mr-[5px] 1500px:mr-[12px] mr-[2px]">
            <span className="lineThroughPrice line-through 
            768px:text-[18px] 1024px:text-[15px] 1350px:text-[13px] 768px:font-semibold 300px:text-[16px] 
            text-[13px] 768px:mr-[6px] mr-[3px]">{data.price}
            <strong className='768px:text-[16px] 1024px:text-[15px] 1350px:text-[13px] 300px:text-[16px] text-[13px] font-[400] font-Roboto'>৳</strong></span>
            <span className='text-[#007bc4] font-bold 768px:text-[18px] 1024px:text-[14px] 1350px:text-[13px] 300px:text-[16px]
            text-[13px]'>{data.discount_price}<strong 
            className='768px:text-[18px] 1024px:text-[14px] 1350px:text-[13px] 300px:text-[16px] text-[13px] font-bold font-Roboto'>৳</strong></span>
          </div>
        </div>

        <div className="quantity mx-auto">
          <span className='minus ' onClick={decrementNumber}>-</span>
          <span>{quantity}</span>
          <span className='plus' onClick={incrementNumber}>+</span>
        </div>
        <div className="btn ">
          <div className="add-to-cart" onClick={handleAddToCart}>add to cart</div>
          {/* <div className="cart-icon"><FaOpencart/></div> */}
        </div>
    </div>
  )
}

export default ProductCard
