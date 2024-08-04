import React from 'react'
import { RxPerson } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import { FaCloudDownloadAlt } from "react-icons/fa";
import { BsListCheck } from "react-icons/bs";
import { FaMapLocationDot } from "react-icons/fa6";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";


const ProfileSidebar = ({active,setActive,handleLogout,setIsForm,setBillingAddressForm,setShippingForm}) => {
    const navigate = useNavigate()
  return (
    <div className='w-full  bg-white shadow-sm rounded-[10px] 768px:p-4 300px:p-3 1280px:pt-8 '>
        <div className="flex items-center cursor-pointer w-full mb-8 1350px:mb-6"
        onClick={()=>{setActive(1);setIsForm(false);setBillingAddressForm(false);setShippingForm(false)}}>
            <RxPerson  color={active===1?"red":""} className='text-[22px] 1350px:text-[21px]'/>
            <span className={`pl-3 ${active===1?"text-[red]":""} 1350px:text-[14px] hidden 1280px:inline`}>Profile</span>
        </div>
        <div className="flex items-center cursor-pointer w-full mb-8"
        onClick={()=>{setActive(2);setIsForm(false);setBillingAddressForm(false);setShippingForm(false)}}>
            <BsListCheck  color={active===2?"red":""} className='text-[22px] 1350px:text-[21px]'/>
            <span className={`pl-3 ${active===2?"text-[red]":""} 1350px:text-[14px] hidden 1280px:inline`}>Orders</span>
        </div>
        <div className="flex items-center cursor-pointer w-full mb-8"
        onClick={()=>{setActive(3);setIsForm(false);setBillingAddressForm(false);setShippingForm(false)}}>
            <FaCloudDownloadAlt size={22} color={active===3?"red":""} className='text-[22px] 1350px:text-[21px]'/>
            <span className={`pl-3 ${active===3?"text-[red]":""} 1350px:text-[14px] hidden 1280px:inline`}>Downloads</span>
        </div>
        <div className="flex items-center cursor-pointer w-full mb-8"
        onClick={()=>{setActive(4);setIsForm(false);setBillingAddressForm(false);setShippingForm(false)}}>
            <FaMapLocationDot size={22} color={active===4?"red":""} className='text-[22px] 1350px:text-[21px]'/>
            <span className={`pl-3 ${active===4?"text-[red]":""} 1350px:text-[14px] hidden 1280px:inline`}>Address</span>
        </div>
        <div className="flex items-center cursor-pointer w-full mb-8"
        onClick={()=>{setActive(5);setIsForm(false);setBillingAddressForm(false);setShippingForm(false)}}>
            <RiAccountPinCircleFill size={22} color={active===5?"red":""} className='text-[22px] 1350px:text-[21px]'/>
            <span className={`pl-3 ${active===5?"text-[red]":""} 1350px:text-[14px] hidden 1280px:inline`}>Account Details</span>
        </div>
        <div className="flex items-center cursor-pointer w-full 1280px:mb-8 mb-2"
        onClick={()=>{
            setActive(6);
            handleLogout();
        }}>
            <IoMdLogOut size={22} color={active===6?"red":""} className='text-[22px] 1350px:text-[21px]'/>
            <span className={`pl-3 ${active===6?"text-[red]":""} 1350px:text-[14px] hidden 1280px:inline`}>Logout</span>
        </div>
    </div>
  )
}

export default ProfileSidebar
