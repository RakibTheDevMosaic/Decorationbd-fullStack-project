import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import {BsCartPlus} from "react-icons/bs"
import { AiOutlineHeart } from 'react-icons/ai'
import "./WishListPopup.scss"

const WishListPopup = ({setOpenWishlist}) => {
    const cartData = [
        {
            name:"Iphone 14 pro max 256 gb ssd and 8 gb ram silver color",
            description:"test",
            price:999
        },
        {
            name:"Iphone 14 pro max 256 gb ssd and 8 gb ram silver color",
            description:"test",
            price:999
        },
        {
            name:"Iphone 14 pro max 256 gb ssd and 8 gb ram silver color",
            description:"test",
            price:999
        },
    ]
  return (
    <div className='fixed top-0 left-0 w-full h-screen bg-[#0000004b] z-10'>
      <div className="fixed top-0 right-0 min-h-full
       bg-white flex flex-col justify-between w-[25%]
        shadow-md rounded-sm wishList">
        <div>
            <div className="flex w-full justify-end pt-5 pr-5">
                <RxCross1 size={25} className='cursor-pointer '
                onClick={()=>setOpenWishlist(false)}/>
            </div>
            {/* items length */}
            <div className="p-4 flex items-center">
                <AiOutlineHeart size={25}/>
                <h5 className='pl-2 text-[20px] font-semibold text-[#242424]'>3 items</h5>
            </div>
            {/* cart single items */}
            <br />
            <div className="w-full border-t">
                {
                    cartData && cartData.map((i,index)=>(
                        <CartSingle key={index} data={i}/>
                    ))
                }
            </div>
        </div>
       </div>
    </div>
  )
}

const CartSingle = ({data}) => {
    const [value,setValue] = useState(1);
    const totalPrice = data.price * value
    return(
        <div className="border-b p-4">
            <div className="w-full flex items-center">
                <RxCross1 className='cursor-pointer'/>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzHalBuq-DcgDHDXE4IL1esh5NoAuLX4wNRfWdwePbGA&s" alt="" 
                className='w-[80px] h-[80px] ml-2'/>
                <div className='pl-[8px]'>
                    <h1 className='text-[#242424] font-semibold'>{data.name}</h1>
                    <h4 className='font-bold text-[17px] 
                    pt-[3px] text-[#d02222]'>Tk. {totalPrice} <strong className='text-[16px]'>৳</strong></h4>    
                </div>
                <BsCartPlus size={30} title='Add to cart' className='cursor-pointer'/>
            </div>
        </div>
    )
}

export default WishListPopup

