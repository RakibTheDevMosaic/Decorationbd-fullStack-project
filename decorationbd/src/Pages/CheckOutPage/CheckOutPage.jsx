import React, { useEffect, useState } from 'react'
import Styles from "../../Styles/Styles"
import "./CheckOut.scss"
import { RxCross2 } from 'react-icons/rx';
import bkash from "../../Assets/img/bKash.png";
import { FiChevronDown } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { BiSolidDiscount } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import nogod from "../../Assets/img/CheckOut/nogod.png";
import rocket from "../../Assets/img/CheckOut/rocket.png";
import credit from "../../Assets/img/CheckOut/credit.jpg";
import axios from 'axios';
import { getToken } from '../../Redux/UserAndAuthServices/LocalStorageService';
import { useFetchCustomerShippingAddressesQuery } from '../../Redux/AddressSlice/addressApi';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
// import {useFetchCartItemsQuery} from '../../Redux/CartSlice/cartApi.js';

const CheckOutPage = () => {
    const [coupon,setCoupon] = useState(false);
   
    const [partialCod,setPartialCod] = useState(false);
    const [paymentButton,setPaymentButton] = useState(true);
    const [partialPaymentButton,setPartialPaymentButton] = useState(false);

    const {access_token} = getToken();
    const [carts,setCarts] = useState([]);
    const [quantities, setQuantities] = useState({});

    const cartItems = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}api/checkout/`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`
            }
          }
        );
        setCarts(res.data)
        // console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
      cartItems();
    },[])
    const [totalSum,setTotalSum] = useState(0)
    useEffect(() => {
      if (carts && carts.length > 0) {
        const initialQuantities = {};
        carts.forEach(item => { 
          initialQuantities[item.id] = item.quantity; // Initialize quantities from backend
        });
        setQuantities(initialQuantities);
        const totalPrice = carts?.[0]?.total_price;
        setTotalSum(totalPrice)
      }
    }, [carts]);


    

    const [couponCode,setCouponCode] = useState('')
    const DeliveryCharge = 150
    const forcodorderconfirmation = DeliveryCharge 
    const afterconfirmationtotal = (totalSum+DeliveryCharge) - forcodorderconfirmation
    const { data: shipaddresses, error, isLoading, refetch: refetchShippingAddresses } = useFetchCustomerShippingAddressesQuery();

    const updateQuantity = async (itemId, newQuantity) => {
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_API_URL}api/cartitems/${itemId}/update_item/`,
          { quantity: newQuantity },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`
            }
          }
        );
        if (response.status === 200) {
          setQuantities(prevQuantities => ({
            ...prevQuantities,
            [itemId]: newQuantity
          }));
        }
        // cartRefetch();
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    };
  
    const decrementQuantity = (itemId) => {
      const currentQuantity = quantities[itemId] || 1;
      if (currentQuantity > 1) {
        updateQuantity(itemId, currentQuantity - 1);
      }
    };
  
    const incrementQuantity = (itemId) => {
      const currentQuantity = quantities[itemId] || 1;
      updateQuantity(itemId, currentQuantity + 1);
    };

    const handleDeleteItem = async (itemId) => {
      try {
        await axios.delete(
          process.env.REACT_APP_API_URL + `api/cartitems/${itemId}/cartitem_delete/`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}` // Ensure access_token is correctly set
            }
          }
        );
        // cartRefetch();
    
        // Update the state to remove the deleted item
        // setCartItems((prevCartItems) => prevCartItems.filter(item => item.id !== itemId));
    
      } catch (error) {
        console.error('Error deleting cart item:', error);
      }
    };     
     const [fullPayment,setFullPayment] = useState(true);
     const [newAdd, setNewAdd] = useState(false);
     const [otherShippAdd, setOtherShippAdd] = useState(false);
     const [selected, setSelected] = useState(0); // Track the selected address index
     const [shipping, setShipping] = useState({});
     const [newAddtitles,setnewAddtitles] = useState(false)
     useEffect(() => {
      if (shipaddresses && shipaddresses.length > 0) {
        setShipping(shipaddresses[0]);
      }
    }, [shipaddresses]);
    const handleAddressClick = (address, index) => {
      setShipping(address);
      setOtherShippAdd(false);
      setSelected(index);
      setNewAdd(false);
      setnewAddtitles(false);
    };
  
    const handleAddNewClick = () => {
      setNewAdd(!newAdd);
      setShipping({});
      setOtherShippAdd(false);
    };
    const handleCouponInputChange = (e) => {
      setCouponCode(e.target.value);
    };
  
    const handleApplyCoupon = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}api/add-coupon-checkout/`,
          { coupon: couponCode },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`
            }
          }
        );
        // console.log(response.data)
        toast.success('Coupon code added successfully')
        setTotalSum(response.data.total_price)
  
  
      } catch (error) {
        console.error('Error applying coupon:', error);
        toast.error(error?.response?.data?.msg)
      }
    };
    const handlePlaceOrder = async (orderData, accessToken) => {
      try {
          const response = await axios.post(
              `${process.env.REACT_APP_API_URL}api/place-order/`,
              orderData,
              {
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${accessToken}`
                  }
              }
          );
          toast.success('Order placed successfully');
          // handle the response data if needed
          console.log(response.data);
  
      } catch (error) {
          console.error('Error placing order:', error);
          toast.error(error?.response?.data?.error || 'Failed to place order');
      }
    };
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setShipping({ ...shipping, [name]: value });
  };
    const handleSubmit = (FullPayment) => {
      const paymentMethod = FullPayment ? 'Full Payment' : 'Cash on Delivery';
      const orderData = {
          shipping_address_id: shipping.id, // or the shipping address data
          payment_method: paymentMethod,
          totalPrice: FullPayment?totalSum+150 : totalSum,
          pcod: 0,
          orderConfirmation: totalSum,
          afterRemainTotal: afterconfirmationtotal,
          shipping_address: shipping,
      };
      handlePlaceOrder(orderData, access_token);
  };
  const navigate = useNavigate();
  return (
    <div className={`1350px:w-[84%] 1024px:w-[70%] 1280px:w-[95%] w-[98%] mx-auto flex flex-col 1280px:flex-row items-center justify-center gap-[20px]`}>
      <div className="1280px:w-[50%] w-[100%] px-2 py-2 1350px:py-1 1280px:mr-[50px] 1350px:mr-[20px] mr-0">
   
        <div className="w-full 1350px:w-[86%] 768px:p-[15px] p-[5px] mt-[50px] 300px:mt-[80px] 1280px:mt-[5px] 
        1350px:mt-0 rounded-md shadow-md shadow-[black]">   

      <div className={`mt-[5px] overflow-hidden`}>
      <div className="flex items-center justify-between">
        <h1 className='text-[30px] 300px:text-[24px] 1350px:text-[20px]
          text-[#077bc4] font-semibold px-[5px] capitalize'>shipping details</h1>

        <div className="relative">
      <div className="flex items-center gap-[10px] cursor-pointer" onClick={() => { setOtherShippAdd(!otherShippAdd); if (newAdd) setnewAddtitles(!newAddtitles); }}>
        <h5 className='text-[13px] font-[500] text-[#242424]'>
          {/* {newAdd && (<span>Shipping address {shipaddresses.length + 1}</span>)}
          {otherShippAdd && (<span>Shipping address {selected + 1}</span>)} */}
          {newAdd ? `Shipping address ${shipaddresses.length + 1}` : `Shipping address ${selected + 1}`}
        </h5>
        <FiChevronDown className={`text-[13px] ${otherShippAdd || newAddtitles ? "rotate-180" : "rotate-0"}`} />
      </div>
      {otherShippAdd && !newAdd && (
        <div className="absolute px-[5px] py-[3px] bg-[white] z-[9999] cursor-pointer shadow-sm shadow-[gray]">
          {shipaddresses && shipaddresses.map((address, index) => (
            index !== selected && (
              <h5 key={index} className='text-[13px] font-[500] px-[2px] text-[#242424] hover:bg-[#077bc4] hover:text-white'
                onClick={() => handleAddressClick(address, index)}>
                Shipping address {index + 1}
              </h5>
            )
          ))}
          <div className="flex items-center gap-[5px]" onClick={handleAddNewClick}>
            <GoPlus className="text-[13px]" />
            <h5 className="text-[13px] font-[500]">Add address</h5>
          </div>
        </div>
      )}
      {newAddtitles && (
        <div className="absolute px-[5px] py-[3px] bg-[white] z-[9999] cursor-pointer shadow-sm shadow-[gray]">
          {shipaddresses && shipaddresses.map((address, index) => (
            <h5 key={index} className='text-[13px] font-[500] px-[2px] text-[#242424] hover:bg-[#077bc4] hover:text-white'
              onClick={() => handleAddressClick(address, index)}>
              Shipping address {index + 1}
            </h5>
          ))}
        </div>
      )}
    </div>


      </div>
      {
        newAdd ? (
          <>
            {/* Form fields for adding a new address */}
            <div className="768px:w-[90%] w-[100%] mt-[20px] 300px:ml-[20px] 768px:ml-[50px] 1280px:ml-[50px] 1350px:ml-[40px]">
              <label className="block pb-2 1350px:pb-[3px] 1350px:text-[12px]"> Name :</label>
              <input
                type="text"
                name='name'
                placeholder='*** Enter your name'
                className={`px-[10px] py-[8px] 1350px:py-[4px] 1350px:text-[11px]
                rounded-[50px] outline-none border border-[gray] !w-[90%]`}
                value={shipping.name || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='flex items-center 768px:w-[86%] 1024px:w-[88%] 1350px:w-[89%] 1280px:w-[90%] mx-auto'>
              <div className="768px:w-[90%] w-[100%] mt-[10px] 1350px:mt-[5px] 300px:ml-[20px] 768px:ml-0 1024px:ml-[10px] 1280px:ml-[20px] 1350px:ml-[15px]">
                <label className="block pb-2 1350px:pb-[3px] 1350px:text-[12px]"> Email :</label>
                <input
                  type="email"
                  name="email"
                  placeholder='*** Enter your email'
                  className={`px-[10px] py-[8px] 1350px:py-[4px] 1350px:text-[11px]
                  rounded-[50px] outline-none border border-[gray] !w-[90%]`}
                  value={shipping.email || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="768px:w-[90%] w-[100%] mt-[10px] 1350px:mt-[5px] 1280px:ml-[5px] 1350px:ml-0">
                <label className="block pb-2 1350px:pb-[3px] 1350px:text-[12px]"> Phone :</label>
                <input
                  type="text"
                  name="phone"
                  placeholder='*** Enter your number'
                  className={`px-[10px] py-[8px] 1350px:py-[4px] 1350px:text-[11px]
                  rounded-[50px] outline-none border border-[gray] !w-[90%]`}
                  value={shipping.phone || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="768px:w-[90%] w-[100%] mt-[10px] 1350px:mt-[5px] 300px:ml-[20px] 768px:ml-[50px] 1280px:ml-[50px] 1350px:ml-[40px]">
              <label className="block pb-2 1350px:pb-[3px] 1350px:text-[12px]"> Address :</label>
              <textarea
                name='address'
                placeholder='Enter your address'
                rows={3}
                cols={10}
                className='1350px:text-[10px] border border-[gray] w-[90%]'
                value={shipping.address || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className='flex items-center 768px:w-[86%] 1024px:w-[88%] 1350px:w-[89%] 1280px:w-[90%] mx-auto'>
              <div className="768px:w-[90%] w-[100%] mt-[10px] 1350px:mt-[5px] 300px:ml-[20px] 768px:ml-0 1024px:ml-[10px] 1280px:ml-[20px] 1350px:ml-[15px]">
                <label className="block pb-2 1350px:pb-[3px] 1350px:text-[12px]"> Town / City :</label>
                <input
                  type="text"
                  name="city"
                  placeholder='*** Enter your address'
                  className={`px-[10px] py-[8px] 1350px:py-[4px] 1350px:text-[11px]
                  rounded-[50px] outline-none border border-[gray] !w-[90%]`}
                  value={shipping.city || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="768px:w-[90%] w-[100%] mt-[10px] 1350px:mt-[5px] 1280px:ml-[5px] 1350px:ml-0">
                <label className="block pb-2 1350px:pb-[3px] 300px:text-[14px] 1350px:text-[12px]"> Postcode / ZIP (optional) :</label>
                <input
                  type="text"
                  name="zip_code"
                  placeholder='*** Enter your address'
                  className={`px-[10px] py-[8px] 1350px:py-[4px] 1350px:text-[11px]
                  rounded-[50px] outline-none border border-[gray] !w-[90%]`}
                  value={shipping.zip_code || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="768px:w-[90%] w-[100%] 1350px:mt-[5px] mt-[10px] 300px:ml-[20px] 768px:ml-[50px] 1280px:ml-[50px] 1350px:ml-[40px]">
              <label className="block pb-2 1350px:pb-[3px] 1350px:text-[12px]"> Customization :</label>
              <textarea
                placeholder='*** Write your opinion'
                name="customization"
                rows={3}
                cols={10}
                className='1350px:text-[10px] border border-[gray] w-[90%]'
                value={shipping.customization || ''}
                onChange={handleInputChange}
              />
            </div>
          </>
        ) : (
          <>
            {/* Form fields for editing existing address */}
            <div className="768px:w-[90%] w-[100%] mt-[20px] 300px:ml-[20px] 768px:ml-[50px] 1280px:ml-[50px] 1350px:ml-[40px]">
              <label className="block pb-2 1350px:pb-[3px] 1350px:text-[12px]"> Name :</label>
              <input
                type="text"
                name='name'
                placeholder='*** Enter your name'
                className={`px-[10px] py-[8px] 1350px:py-[4px] 1350px:text-[11px]
                rounded-[50px] outline-none border border-[gray] !w-[90%]`}
                value={shipping.name || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='flex items-center 768px:w-[86%] 1024px:w-[88%] 1350px:w-[89%] 1280px:w-[90%] mx-auto'>
              <div className="768px:w-[90%] w-[100%] mt-[10px] 1350px:mt-[5px] 300px:ml-[20px] 768px:ml-0 1024px:ml-[10px] 1280px:ml-[20px] 1350px:ml-[15px]">
                <label className="block pb-2 1350px:pb-[3px] 1350px:text-[12px]"> Email :</label>
                <input
                  type="email"
                  name='email'
                  placeholder='*** Enter your email'
                  className={`px-[10px] py-[8px] 1350px:py-[4px] 1350px:text-[11px]
                  rounded-[50px] outline-none border border-[gray] !w-[90%]`}
                  value={shipping.email || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="768px:w-[90%] w-[100%] mt-[10px] 1350px:mt-[5px] 1280px:ml-[5px] 1350px:ml-0">
                <label className="block pb-2 1350px:pb-[3px] 1350px:text-[12px]"> Phone :</label>
                <input
                  type="text"
                  name='phone'
                  placeholder='*** Enter your number'
                  className={`px-[10px] py-[8px] 1350px:py-[4px] 1350px:text-[11px]
                  rounded-[50px] outline-none border border-[gray] !w-[90%]`}
                  value={shipping.phone || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="768px:w-[90%] w-[100%] mt-[10px] 1350px:mt-[5px] 300px:ml-[20px] 768px:ml-[50px] 1280px:ml-[50px] 1350px:ml-[40px]">
              <label className="block pb-2 1350px:pb-[3px] 1350px:text-[12px]"> Address :</label>
              <textarea
                placeholder='Enter your address'
                name='address'
                rows={3}
                cols={10}
                className='1350px:text-[10px] border border-[gray] w-[90%]'
                value={shipping.address || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className='flex items-center 768px:w-[86%] 1024px:w-[88%] 1350px:w-[89%] 1280px:w-[90%] mx-auto'>
              <div className="768px:w-[90%] w-[100%] mt-[10px] 1350px:mt-[5px] 300px:ml-[20px] 768px:ml-0 1024px:ml-[10px] 1280px:ml-[20px] 1350px:ml-[15px]">
                <label className="block pb-2 1350px:pb-[3px] 1350px:text-[12px]"> Town / City :</label>
                <input
                  type="text"
                  name='city'
                  placeholder='*** Enter your address'
                  className={`px-[10px] py-[8px] 1350px:py-[4px] 1350px:text-[11px]
                  rounded-[50px] outline-none border border-[gray] !w-[90%]`}
                  value={shipping.city || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="768px:w-[90%] w-[100%] mt-[10px] 1350px:mt-[5px] 1280px:ml-[5px] 1350px:ml-0">
                <label className="block pb-2 1350px:pb-[3px] 300px:text-[14px] 1350px:text-[12px]"> Postcode / ZIP (optional) :</label>
                <input
                  type="text"
                  name='zip_code'
                  placeholder='*** Enter your address'
                  className={`px-[10px] py-[8px] 1350px:py-[4px] 1350px:text-[11px]
                  rounded-[50px] outline-none border border-[gray] !w-[90%]`}
                  value={shipping.zip_code || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="768px:w-[90%] w-[100%] 1350px:mt-[5px] mt-[10px] 300px:ml-[20px] 768px:ml-[50px] 1280px:ml-[50px] 1350px:ml-[40px]">
              <label className="block pb-2 1350px:pb-[3px] 1350px:text-[12px]"> Customization :</label>
              <textarea
                placeholder='*** Write your opinion'
                name='customization'
                rows={3}
                cols={10}
                className='1350px:text-[10px] border border-[gray] w-[90%]'
                value={shipping.customization || ''}
                onChange={handleInputChange}
              />
            </div>
          </>
        )
      }
    </div>
        </div>
      </div>

      <div className="1280px:w-[45%] 1350px:w-[35%] 768px:w-[85%] w-[100%] h-auto 768px:p-3  px-[5px] pb-[20px] rounded-md 
      shadow shadow-[#077bc4] bg-[#f7f7f7] mt-[20px] 1280px:mt-[5px] 1350px:mt-[2px] mb-[20px] 768px:mb-0">
        <h5 className='1350px:text-[13px] font-[400]'>Discount and Payment</h5>

            <div className="px-[10px] py-[5px] border-b-[1px] border-[rgba(0,0,0,0.2)]">
              <div className="flex items-center justify-between cursor-pointer" onClick={()=>setCoupon(!coupon)}>
                <div className="flex items-center gap-[10px]">
                 <BiSolidDiscount className="1350px:text-[14px] "/>
                 <p className='1350px:text-[13px] font-[400px]'>Coupon code</p>
                </div>
                <div className="flex items-center gap-[10px] ">
                  <p className="1350px:text-[13px] text-[#b3b3b3]">Enter Coupon code</p>
                   <IoIosArrowForward className="1350px:text-[13px]"/> 
                </div>
              </div>
              <div className={`${coupon?"openCoupon":"closeCoupon"} relative`}>
                <input type="text" className='w-full px-[10px] py-[3px] 
                1350px:text-[13px] outline-none border border-[rgba(0,0,0,0.2)]'
                value={couponCode} onChange={handleCouponInputChange}/>
                <p className='1350px:text-[13px] absolute right-7 top-1 text-[#4882d9] cursor-pointer' onClick={handleApplyCoupon}>| Confirm</p>
              </div>
            </div>

            <div className="w-full px-2 py-3 1280px:py-2 ">
              <h4 className='font-[600] 1350px:text-[13px] text-[#f85606]'>Order Summary</h4>
            </div>
        <div className="w-full px-2 py-2 bg-white shadow shadow-[gray] mt-[10px] 1350px:mt-0">
            <div className="flex items-center justify-between pb-2 border-b border-[rgba(0,0,0,0.2)]">
                <h3 className='text-[18px] 1280px:text-[14px] 1350px:text-[11px] text-[#242424] font-[500] 768px:pl-3 pl-1 uppercase'>product</h3>
                <h3 className='text-[18px] 1280px:text-[14px] 1350px:text-[11px] text-[#242424] font-[500] 768px:pr-3 pr-0 uppercase'>subtotal</h3>
            </div>
            <div className='h-[100px] overflow-y-scroll scroll-smooth no-scrollbar'>
            {carts?.map((item)=>(
                 <div className="flex items-center justify-between py-3 1280px:py-1 border-b border-[rgba(0,0,0,0.2)] " key={item.id}>
                 <div className="flex items-center">
                 <RxCross2  className='text-[#f51919] 768px:text-[18px] 1280px:text-[15px] 
                 1350px:text-[13px] text-[18px] ' onClick={() => handleDeleteItem(item.id)}/>
                 <img src={process.env.REACT_APP_IMG_URL+item?.products?.product_imgs[0]?.images} alt="" className='768px:w-[70px] 1280px:w-[50px] 1280px:h-[50px] 1350px:w-[40px] w-[55px] 768px:h-[70px]
                 1350px:h-[40px] h-[55px] object-cover cursor-pointer 768px:mx-[5px] mx-[5px]'/>
                 <div className="flex flex-col justify-center">
                 <h5 className=' font-[500] pr-[14px] 768px:pr-0 768px:text-[18px] 1280px:text-[14px] 1350px:text-[11px] text-[14px] text-[#242424]'>{item?.products?.name.length>15?item?.products?.name.slice(0,15)+"...":item?.products?.name}</h5>
                 <div className="px-1 flex items-center gap-[10px] mt-[5px]">
                  <button className='w-[23px] h-[23px] 1280px:w-[18px] 1280px:h-[18px] bg-[#077bc4] text-white 1350px:text-[11px] outline-none border-none'
                  onClick={()=>{decrementQuantity(item.id)}}>-</button>
                  <span className='1350px:text-[11px]'>{quantities[item.id]}</span>
                  <button className='w-[23px] h-[23px] 1280px:w-[18px] 1280px:h-[18px] bg-[#077bc4] text-white 1350px:text-[11px] outline-none border-none'
                  onClick={()=>{incrementQuantity(item.id)}}>+</button>
                 </div>
                 </div>
                 </div>
                 <span className='768px:text-[18px] 1280px:text-[14px] 1350px:text-[10px] text-[16px] font-[600] 768px:pr-3 pr-1
                  text-[#077bc4]'>{Number(item?.sub_total).toFixed(2)}<strong>৳</strong></span>
              </div>
            ))}
            </div>
            

            <div className="mt-[10px] 1280px:mt-0 py-3 1280px:py-2 flex items-center justify-between border-b border-[rgba(0,0,0,0.2)]">
              <h5 className='text-[#242424] 768px:text-[18px] 1280px:text-[14px] text-[16px] 1350px:text-[11px] font-[500] capitalize 768px:pl-4 pl-1'>subtotal :</h5>
              <span className='768px:text-[18px] text-[16px] 1280px:text-[14px] 1350px:text-[10px] font-[600] 768px:pr-3 pr-1
                text-[#077bc4]'>{Number(totalSum).toFixed(2)}<strong>৳</strong></span>
            </div>
            <div className="mt-[10px] py-3 1280px:py-2 1280px:mt-0 flex items-center justify-between border-b border-[rgba(0,0,0,0.2)]">
              <h5 className='text-[#242424] 768px:text-[18px] 1280px:text-[14px] text-[16px] 1350px:text-[11px] font-[500] capitalize 768px:pl-4 pl-1'>
                 delivery charges :</h5>
              <span className='768px:text-[18px] text-[16px] 1280px:text-[14px] 1350px:text-[10px] font-[600] 768px:pr-3 pr-1
                text-[#077bc4]'>{Number(DeliveryCharge).toFixed(2)}<strong>৳</strong></span>
            </div>
             <div className="mt-[10px] py-3 1280px:py-2 1280px:mt-0 flex items-center justify-between border-b border-[rgba(0,0,0,0.2)]">
              <h5 className='text-[#242424] 768px:text-[18px] 1280px:text-[14px] text-[17px] 1350px:text-[11px] font-[600] capitalize 768px:pl-4 pl-1'>total order amount :</h5>
              <span className='text-[18px] 1280px:text-[14px] 1350px:text-[10px] font-semibold 768px:pr-3 pr-1
                text-[#077bc4]'>{Number(totalSum+DeliveryCharge).toFixed(2)}<strong>৳</strong></span>
            </div>
           
                  <div className={`${partialCod?"openPcod":"closePcod"} overflow-hidden`}>
                    <div className="mt-[10px] py-3 1280px:py-2 1350px:mt-0 flex items-center justify-between border-b border-[rgba(0,0,0,0.2)]">
              <h5 className='text-[#242424] 768px:text-[18px] text-[16px] 1280px:text-[14px] 1350px:text-[11px] font-[500] capitalize 768px:pl-4 pl-1'>Remaining Amount to Pay in COD :</h5>
              <span className='768px:text-[18px] 1280px:text-[14px] text-[16px] 1350px:text-[10px] font-[600] 768px:pr-3 pr-1
                text-[#077bc4]'>{Number(afterconfirmationtotal).toFixed(2)}<strong>৳</strong></span>
            </div>
                  <div className="mt-[10px] py-3 1280px:py-2 1350px:mt-0 flex items-center justify-between border-b border-[rgba(0,0,0,0.2)]">
              <h5 className='text-[#242424] 768px:text-[25px] 1280px:text-[15px] text-[17px] 1350px:text-[12px] font-[500] capitalize 768px:pl-4 pl-1'>for order confirmation :</h5>
              <span className='768px:text-[22px] text-[19px] 1280px:text-[15px] 1350px:text-[12px] font-[600] 768px:pr-3 pr-1
                text-[#f51919]'>{Number(forcodorderconfirmation).toFixed(2)}<strong>৳</strong></span>
            </div></div>
            
              
            {/* <div className="mt-[10px] pt-3 1280px:pt-2 1280px:mt-0 flex items-center justify-between">
              <h5 className='text-[#242424] 768px:text-[18px] 1280px:text-[14px] 1350px:text-[11px] text-[17px] font-[500] capitalize 768px:pl-4 pl-1'>
                Estimated Delivery Date:  </h5>
              <span className='768px:text-[18px] text-[16px] 1280px:text-[14px] 1350px:text-[11px] font-[500] 768px:pr-3 pr-0
                text-[#f85606]'>December 23, 2023</span>
            </div> */}
        </div>
            { fullPayment && 
          <div className={`${fullPayment?"openFullPayment":"closeFullPayment"}`}>
          <div className="300px:mt-[20px] 768px:mt-[50px] flex items-center 300px:gap-[10px] gap-[5px] 1280px:mt-0 py-4 1280px:py-1 px-4 1350px:px-3">
  
          <div className="flex items-center ">
          <input type="radio" className='w-[18px] h-[18px] 1350px:w-[10px] 1350px:h-[10px] cursor-pointer pt-[5px] mt-[20px] 1350px:mt-0
           outline-none border border-[rgba(0,0,0,0.2)] 300px:mr-[5px] 768px:mr-0' checked={paymentButton}
           onClick={()=>{setPaymentButton(!paymentButton);setPartialPaymentButton(false);setPartialCod(false)}}/>
          <img src={bkash} alt="" className='object-contain w-[40px]  1350px:w-[70px] 1350px:h-[20px] mt-[20px] 1350px:mt-0'/>
          </div>
          <div className="flex items-center ">
          <input type="radio" className='w-[18px] h-[18px] 1350px:w-[10px] 1350px:h-[10px] cursor-pointer pt-[5px] mt-[20px] 1350px:mt-0
           outline-none border border-[rgba(0,0,0,0.2)] 300px:mr-[5px] 768px:mr-0' 
           onClick={()=>{}} disabled/>
          <img src={nogod} alt="" className='object-contain w-[40px]  1350px:w-[60px] 1350px:h-[15px] mt-[20px] 1350px:mt-0'/> 
          </div>
          <div className="flex items-center ">
          <input type="radio" className='w-[18px] h-[18px] 1350px:w-[10px] 1350px:h-[10px] cursor-pointer pt-[5px] mt-[20px] 1350px:mt-0
           outline-none border border-[rgba(0,0,0,0.2)] 300px:mr-[5px] 768px:mr-0' 
           onClick={()=>{}} disabled/>
          <img src={rocket} alt="" className='object-contain w-[40px]  1350px:w-[50px] 1350px:h-[15px] mt-[20px] 1350px:mt-0'/> 
          </div>
          <div className="flex items-center">
          <input type="radio" className='w-[18px] h-[18px] 1350px:w-[10px] 1350px:h-[10px] cursor-pointer pt-[5px] mt-[20px] 1350px:mt-0
           outline-none border border-[rgba(0,0,0,0.2)] 300px:mr-[5px] 768px:mr-0' 
           onClick={()=>{}} disabled/>
          <img src={credit} alt="" className='object-contain w-[40px] 1350px:w-[40px] 1350px:h-[25px] mt-[20px] 1350px:mt-0'/> 
          </div>
        </div>
          <div className={`${paymentButton?"openButton":"closeButton"} px-3 1350px:px-2 py-2 1280px:py-1 border-t border-[rgba(0,0,0,0.2)] 
          flex flex-col items-center overflow-hidden`}>
            <p className='font-[400] text-[14px] 1280px:text-[12px] 1350px:text-[9px] text-[#242424] ml-[20px] mt-[10px] 1350px:mt-[5px]'>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
            <button type='submit' className='w-[75%] h-[40px] 1350px:h-[30px] 1280px:w-[50%] bg-[#f85606] my-[20px] 1280px:my-[5px]
             text-white font-[400] rounded-[50px] uppercase text-[14px] 1280px:text-[14px] 1350px:text-[9px] text-center'
             onClick={()=>{handleSubmit(fullPayment) && navigate('/')}}>pay now (<span className=' font-semibold 1350px:text-[9px]'>
              {Number(totalSum+DeliveryCharge).toFixed(2)}<strong>৳</strong></span>)</button>
          </div></div>  
            }
        <div className=" py-2 1280px:py-0 768px:px-4 1350px:px-3 px-2">

           <div className="mt-[15px] 1350px:mt-0 768px:px-[2] px-0 py-1 1350px:py-[2px] flex items-center">
           <input type="checkbox" className='w-[18px]  h-[18px] 1350px:h-[12px] 1350px:w-[12px] cursor-pointer 300px:mb-5 768px:mb-0 pt-0 768px:pt-[5px] mr-[10px] 
           outline-none border border-[rgba(0,0,0,0.2)]' checked={partialPaymentButton}
           onClick={()=>{setPartialCod(!partialCod);setPartialPaymentButton(!partialPaymentButton);setPaymentButton(false);
            setFullPayment(fullPayment ? false : true); setPaymentButton(true)}}/>
           <label className='768px:text-[20px] 1280px:text-[14px] 1350px:text-[11px] text-[14px] text-[#242424] font-[500]'> CASH ON DELIVERY / PARTIAL COD {"  "}
           <span className='768px:text-[18px] 1280px:text-[12px] 1350px:text-[10px] text-[14px] font-[500] text-[#f85606]'>(*** for prevent fake order)</span></label>
           </div>
        </div>

        <div className={`${partialPaymentButton?"openButton2":"closeButton2"} px-3 1350px:px-2 py-1 1350px:py-1 
          flex flex-col items-center `}>
                      <div className="mt-[5px] flex items-center 300px:gap-[10px] 768px:gap-[5px] 1280px:mt-0 py-4 1280px:py-1 px-4 1350px:px-3 border-b border-[rgba(0,0,0,0.2)] ">
  
                <div className="flex items-center ">
                <input type="radio" className='w-[18px] h-[18px] 1350px:w-[10px] 1350px:h-[10px] cursor-pointer pt-[5px] mt-[20px] 1350px:mt-0
                outline-none border border-[rgba(0,0,0,0.2)] 300px:mr-[5px] 768px:mr-0' checked={partialPaymentButton}
                onClick={()=>{setPaymentButton(!partialPaymentButton);setPartialPaymentButton(false);setPartialCod(false)}}/>
                <img src={bkash} alt="" className='object-contain w-[40px]  1350px:w-[70px] 1350px:h-[20px] mt-[20px] 1350px:mt-0'/>
                </div>
                <div className="flex items-center ">
                <input type="radio" className='w-[18px] h-[18px] 1350px:w-[10px] 1350px:h-[10px] cursor-pointer pt-[5px] mt-[20px] 1350px:mt-0
                outline-none border border-[rgba(0,0,0,0.2)] 300px:mr-[5px] 768px:mr-0' 
                onClick={()=>{}} disabled/>
                <img src={nogod} alt="" className='object-contain w-[40px]  1350px:w-[60px] 1350px:h-[15px] mt-[20px] 1350px:mt-0'/> 
                </div>
                <div className="flex items-center ">
                <input type="radio" className='w-[18px] h-[18px] 1350px:w-[10px] 1350px:h-[10px] cursor-pointer pt-[5px] mt-[20px] 1350px:mt-0
                outline-none border border-[rgba(0,0,0,0.2)] 300px:mr-[5px] 768px:mr-0' 
                onClick={()=>{}} disabled/>
                <img src={rocket} alt="" className='object-contain w-[30px]  1350px:w-[50px] 1350px:h-[15px] mt-[20px] 1350px:mt-0'/> 
                </div>
                <div className="flex items-center">
                <input type="radio" className='w-[18px] h-[18px] 1350px:w-[10px] 1350px:h-[10px] cursor-pointer pt-[5px] mt-[20px] 1350px:mt-0
                outline-none border border-[rgba(0,0,0,0.2)] 300px:mr-[5px] 768px:mr-0' 
                onClick={()=>{}} disabled/>
                <img src={credit} alt="" className='object-contain w-[40px]  1350px:w-[40px] 1350px:h-[25px] mt-[20px] 1350px:mt-0'/> 
                </div>
              </div>
            <p className='font-[400] text-[14px] 1280px:text-[12px] 1350px:text-[9px] text-[#242424] ml-[20px] mt-[10px] 1350px:mt-[5px]'>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
            <button type='submit' className='w-[75%] h-[40px] py-2 1350px:h-[30px] 1280px:w-[50%] bg-[#f85606] my-[20px] 1280px:my-[5px]
             text-white font-[400] rounded-[50px] uppercase text-[14px] 1280px:text-[14px] 1350px:text-[9px] text-center'
             onClick={()=>{handleSubmit(fullPayment) && navigate('/')}}>pay now (<span className=' font-semibold 1350px:text-[9px]'>
              {Number(forcodorderconfirmation).toFixed(2)}<strong>৳</strong></span>)</button>
          </div> 

      </div>
      </div>
  )
}

export default CheckOutPage

// Everything is fine in the above code, but if the shipping address is clicked on add address, fill up the form and place the order, then the user's previous address is updated but the new address is not created. How to solve this problem?