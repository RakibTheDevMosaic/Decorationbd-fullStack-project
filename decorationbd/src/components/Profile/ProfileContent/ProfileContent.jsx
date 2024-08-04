import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import Styles from "../../../Styles/Styles";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineArrowRight, AiOutlineDelete } from "react-icons/ai";
import o1 from "../../../Assets/img/NoOrder/nnd.png";
import o2 from "../../../Assets/img/NoOrder/noOrder2.png";
import a1 from "../../../Assets/img/NoAddress/a1.png";
import a2 from "../../../Assets/img/NoAddress/a2.png";
// import a3 from "../../../Assets/img/NoAddress/a3.webp";
import { RiErrorWarningLine } from "react-icons/ri";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { MdEditLocationAlt } from "react-icons/md";
import { RiMapPinAddFill } from "react-icons/ri";
import { RiAccountBoxLine } from "react-icons/ri";
import { MdOutlineKey } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai";
// import { IoCameraSharp } from "react-icons/io5";
import pI from "../../../Assets/img/ProfileImg/developer.png"
import { useChangeUserPasswordMutation, useUpdateUserProfileMutation } from "../../../Redux/UserAndAuthServices/userAuthApi";
import { getToken } from "../../../Redux/UserAndAuthServices/LocalStorageService";
import {toast} from "react-toastify";
import { useAddCustomerBillingAddressMutation, useAddCustomerShippingAddressMutation, useFetchCustomerBillingAddressesQuery, useFetchCustomerShippingAddressesQuery, useDeleteCustomerShippingAddressMutation, useDeleteCustomerBillingAddressMutation, useUpdateCustomerShippingAddressMutation, useUpdateCustomerBillingAddressMutation } from "../../../Redux/AddressSlice/addressApi";

const ProfileContent = ({ active ,data, profilerefetch,isForm,setIsForm,billingAddressForm,setBillingAddressForm,shippingForm, setShippingForm}) => {
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const {access_token} = getToken()
  const [updateProfile, setUpdateProfile] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    profile_picture: null,
  });
  
  useEffect(() => {
    if (data) {
      setUpdateProfile({
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        email: data.email,
        profile_picture: null,
      });
    }
  }, [data]);
  console.log(updateProfile)
  
  const handleChangeProfile = (e) => {
    const { name, value, type, files } = e.target;
    setUpdateProfile((prevProfile) => ({
      ...prevProfile,
      [name]: type === 'file' ? files[0] : value,
    }));
  };
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(updateProfile).forEach((key) => {
      if (updateProfile[key]) {
        formData.append(key, updateProfile[key]);
      }
    });

    try {
      await updateUserProfile({ data: formData, access_token: access_token });
      toast.success('Profile updated successfully');
      profilerefetch()
      console.log(data)
    } catch (err) {
      console.error('Failed to update profile', err);
    }
  };
  const handleFocus = (field) => {
    toast.error(`${field} is not changeable.`);
  };
  // const [billingAddressForm, setBillingAddressForm] = useState(false);
  // const [shippingForm, setShippingForm] = useState(false);
  const [billingAddress, setBillingAddress] = useState([]);
  const [shippingAddress, setShippingAddress] = useState([]);
  const[visible,setVisible] = useState(false);
  const[visible1,setVisible1] = useState(false);
  const[visible2,setVisible2] = useState(false);
  const[server_error,setServerError] = useState({});

  const [changeUserPassword] = useChangeUserPasswordMutation();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const actualData = {
      old_password: data.get('old_password'),
      password: data.get('password'),
      password2: data.get('password2'),
    }
    console.log(actualData);
    const res = await changeUserPassword({ actualData, access_token })
    if (res.error) {
      // setServerMsg({})
      console.log(res.error.data.errors)
      setServerError(res.error.data.errors)
      if (res.error.data.errors.non_field_errors) {
        toast.error(res.error.data.errors.non_field_errors[0])
      }
    }
    if (res.data) {
      toast.success(res.data.msg)
      setServerError({})
      // setServerMsg(res.data)
      document.getElementById("password-change-form").reset();
    }

  };
  const { data: shipaddresses, error, isLoading, refetch: refetchShippingAddresses } = useFetchCustomerShippingAddressesQuery();
  console.log(shipaddresses)
  const { data: Billaddresses,refetch: refetchBillingAddresses} = useFetchCustomerBillingAddressesQuery();
  console.log(Billaddresses)


  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    zip_code: '',
    customization:'',
    country: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAddressId, setCurrentAddressId] = useState(null);

  const [addCustomerShippingAddress] = useAddCustomerShippingAddressMutation();
  const [addCustomerBillingAddress] = useAddCustomerBillingAddressMutation();
  const [deleteCustomerShippingAddress] = useDeleteCustomerShippingAddressMutation();
  const [deleteCustomerBillingAddress] = useDeleteCustomerBillingAddressMutation();
  const [updateCustomerSippingAddress] = useUpdateCustomerShippingAddressMutation();
  const [updateCustomerBillingAddress] = useUpdateCustomerBillingAddressMutation();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      zip_code: '',
      country: ''
    });
    setIsEditMode(false);
    setCurrentAddressId(null);
  };

  const handleEditBillingAddress = (address) => {
    setFormData({
      name: address.name,
      phone: address.phone,
      email: address.email,
      address: address.address,
      city: address.city,
      zip_code: address.zip_code,
      customization:address.customization,
      country: address.country,
    });
    setIsForm(true);
    setBillingAddressForm(true);
    setShippingForm(false);
    setBillingAddress(true);
    setShippingAddress(false);
    setIsEditMode(true);
    setCurrentAddressId(address.id);
  };
  
  const handleEditShippingAddress = (address) => {
    setFormData({
      name: address.name,
      phone: address.phone,
      email: address.email,
      address: address.address,
      city: address.city,
      zip_code: address.zip_code,
      customization:address.customization,
      country:address.country,
    });
    setIsForm(true);
    setBillingAddressForm(false);
    setShippingForm(true);
    setBillingAddress(false);
    setShippingAddress(true);
    setIsEditMode(true);
    setCurrentAddressId(address.id);
  };

  const handleShippingSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateCustomerSippingAddress({ shipping_address_id: currentAddressId, ...formData });
        toast.success('Shipping address updated succesfully')
      } else {
        await addCustomerShippingAddress(formData);
        toast.success('Shipping address added succesfully')
      }
      resetForm();
      setIsForm(false);
      setShippingForm(false);
      setShippingAddress(false);
      setIsEditMode(false);
      setCurrentAddressId(null);
      refetchShippingAddresses()
    } catch (error) {
      console.error('Error creating shipping address:', error);
    }
  };

  const handleBillingSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateCustomerBillingAddress({ billing_address_id : currentAddressId, ...formData });
        toast.success('Billing address updated succesfully')
      } else {
        await addCustomerBillingAddress(formData);
        toast.success('Billing address added succesfully')
      }
      resetForm();
      setIsForm(false);
      setBillingAddressForm(false);
      setBillingAddress(false);
      setIsEditMode(false);
      setCurrentAddressId(null);
      refetchBillingAddresses()
    } catch (error) {
      console.error('Error creating shipping address:', error);
    }
  };
  const handleDeleteShippingAddress = async (id) => {
    try{
      const res = await deleteCustomerShippingAddress(id);
      console.log(res)
      toast.success(res.data.msg)
      refetchShippingAddresses()
    }catch (error) {
      console.error(error)
    }
  }
  const handleDeleteBillingAddress = async (id) => {
    try{
      const res = await deleteCustomerBillingAddress(id);
      console.log(res)
      toast.success(res.data.msg)
      refetchBillingAddresses()
    }catch (error) {
      console.error(error)
    }
  }
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full">
      {active === 1 && (
        <>
          <div className="w-full  1500px:ml-[100px] 300px:pl-[30px] 1024px:pl-[60px]
          1500px:pl-0 ml-0">
            <div className="flex items-center gap-[15px]">
              {/* <CgProfile  color="#242424" className="text-[28px] 1350px:text-[26px]"/> */}
              <div className="w-[60px] h-[60px] rounded-full border-[2px] border-[#33cc00] overflow-hidden">
              <img src={process.env.REACT_APP_IMG_URL+data.profile_picture} alt="" className="w-full h-full"/>
              </div>
              <span className="text-[#077bc4] font-[600] text-[18px] 1350px:text-[16px]">
                Welcome!   <span
                className="text-[#242424] capitalize 
                   font-[500] ml-[5px] mt-[2px] text-[20px] 1350px:text-[17px]"
              >
               {data.username}
              </span>
              </span>
            </div>
            {/* <br /> */}
          </div>
          <div className="w-full px-4 1500px:ml-[50px] 300px:pl-[20px] 1024px:pl-[80px] 1500px:pl-0 ml-0 mt-[10px]">
            <form onSubmit={handleProfileSubmit}>
              <div className="w-full flex flex-col pb-3 1350px:pb-[6px] 768px:gap-[10px] 300px:gap-[10px]">
                <div className="1024px:w-[50%] 768px:w-[70%] 300px:w-[100%]">
                  <label className="block pb-2 1024px:pb-[4px] 1350px:text-[13px]">First Name :</label>
                  <input
                    type="text"
                    name="first_name"
                    value={updateProfile.first_name || data.first_name}
                    onChange={handleChangeProfile}
                    className={`${Styles.input} 1350px:p-[4px] !w-[95%] 1350px:text-[12px] border-[1px] border-[rgba(0,0,0,0.3)]`}
                    required
                  />
                </div>
                <div className="1024px:w-[50%] 768px:w-[70%] 300px:w-[100%]">
                  <label className="block pb-2 1024px:pb-[4px] 1350px:text-[13px]">Last Name :</label>
                  <input
                    type="text"
                    name="last_name"
                    value={updateProfile.last_name || data.last_name}
                    onChange={handleChangeProfile}
                    className={`${Styles.input} 1350px:p-[4px] !w-[95%] 1350px:text-[12px] border-[1px] border-[rgba(0,0,0,0.3)]`}
                    required
                  />
                </div>
                <div className="1024px:w-[50%] 768px:w-[70%] 300px:w-[100%]">
                  <label className="block pb-2 1024px:pb-[4px] 1350px:text-[13px]">UserName :</label>
                  <input
                    type="text"
                    name="username"
                    value={updateProfile.username || data.username}
                    onChange={handleChangeProfile}
                    className={`${Styles.input} 1350px:p-[4px] !w-[95%] 1350px:text-[12px] border-[1px] border-[rgba(0,0,0,0.3)]`}
                    required
                    readOnly
                    onFocus={()=>{handleFocus('Username')}}
                  />
                </div>
                <div className="1024px:w-[50%] 768px:w-[70%] 300px:w-[100%]">
                  <label className="block pb-2 1024px:pb-[4px] 1350px:text-[13px]">Email :</label>
                  <input
                    type="email"
                    name="email"
                    value={updateProfile.email || data.email}
                    onChange={handleChangeProfile}
                    className={`${Styles.input} 1350px:p-[4px] !w-[95%] 1350px:text-[12px] border-[1px] border-[rgba(0,0,0,0.3)]`}
                    required
                    readOnly
                    onFocus={()=>{handleFocus('Email')}}
                  />
                </div>
                <div className="1024px:w-[50%] 768px:w-[70%] 300px:w-[100%]">
                  <label className="block pb-2 1024px:pb-[4px] 1350px:text-[13px]">Upload profile image :</label>
                  <input
                    type="file"
                    name="profile_picture"
                    onChange={handleChangeProfile}
                    className={`${Styles.input} 1350px:p-[4px] !w-[95%] 1350px:text-[12px] outline-none border-0`}
                  />
                </div>
                <button
                  type="submit"
                  className="mt-[10px] 1024px:mt-[5px] 1350px:mt-[2px] 1350px:p-[5px]
                    768px:p-2 p-1 border bg-[#077bc4] text-white 
                    1280px:text-[18px] 1024px:text-[16px] text-[16px] 1350px:text-[13px] font-[500] 1350px:w-[12%] 1024px:w-[15%] 768px:w-[20%] 300px:w-[50%] rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* order Page */}

      {active === 2 && (
        <div className="w-full 300px:w-[370px] 768px:w-[680px] 1024px:w-full">
          <AllOrders />
        </div>
      )}
      {/* download page */}
      {active === 3 && (
        <div className="1024px:pl-8 768px:pl-2 pl-1 pt-2">
          <div
            className="flex items-center 768px:gap-[10px] gap-[3px] rounded-md 
                     shadow-md shadow-[#077bc4] 768px:px-2 px-1 py-1 1350px:w-[65%] 1024px:w-[90%] w-[100%]"
          >
            <RiErrorWarningLine  className="text-[red] text-[30px] 1350px:text-[26px]"/>
            <h4 className="text-[#242424] 768px:font-semibold font-[500] 1350px:text-[14px] 1024px:text-[18px] 768px:text-[15px] text-[14px]">
              <span className="text-[orangered]">
                No downloads available yet.
              </span>
              <span className="hidden 768px:inline"> Visit our shop and choice your best products.</span>
            </h4>
            <Link
              to={`/shop`}
              className="1024px:text-[18px] 1350px:text-[13px] 768px:text-[15px] text-[14px] ml-[3px] 768px:ml-0
                        768px:font-bold font-[600] 768px:px-2 px-1 py-1 underline text-white bg-[#077bc4] border-none outline-none
                        rounded-md"
            >
              Visit shop
            </Link>
          </div>{" "}
          <br />
          <div className="768px:w-[95%] w-[100%] overflow-hidden">
            <img src={o1} alt="" className="w-full 768px:h-[380px] 1350px:h-[300px] h-[300px] object-contain" />
          </div>
        </div>
      )}
      {/* Address Page */}

      {/* {active === 4 &&
           (
            <div className="1024px:pl-8 768px:pl-2 pl-1 pt-3 1024px:pt-0">
              {
                isForm ? (
                  <div className="">
                    {
                      billingAddressForm ? (
                        <div className="">
                           <div className="pl-1 pt-3 1024px:pt-0 1024px:w-[70%] w-[100%]">
                    <h1
                      className="768px:text-[28px] 1350px:text-[22px] text-[25px] text-[#242424] 
                          font-[500] capitalize px-2 768px:ml-[30px] 1350px:ml-[20px] "
                    >
                      billing address
                    </h1>
                    <form className="mt-[20px] 1024px:mt-[10px] 768px:ml-[30px] ml-[10px]" onSubmit={handleBillingSubmit}>
                      <div className="w-full flex flex-col pb-3 768px:gap-[10px] gap-[10px] 1350px:gap-[5px]">
                        <div className="1024px:w-[80%] 1350px:w-[60%] 768px:w-[70%] w-[100%]">
                          <label className="block pb-2 1024px:pb-1 1350px:text-[13px]"> Name :</label>
                          <input
                            type="text"
                            name="name"
                            className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                            border-[1px] border-[rgba(0,0,0,0.3)]`}
                            value={formData.name} onChange={handleChange}
                            required

                          />
                        </div>

                        <div className="1024px:w-[80%] 1350px:w-[60%] 768px:w-[70%] w-[100%] flex items-center">
                        <div className="w-[49%]">
                          <label className="block pb-2 1024px:pb-1 1350px:text-[13px]">Phone :</label>
                          <input
                            type="text"
                            name="phone"
                            className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                            border-[1px] border-[rgba(0,0,0,0.3)]`}
                            value={formData.phone} onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="w-[49%]">
                          <label className="block pb-2 1024px:pb-1 1350px:text-[13px]">Email :</label>
                          <input
                            type="email"
                            name="email"
                            className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                            border-[1px] border-[rgba(0,0,0,0.3)]`}
                            value={formData.email} onChange={handleChange}
                            required
                          />
                        </div>
                        </div>

                        <div className="1024px:w-[80%] 1350px:w-[60%] 768px:w-[70%] w-[100%]">
                          <label className="block pb-2 1024px:pb-1 1350px:text-[13px]">Address :</label>
                          <textarea cols="50" rows="3"
                             className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                             border-[1px] border-[rgba(0,0,0,0.3)]`}
                             name="address"
                             value={formData.address} onChange={handleChange}
                             ></textarea>
                        </div>

                         <div className="1024px:w-[80%] 1350px:w-[60%] 768px:w-[70%] w-[100%] flex items-center">
                        <div className="w-[49%]">
                          <label className="block pb-2 1024px:pb-1 1350px:text-[13px]">Town / City :</label>
                          <input
                            type="text"
                            name="city"
                            className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                            border-[1px] border-[rgba(0,0,0,0.3)]`}
                            value={formData.city} onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="w-[49%]">
                          <label className="block pb-2 1024px:pb-1 1350px:text-[13px]">
                            Postcode / ZIP (optional) :
                          </label>
                          <input
                            type="text"
                            name="zip_code"
                            className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                            border-[1px] border-[rgba(0,0,0,0.3)]`}
                            value={formData.zip_code} onChange={handleChange}
                            required
                          />
                        </div>
                        </div>

                        <div className="1024px:w-[80%] 1350px:w-[60%] 768px:w-[70%] w-[100%]">
                          <label className="block pb-2 1024px:pb-1 1350px:text-[13px]">Country :</label>
                          <input
                            type="text"
                            name="country"
                            className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                            border-[1px] border-[rgba(0,0,0,0.3)]`}
                            value={formData.country} onChange={handleChange}
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="mt-[10px] 1024px:mt-[5px]
                      p-2 border bg-[#077bc4] text-white 1350px:text-[13px]
                      1024px:text-[16px] 768px:text-[17px] text-[16px] font-[500] 1350px:w-[15%] 1024px:w-[25%] 768px:w-[25%] w-[50%] rounded-md"
                          onClick={() => {
                            setIsForm(false);
                            setBillingAddressForm(false);
                            setBillingAddress(false);
                          }}
                        >
                          Save Address
                        </button>
                      </div>
                    </form>
                  </div>
                        </div>
                      ):null
                    }
                    {
                      shippingForm ? (
                        <div className="">
                              <div className="pl-1 pt-3 1024px:pt-0 1024px:w-[70%] w-[100%]">
                  <h1
                className="768px:text-[28px] 1350px:text-[22px] text-[25px] text-[#242424] 
                    font-[500] capitalize px-2 768px:ml-[30px] 1350px:ml-[20px] ml-[8px]"
              >
                Shipping address
              </h1>
              <form className="mt-[20px] 1024px:mt-[10px] 768px:ml-[30px] ml-[10px]" onSubmit={handleShippingSubmit}>
                      <div className="w-full flex flex-col pb-3 768px:gap-[10px] gap-[10px] 1350px:gap-[5px]">
                        <div className="1024px:w-[80%] 1350px:w-[60%] 768px:w-[70%] w-[100%]">
                          <label className="block pb-2 1024px:pb-1 1350px:text-[13px]"> Name :</label>
                          <input
                            type="text"
                            name="name"
                            className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                            border-[1px] border-[rgba(0,0,0,0.3)]`}
                            value={formData.name} onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="1024px:w-[80%] 1350px:w-[60%] 768px:w-[70%] w-[100%] flex items-center">
                        <div className="w-[49%]">
                          <label className="block pb-2 1024px:pb-1 1350px:text-[13px]">Phone :</label>
                          <input
                            type="text"
                            name="phone"
                            className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                            border-[1px] border-[rgba(0,0,0,0.3)]`}
                            value={formData.phone} onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="w-[49%]">
                          <label className="block pb-2 1024px:pb-1 1350px:text-[13px]">Email :</label>
                          <input
                            type="email"
                            name="email"
                            className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                            border-[1px] border-[rgba(0,0,0,0.3)]`}
                            value={formData.email} onChange={handleChange}
                            required
                          />
                        </div>
                        </div>

                        <div className="1024px:w-[80%] 1350px:w-[60%] 768px:w-[70%] w-[100%]">
                          <label className="block pb-2 1024px:pb-1 1350px:text-[13px]">Address :</label>
                          <textarea cols="50" rows="3"
                             className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                             border-[1px] border-[rgba(0,0,0,0.3)]`}
                             name="address"
                             value={formData.address} onChange={handleChange}
                             ></textarea>
                        </div>

                         <div className="1024px:w-[80%] 1350px:w-[60%] 768px:w-[70%] w-[100%] flex items-center">
                        <div className="w-[49%]">
                          <label className="block pb-2 1024px:pb-1 1350px:text-[13px]">Town / City :</label>
                          <input
                            type="text"
                            name="city"
                            className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                            border-[1px] border-[rgba(0,0,0,0.3)]`}
                            value={formData.city} onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="w-[49%]">
                          <label className="block pb-2 1024px:pb-1 1350px:text-[13px]">
                            Postcode / ZIP (optional) :
                          </label>
                          <input
                            type="text"
                            name="zip_code"
                            className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                            border-[1px] border-[rgba(0,0,0,0.3)]`}
                            value={formData.zip_code} onChange={handleChange}
                            required
                          />
                        </div>
                        </div>

                        <div className="1024px:w-[80%] 1350px:w-[60%] 768px:w-[70%] w-[100%]">
                          <label className="block pb-2 1024px:pb-1 1350px:text-[13px]">Country :</label>
                          <input
                            type="text"
                            name="country"
                            className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                            border-[1px] border-[rgba(0,0,0,0.3)]`}
                            value={formData.country} onChange={handleChange}
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="mt-[10px] 1024px:mt-[5px]
                      p-2 border bg-[#077bc4] text-white 1350px:text-[13px]
                      1024px:text-[16px] 768px:text-[17px] text-[16px] font-[500] 1350px:w-[15%] 1024px:w-[25%] 768px:w-[25%] w-[50%] rounded-md"
                          onClick={() => {
                            setIsForm(false);
                            setShippingForm(false);
                            setShippingAddress(false);
                          }}
                        >
                          Save Address
                        </button>
                      </div>
                    </form>
            </div>
                        </div>
                      ):null
                    }
                  </div>
                ):(
                  <div className="w-full 1024px:w-[98%] flex flex-col 1024px:flex-row items-center justify-center 
                  1280px:gap-[50px] 1024px:gap-[20px] 768px:gap-[30px] gap-[20px]">
                    <ul>
                    {Billaddresses?.map((index,address) =>(
                            <div className="1350px:w-[34%] 768px:w-[60%] 1024px:w-[50%] w-[98%] 
                            rounded-md shadow-md shadow-[gray] bg-white" key={index}>
                            <div
                              className="flex items-center
                                       gap-[20px] 768px:py-2 py-1"
                            >
                              <MdOutlineMapsHomeWork
                                
                                className="text-[#077bc4] 768px:ml-[30px] 1350px:ml-[20px]
                                 ml-[10px] 768px:text-[40px] 1350px:text-[25px] text-[30px]"
                              />
                              <h1 className="font-[500] 768px:text-[28px] 1350px:text-[20px] text-[20px] text-[#077bc4] capitalize">
                                billing address {index}
                              </h1>
                              <div
                                className="768px:ml-[15px] 1350px:ml-[50px] ml-[8px] cursor-pointer flex items-center "
                                onClick={() => {
                                  setIsForm(true);
                                  setBillingAddressForm(true);
                                  setShippingForm(false);
                                }}
                              >
                                <MdEditLocationAlt
                                  title="Edit Address"
                                  className="text-[red] mr-[3px] text-[20px] 1350px:text-[16px]"
                                />{" "}
                                <span
                                  className="768px:text-[18px] text-[16px] 1350px:text-[14px]
                                  font-[500] capitalize text-[orangered]"
                                >
                                  edit
                                </span>
                              </div>
                            </div>
                            { address?.length === 0 ? (
                              <div
                                className="w-full overflow-hidden pt-[10px]
                                              "
                              >
                                <h3
                                  className="text-center 768px:text-[18px] 1350px:text-[14px] text-[17px]
                                              text-[700] text-[orangered] py-1"
                                >
                                  You have not set up this type of address yet.
                                </h3>
                                <img
                                  src={a1}
                                  alt=""
                                  className="w-full 768px:h-[250px] 1350px:h-[200px] h-[200px] object-contain pt-[10px]"
                                />
                              </div>
                            ) : (
                              <div
                                className="w-full overflow-hidden pt-[10px] 
                                              768px:px-[25px] px-[10px] pb-[15px] flex flex-col justify-center gap-[10px]"
                              >
                                <h3
                                  className="768px:text-[19px] 1350px:text-[14px] text-[18px] font-[500]
                                                   text-[#242424]"
                                >
                                  Name :{" "}
                                  <span className="text-[17px] 1350px:text-[13px] italic ml-[5px]">
                                    {address.name}
                                  </span>
                                </h3>
                                <h3
                                  className="768px:text-[19px] 1350px:text-[14px] text-[18px] font-[500]
                                                   text-[#242424]"
                                >
                                  Email :{" "}
                                  <span className="768px:text-[17px] 1350px:text-[13px] text-[16px] italic 768px:ml-[5px] ml-[1px]">
                                    {address.email}
                                  </span>
                                </h3>
                                <h3
                                  className="768px:text-[19px] 1350px:text-[14px] text-[18px] font-[500]
                                                   text-[#242424]"
                                >
                                  Address :{" "}
                                  <span className="text-[17px] 1350px:text-[13px] italic ml-[5px]">
                                    {address.address}
                                  </span>
                                </h3>
                                <h3
                                  className="768px:text-[19px] 1350px:text-[14px] text-[18px] font-[500]
                                                   text-[#242424]"
                                >
                                  City :{" "}
                                  <span className="text-[17px] 1350px:text-[13px] italic ml-[5px]">
                                    {address.city}
                                  </span>
                                </h3>
                                <h3
                                  className="768px:text-[19px] 1350px:text-[14px] text-[18px] font-[500]
                                                   text-[#242424]"
                                >
                                  Zip Code :{" "}
                                  <span className="text-[17px] 1350px:text-[13px] italic ml-[5px]">
                                    {address.zip_code}
                                  </span>
                                </h3>
                                <h3
                                  className="768px:text-[19px] 1350px:text-[14px] text-[18px] font-[500]
                                                   text-[#242424]"
                                >
                                  Phone Number :{" "}
                                  <span className="text-[17px] 1350px:text-[13px] italic ml-[5px]">
                                    {address.phone}
                                  </span>
                                </h3>
                              </div>
                            )}
                          </div>
                    ))}
                    </ul>

                    <ul>
                    {shipaddresses?.map((index,address)=>(
                                    <div className="1350px:w-[34%] 768px:w-[60%] 1024px:w-[50%] 
                                    w-[98%] rounded-md shadow-md shadow-[gray] bg-white" key={index}>
                                    <div className="flex items-center gap-[20px] 768px:py-2 py-1">
                                      <LiaShippingFastSolid
                                        
                                        className="text-[#077bc4] 768px:ml-[30px] 1350px:ml-[20px]
                                         ml-[6px] 768px:text-[40px] 1350px:text-[25px] text-[30px]"
                                      />
                                      <h1 className="font-[500] 768px:text-[26px] 1350px:text-[20px] text-[19px] text-[#077bc4] capitalize">
                                        shipping address {index}
                                      </h1>
                                      <div
                                        className="768px:ml-[15px] 1350px:ml-[30px] ml-[3px] cursor-pointer flex items-center "
                                        onClick={() => {
                                          setIsForm(true);
                                          setShippingForm(true);
                                          setBillingAddressForm(false);
                                        }}
                                      >
                                        <RiMapPinAddFill
                                          
                                          title="Add Shipping Address"
                                          className="text-[red] mr-[3px] text-[20px] 1350px:text-[16px]"
                                        />{" "}
                                        <span
                                          className="768px:text-[18px] text-[16px] 1350px:text-[14px]
                                          font-[500] capitalize text-[orangered]"
                                        >
                                          add
                                        </span>
                                      </div>
                                    </div>
                                    { address?.length === 0 ? (
                                      <div
                                        className="w-full overflow-hidden pt-[10px]
                                                      "
                                      >
                                        <h3
                                          className="text-center 768px:text-[18px] text-[17px] 1350px:text-[14px]
                                                      text-[700] text-[orangered] py-1"
                                        >
                                          You have not set up this type of address yet.
                                        </h3>
                                        <img
                                          src={a2}
                                          alt=""
                                          className="w-full 768px:h-[250px] 1350px:h-[200px] h-[200px] object-contain pt-[10px]"
                                        />
                                      </div>
                                    ) : (
                                      <div
                                              className="w-full overflow-hidden pt-[10px] 
                                                            768px:px-[25px] px-[10px] pb-[15px] flex flex-col justify-center gap-[10px]"
                                            >
                                              <h3
                                                className="768px:text-[19px] 1350px:text-[14px] text-[18px] font-[500]
                                                                 text-[#242424]"
                                              >
                                                Name :{" "}
                                                <span className="text-[17px] 1350px:text-[13px] italic ml-[5px]">
                                                  {address.name}
                                                </span>
                                              </h3>
                                              <h3
                                                className="768px:text-[19px] 1350px:text-[14px] text-[18px] font-[500]
                                                                 text-[#242424]"
                                              >
                                                Email :{" "}
                                                <span className="768px:text-[17px] 1350px:text-[13px] text-[16px] italic 768px:ml-[5px] ml-[1px]">
                                                  {address.email}
                                                </span>
                                              </h3>
                                              <h3
                                                className="768px:text-[19px] 1350px:text-[14px] text-[18px] font-[500]
                                                                 text-[#242424]"
                                              >
                                                Address :{" "}
                                                <span className="text-[17px] 1350px:text-[13px] italic ml-[5px]">
                                                  {address.address}
                                                </span>
                                              </h3>
                                              <h3
                                                className="768px:text-[19px] 1350px:text-[14px] text-[18px] font-[500]
                                                                 text-[#242424]"
                                              >
                                                City :{" "}
                                                <span className="text-[17px] 1350px:text-[13px] italic ml-[5px]">
                                                  {address.city}
                                                </span>
                                              </h3>
                                              <h3
                                                className="768px:text-[19px] 1350px:text-[14px] text-[18px] font-[500]
                                                                 text-[#242424]"
                                              >
                                                Zip Code :{" "}
                                                <span className="text-[17px] 1350px:text-[13px] italic ml-[5px]">
                                                  {address.zip_code}
                                                </span>
                                              </h3>
                                              <h3
                                                className="768px:text-[19px] 1350px:text-[14px] text-[18px] font-[500]
                                                                 text-[#242424]"
                                              >
                                                Phone Number :{" "}
                                                <span className="text-[17px] 1350px:text-[13px] italic ml-[5px]">
                                                  {address.phone}
                                                </span>
                                              </h3>
                                            </div>
                                    )}
                                       </div>     
                    ))}
                    </ul>
                  </div>
                )
              }
            </div>
           )
       } */}

      {active === 4 &&
        (
          <div className="1024px:pl-8 768px:pl-2 pl-1 pt-3 1024px:pt-0">
            {
              isForm ? (
                <div className="">
                  {
                    billingAddressForm ? (
                      <div className="">
                        <div className="pl-1 pt-3 1024px:pt-0 1024px:w-[70%] w-[100%]">
                          <h1
                            className="768px:text-[28px] 1350px:text-[22px] text-[18px] text-[#242424] 
                            font-[500] capitalize px-2 768px:ml-[30px] 1350px:ml-[20px] "
                          >
                            Billing Address
                          </h1>
                          <form className="mt-[10px] 1024px:mt-[6px] 768px:ml-[30px] ml-[10px]" onSubmit={handleBillingSubmit}>
                            <div className="w-full flex flex-col pb-3 768px:gap-[10px] gap-[10px] 1350px:gap-[5px]">
                              <div className="1024px:w-[80%] 1350px:w-[60%] 768px:w-[70%] w-[100%]">
                                <label className="block pb-1 1024px:pb-0 1350px:text-[13px]"> Name :</label>
                                <input
                                  type="text"
                                  name="name"
                                  className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                                  border-[1px] border-[rgba(0,0,0,0.3)]`}
                                  value={formData.name} onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="1024px:w-[80%] 1350px:w-[60%] 768px:w-[70%] w-[100%] flex items-center">
                                <div className="w-[49%]">
                                  <label className="block pb-1 1024px:pb-0 1350px:text-[13px]">Phone :</label>
                                  <input
                                    type="text"
                                    name="phone"
                                    className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                                    border-[1px] border-[rgba(0,0,0,0.3)]`}
                                    value={formData.phone} onChange={handleChange}
                                    required
                                  />
                                </div>
                                <div className="w-[49%]">
                                  <label className="block pb-1 1024px:pb-0 1350px:text-[13px]">Email :</label>
                                  <input
                                    type="email"
                                    name="email"
                                    className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                                    border-[1px] border-[rgba(0,0,0,0.3)]`}
                                    value={formData.email} onChange={handleChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="1024px:w-[80%] 1350px:w-[60%] 768px:w-[70%] w-[100%]">
                                <label className="block pb-1 1024px:pb-0 1350px:text-[13px]">Address :</label>
                                <textarea cols="50" rows="2"
                                  className={`${Styles.input} 1350px:px-[4px] 1350px:text-[12px] !w-[95%]
                                  border-[1px] border-[rgba(0,0,0,0.3)]`}
                                  name="address"
                                  value={formData.address} onChange={handleChange}
                                  required
                                ></textarea>
                              </div>
                              <div className="1024px:w-[80%] 1350px:w-[60%] 768px:w-[70%] w-[100%] flex items-center">
                                <div className="w-[49%]">
                                  <label className="block pb-1 1024px:pb-0 1350px:text-[13px]">Town / City :</label>
                                  <input
                                    type="text"
                                    name="city"
                                    className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                                    border-[1px] border-[rgba(0,0,0,0.3)]`}
                                    value={formData.city} onChange={handleChange}
                                    required
                                  />
                                </div>
                                <div className="w-[49%]">
                                  <label className="block pb-1  1024px:pb-0 1350px:text-[13px]">Postcode / ZIP :</label>
                                  <input
                                    type="text"
                                    name="zip_code"
                                    className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                                    border-[1px] border-[rgba(0,0,0,0.3)]`}
                                    value={formData.zip_code} onChange={handleChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="1024px:w-[80%] 1350px:w-[60%] 768px:w-[70%] w-[100%]">
                                <label className="block pb-1 1024px:pb-0 1350px:text-[13px]">Customization :</label>
                                <textarea cols="50" rows="2"
                                  className={`${Styles.input} 1350px:px-[4px] 1350px:text-[12px] !w-[95%]
                                  border-[1px] border-[rgba(0,0,0,0.3)]`}
                                  name="customization"
                                  value={formData.customization} onChange={handleChange}
                                  
                                ></textarea>
                              </div>
                              <div className="1024px:w-[80%] 1350px:w-[60%] 768px:w-[70%] w-[100%]">
                                <label className="block pb-1 1024px:pb-0 1350px:text-[13px]">Country :</label>
                                <input
                                  type="text"
                                  name="country"
                                  className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                                  border-[1px] border-[rgba(0,0,0,0.3)]`}
                                  value={formData.country} onChange={handleChange}
                                  required
                                />
                              </div>
                              <button
                                type="submit"
                                className="mt-[10px] 1024px:mt-[5px]
                            p-2 border bg-[#077bc4] text-white 1350px:text-[13px]
                            1024px:text-[16px] 768px:text-[17px] text-[16px] font-[400] 1350px:w-[15%] 1024px:w-[25%] 768px:w-[25%] w-[50%] rounded-md"
                                // onClick={() => {
                                //   setIsForm(false);
                                //   setBillingAddressForm(false);
                                //   setBillingAddress(false);
                                // }}
                              >
                                Save Address
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    ) : null
                  }
                  {
                    shippingForm ? (
                      <div className="">
                        <div className="pl-1 pt-3 1024px:pt-0 1024px:w-[70%] w-[100%]">
                          <h1
                            className="768px:text-[28px] 1350px:text-[22px] text-[18px] text-[#242424] 
                          font-[500] capitalize px-2 768px:ml-[30px] 1350px:ml-[20px] ml-0"
                          >
                            Shipping Address
                          </h1>
                          <form className="mt-[10px] 1024px:mt-[8px] 768px:ml-[30px] ml-[10px]" onSubmit={handleShippingSubmit}>
                            <div className="w-full flex flex-col pb-3 768px:gap-[10px] gap-[10px] 1350px:gap-[5px]">
                              <div className="1024px:w-[80%] 1350px:w-[60%] 768px:w-[70%] w-[100%]">
                                <label className="block pb-1 1024px:pb-0 1350px:text-[13px]"> Name :</label>
                                <input
                                  type="text"
                                  name="name"
                                  className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                                  border-[1px] border-[rgba(0,0,0,0.3)]`}
                                  value={formData.name} onChange={handleChange}
                                  required
                                />
                              </div>
                              <div className="1024px:w-[80%] 1350px:w-[60%] 768px:w-[70%] w-[100%] flex items-center">
                                <div className="w-[49%]">
                                  <label className="block pb-1 1024px:pb-0 1350px:text-[13px]">Phone :</label>
                                  <input
                                    type="text"
                                    name="phone"
                                    className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                                    border-[1px] border-[rgba(0,0,0,0.3)]`}
                                    value={formData.phone} onChange={handleChange}
                                    required
                                  />
                                </div>
                                <div className="w-[49%]">
                                  <label className="block pb-1 1024px:pb-0 1350px:text-[13px]">Email :</label>
                                  <input
                                    type="email"
                                    name="email"
                                    className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                                    border-[1px] border-[rgba(0,0,0,0.3)]`}
                                    value={formData.email} onChange={handleChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="1024px:w-[80%] 1350px:w-[60%] 768px:w-[70%] w-[100%]">
                                <label className="block pb-1 1024px:pb-0 1350px:text-[13px]">Address :</label>
                                <textarea cols="50" rows="2"
                                  className={`${Styles.input} 1350px:px-[4px] 1350px:text-[12px] !w-[95%]
                                  border-[1px] border-[rgba(0,0,0,0.3)]`}
                                  name="address"
                                  value={formData.address} onChange={handleChange}
                                ></textarea>
                              </div>
                              <div className="1024px:w-[80%] 1350px:w-[60%] 768px:w-[70%] w-[100%] flex items-center">
                                <div className="w-[49%]">
                                  <label className="block pb-1 1024px:pb-0 1350px:text-[13px]">Town / City :</label>
                                  <input
                                    type="text"
                                    name="city"
                                    className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                                    border-[1px] border-[rgba(0,0,0,0.3)]`}
                                    value={formData.city} onChange={handleChange}
                                    required
                                  />
                                </div>
                                <div className="w-[49%]">
                                  <label className="block pb-1 1024px:pb-0 1350px:text-[13px]">Postcode / ZIP :</label>
                                  <input
                                    type="text"
                                    name="zip_code"
                                    className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                                    border-[1px] border-[rgba(0,0,0,0.3)]`}
                                    value={formData.zip_code} onChange={handleChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="1024px:w-[80%] 1350px:w-[60%] 768px:w-[70%] w-[100%]">
                                <label className="block pb-1 1024px:pb-0 1350px:text-[13px]">Customization :</label>
                                <textarea cols="50" rows="2"
                                  className={`${Styles.input} 1350px:px-[4px] 1350px:text-[12px] !w-[95%]
                                  border-[1px] border-[rgba(0,0,0,0.3)]`}
                                  name="customization"
                                  value={formData.customization} onChange={handleChange}
                                  
                                ></textarea>
                              </div>
                              <div className="1024px:w-[80%] 1350px:w-[60%] 768px:w-[70%] w-[100%]">
                                <label className="block pb-1 1024px:pb-0 1350px:text-[13px]">Country :</label>
                                <input
                                  type="text"
                                  name="country"
                                  className={`${Styles.input} 1350px:p-[4px] 1350px:text-[12px] !w-[95%]
                                  border-[1px] border-[rgba(0,0,0,0.3)]`}
                                  value={formData.country} onChange={handleChange}
                                  required
                                />
                              </div>
                              <button
                                type="submit"
                                className="mt-[10px] 1024px:mt-[5px]
                              p-2 border bg-[#077bc4] text-white 1350px:text-[13px]
                              1024px:text-[16px] 768px:text-[17px] text-[16px] font-[400] 1350px:w-[15%] 1024px:w-[25%] 768px:w-[25%] w-[50%] rounded-md"
                                // onClick={() => {
                                //   setIsForm(false);
                                //   setShippingForm(false);
                                //   setShippingAddress(false);
                                // }}
                              >
                                Save Address
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    ) : null
                  }
                </div>
              ) : (
                <>
                  <div className="1024px:pl-8 768px:pl-2 pl-1 pt-3 1024px:pt-0">
                    <div className="flex flex-col gap-[30px] 1350px:gap-[20px] 768px:gap-[40px] 1024px:pb-5 pb-0 w-full">
                      <div className="w-full flex justify-between items-center">
                        <h1
                          className="768px:text-[28px] 1350px:text-[22px] text-[18px] text-[#242424]
                      font-[500] capitalize 768px:ml-[30px] 1350px:ml-[20px] ml-[8px] "
                        >
                          Billing Addresses
                        </h1>
                        <div
                          className="p-2 border bg-[#077bc4] text-white 1350px:text-[13px]
                      1024px:text-[16px] 768px:text-[17px] text-[14px] font-[500] mr-2
                      1350px:mr-5 768px:mr-[50px] rounded-md cursor-pointer"
                          onClick={() => {
                            setIsForm(true);
                            setBillingAddressForm(true);
                            setShippingForm(false);
                            setShippingAddress(false);
                            setBillingAddress(true);
                            setIsEditMode(false);
                          }}
                        >
                          Add New
                        </div>
                      </div>
                      <div className="w-full grid grid-cols-1 768px:grid-cols-2 gap-[10px]">
                        {Billaddresses &&
                          Billaddresses.map((address, index) => (
                            <div
                              className="w-[90%] mx-auto bg-white h-auto rounded-md shadow mb-5 flex flex-col 1350px:gap-[10px]
                            gap-[20px] py-3 px-5 border border-transparent hover:border-[#077bc4] relative"
                              key={index}
                            >
                              <div className="w-full flex justify-between items-center">
                                <h3 className="font-[600] text-[18px] 1350px:text-[16px]">
                                  Billing Address {index+1}   
                                </h3>
                                <div className="text-[#242424] ml-[10px] cursor-pointer" 
                                onClick={()=>{handleEditBillingAddress(address) && setIsEditMode(true)}}>Edit</div>
                              </div>
                              <div className="flex items-center absolute right-0 bottom-4">
                                  <AiOutlineDelete
                                    size={25}
                                    className="cursor-pointer mr-5 text-[orangered]"
                                    onClick={() => handleDeleteBillingAddress(address.id)}
                                  />
                                </div>
                              <div className="flex flex-col">
                                <span className="overflow-hidden text-ellipsis w-[220px]">
                                  {address.name}
                                </span>
                                <span className="overflow-hidden text-ellipsis w-[220px]">
                                  {address.email}
                                </span>
                                <span className="overflow-hidden text-ellipsis w-[220px]">
                                  {address.phone}
                                </span>
                                <span className="overflow-hidden text-ellipsis w-[220px]">
                                  {address.address}
                                </span>
                                <span className="overflow-hidden text-ellipsis w-[220px]">
                                  {address.city}
                                </span>
                                <span className="overflow-hidden text-ellipsis w-[220px]">
                                  {address.zip_code}
                                </span>
                                <span className="overflow-hidden text-ellipsis w-[220px]">
                                  {address.country}
                                </span>
                                <span className="overflow-hidden text-ellipsis w-[220px]">
                                  {address.customization}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                      <div className="w-full flex justify-between items-center">
                        <h1
                          className="768px:text-[28px] 1350px:text-[22px] text-[18px] text-[#242424]
                      font-[500] capitalize 768px:ml-[30px] 1350px:ml-[20px] ml-[8px] "
                        >
                          Shipping Addresses
                        </h1>
                        <div
                          className="p-2 border bg-[#077bc4] text-white 1350px:text-[13px]
                      1024px:text-[16px] 768px:text-[17px] text-[14px] font-[500] mr-2
                      1350px:mr-5 768px:mr-[50px] rounded-md cursor-pointer"
                          onClick={() => {
                            setIsForm(true);
                            setBillingAddressForm(false);
                            setShippingForm(true);
                            setShippingAddress(true);
                            setBillingAddress(false);
                            setIsEditMode(false);
                          }}
                        >
                          Add New
                        </div>
                      </div>
                      <div className="w-full grid grid-cols-1 768px:grid-cols-2 gap-[10px]">
                        {shipaddresses &&
                          shipaddresses.map((address, index) => (
                            <div
                              className="w-[90%] mx-auto bg-white h-auto rounded-md shadow mb-5 flex flex-col 1350px:gap-[10px]
                            gap-[20px] py-3 px-5 border border-transparent hover:border-[#077bc4] relative"
                              key={index}
                            >
                              <div className="w-full flex justify-between items-center">
                                <h3 className="font-[600] text-[18px] 1350px:text-[16px]">
                                  Shipping Address {index+1}  
                                </h3>
                                <div className="text-[#242424] ml-[10px] cursor-pointer" 
                                onClick={()=>{handleEditShippingAddress(address) && setIsEditMode(true)}}>Edit</div>
                              </div>
                              <div className="flex items-center absolute right-0 bottom-4">
                                  <AiOutlineDelete
                                    size={25}
                                    className="cursor-pointer mr-5 text-[orangered]"
                                    onClick={() => handleDeleteShippingAddress(address.id)}
                                  />
                                </div>
                              <div className="flex flex-col">
                                <span className="overflow-hidden text-ellipsis w-[220px]">
                                  {address.name}
                                </span>
                                <span className="overflow-hidden text-ellipsis w-[220px]">
                                  {address.email}
                                </span>
                                <span className="overflow-hidden text-ellipsis w-[220px]">
                                  {address.phone}
                                </span>
                                <span className="overflow-hidden text-ellipsis w-[220px]">
                                  {address.address}
                                </span>
                                <span className="overflow-hidden text-ellipsis w-[220px]">
                                  {address.city}
                                </span>
                                <span className="overflow-hidden text-ellipsis w-[220px]">
                                  {address.zip_code}
                                </span>
                                <span className="overflow-hidden text-ellipsis w-[220px]">
                                  {address.country}
                                </span>
                                <span className="overflow-hidden text-ellipsis w-[220px]">
                                  {address.customization}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </>
              )
            }
          </div>
        )
      }


      {active === 5 && (
        <div className="1280px:pl-14 768px:pl-6 pl-[5px] pt-3 1024px:pt-0 w-full">
          <div className="bg-white 1280px:w-[63%] 1350px:w-[45%] 768px:w-[90%] 1024px:w-[80%] w-[99.5%]
           py-2 px-3 rounded-sm shadow-md  shadow-[#33cc00]">
            <div className="flex items-center text-[#077bc4]">
              <RiAccountBoxLine  className="pr-[5px] text-[35px] 1350px:text-[25px]" />
              <h1
                className="text-[22px] 1350px:text-[14px]
                    font-semibold capitalize px-[5px] pt-[5px]"
              >
                account details
              </h1>
            </div>
            <div
              className="w-full overflow-hidden  
                                1280px:px-[25px] 768px:px-[15px] px-[5px] pb-[15px] 1024px:pb-[5px] flex flex-col justify-center gap-[1px]"
            >
              <h5
                className="768px:text-[19px] 1350px:text-[13px] text-[18px] font-[500]
                                     text-[#242424]"
              >
                Name :{" "}
                <span className="768px:text-[17px] 1350px:text-[12px] text-[16px] italic ml-[5px]">
                  {data.first_name + " " + data.last_name}
                </span>
              </h5>
              <h5
                className="768px:text-[19px] 1350px:text-[13px] text-[18px] font-[500]
                                     text-[#242424]"
              >
                Email :{" "}
                <span className="768px:text-[17px] 1350px:text-[12px] text-[16px] italic 768px:ml-[5px] ml-[1px]">
                  {data.email}
                </span>
              </h5>
              <h5
                className="768px:text-[19px] 1350px:text-[13px] text-[18px] font-[500]
                                     text-[#242424]"
              >
                Username :{" "}
                <span className="768px:text-[17px] 1350px:text-[12px] text-[16px] italic ml-[5px]">{data.username}</span>
              </h5>
              {/* <h3
                className="768px:text-[19px] 1350px:text-[13px] text-[18px] font-[500]
                                     text-[#242424]"
              >
                Address :{" "}
                <span className="768px:text-[17px] 1350px:text-[12px] text-[16px] italic ml-[5px]">
                  {Daddress.address}
                </span>
              </h3>
              <h3
                className="768px:text-[19px] 1350px:text-[13px] text-[18px] font-[500]
                                     text-[#242424]"
              >
                City :{" "}
                <span className="768px:text-[17px] 1350px:text-[12px] text-[16px] italic ml-[5px]">
                  {Daddress.city}
                </span>
              </h3>
              <h3
                className="768px:text-[19px] 1350px:text-[13px] text-[18px] font-[500]
                                     text-[#242424]"
              >
                Phone Number :{" "}
                <span className="768px:text-[17px] 1350px:text-[12px] text-[16px] italic ml-[5px]">
                  {Daddress.Pnum}
                </span>
              </h3> */}
            </div>
            <h4 className="pt-[20px] 1024px:pt-[5px] 768px:text-[18px] 1280px:text-[14px] 1350px:text-[10px] text-[15px] font-[500] 
            768px:pl-[10px] pl-[5px] capitalize pb-[20px] 1024px:pb-[5px]">
              <span className="text-[orangered] ">
                if you wish to change your <span className="text-[red]">password <MdOutlineKey  className="inline 768px:text-[20px] 1350px:text-[12px] text-[17px]"/> 
                </span>
              </span>
              , <span className="text-[orange]"> please follow the instructions below</span>
            </h4>
            <div className="pt-[20px] 1024px:pt-[5px]">
                <div className="flex items-center gap-[10px] 768px:pl-[10px] pl-[5px]">
                    <RiLockPasswordLine  className="text-[#077bc4] tex-[25px] 1350px:text-[16px]"/>
                    <h1 className="text-[#077bc4] text-[22px] 1350px:text-[14px] capitalize
                    pt-[5px] font-semibold">change password</h1>
                </div>
                <form id="password-change-form" onSubmit={handleSubmit}>
                <div className="768px:pt-[30px] 1024px:pt-[5px] pt-[10px] 768px:pl-[20px] pl-[5px] 1024px:w-[60%] 768px:w-[80%] w-[100%] 
                pb-[3px] 1350px:pb-0">
              <label
                
                className="block font-medium text-[#242424] 1350px:text-[11px]"
              >
                Current Password :
              </label>
              <div className="mt-1 1024px:mt-0 relative w-full">
                <input
                  type={visible?"text":"password"}
                  name="old_password"
                  
                  
                  placeholder="Enter current password***"
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block !w-[100%] px-3 py-2 1350px:py-[3px] border border-gray-300 rounded-md 
                  shadow-sm placeholder-gray-500 1350px:text-[10px]
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {server_error.old_password ? <p className='pt-[3px] font-[500] text-[12px] text-[red]'>{server_error.old_password[0]}</p>:""}
                {visible? <AiOutlineEye 
                
                className="absolute right-3 top-2 cursor-pointer 1350px:text-[13px] text-[22px] text-gray-500"
                onClick={()=>setVisible(false)} 
                />  : <AiOutlineEyeInvisible 
                
                className="absolute right-3 top-2 1350px:text-[13px] text-[22px] cursor-pointer text-gray-500"
                onClick={()=>setVisible(true)} 
                />}
              </div>
            </div>
                <div className="768px:pt-[30px] 1024px:pt-[5px] pt-[10px] 768px:pl-[20px] pl-[5px] 1024px:w-[60%] 768px:w-[80%] w-[100%] 
                pb-[3px] 1350px:pb-0">
              <label
                
                className="block font-medium text-[#242424] 1350px:text-[11px]"
              >
                New Password :
              </label>
              <div className="mt-1 1024px:mt-0 relative w-full">
                <input
                  type={visible1?"text":"password"}
                  name="password"
                  
                  
                  placeholder="Enter new password***"
                  // value={password1}
                  // onChange={(e) => setPassword1(e.target.value)}
                  className="appearance-none block !w-[100%] px-3 py-2 1350px:py-[3px] border border-gray-300 rounded-md 
                  shadow-sm placeholder-gray-500 1350px:text-[10px]
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                 {server_error.password ? <p className='pt-[3px] font-[500] text-[12px] text-[red]'>{server_error.password[0]}</p>:""}
                {visible1? <AiOutlineEye 
                
                className="absolute right-3 top-2 1350px:text-[13px] text-[22px] cursor-pointer text-gray-500"
                onClick={()=>setVisible1(false)} 
                />  : <AiOutlineEyeInvisible 
                
                className="absolute right-3 top-2 1350px:text-[13px] text-[22px] cursor-pointer text-gray-500"
                onClick={()=>setVisible1(true)} 
                />}
              </div>
            </div>
                <div className="768px:pt-[30px] 1024px:pt-[5px] pt-[10px] 768px:pl-[20px] pl-[5px] 1024px:w-[60%] 768px:w-[80%] w-[100%] 
                pb-[20px] 1280px:pb-[10px] 1350px:pb-[5px]">
              <label
                
                className="block font-medium text-[#242424] 1350px:text-[11px]"
              >
                Confirm Password :
              </label>
              <div className="mt-1 1024px:mt-0 relative w-full">
                <input
                  type={visible2?"text":"password"}
                  name="password2"
                  
                  
                  placeholder="Confirm new password***"
                  // value={password2}
                  // onChange={(e) => setPassword2(e.target.value)}
                  className="appearance-none block !w-[100%] px-3 py-2 1350px:py-[3px] border border-gray-300 rounded-md 
                  shadow-sm placeholder-gray-500 1350px:text-[10px]
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                  {server_error.password2 ? <p className='pt-[3px] font-[500] text-[12px] text-[red]'>{server_error.password2[0]}</p>:""}
                {visible2? <AiOutlineEye 
                
                className="absolute right-3 top-2 1350px:text-[13px] text-[22px] cursor-pointer text-gray-500"
                onClick={()=>setVisible2(false)} 
                />  : <AiOutlineEyeInvisible 
                
                className="absolute right-3 top-2  1350px:text-[13px] text-[22px] cursor-pointer text-gray-500"
                onClick={()=>setVisible2(true)} 
                />}
              </div>
            </div>
            <button
                    type="submit"
                    className="mt-[10px] 1024px:mt-0 mb-[20px] 1024px:mb-[5px] 1350px:mb-0 768px:ml-[20px] ml-[10px] capitalize
                py-2 1024px:py-[4px] 768px:px-[12px] 1350px:text-[12px] px-[6px] border bg-[#2eaf03] text-white 
                768px:text-[17px] text-[16px] font-[500] 1500px:w-[25%] 1024px:w-[30%] 768px:w-[35%] w-[55%] rounded-md">
                    change password
                  </button>
                  </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const [placeOrder, setPlaceOrder] = useState([]);
  const orders = [
    {
      _id: "242353445wgdfghrret34535",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 1200,
      orderStatus: "Processing",
    },
  ];
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    { field: "name", headerName: "Order Name", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        if (params.data && params.data.status) {
          const status = params.data.status;
          console.log(status);
          return status === "Delivered" ? "greenColor" : "redColor";
        } else {
          return "defaultColor";
        }
      },
    },
    {
      field: "itemQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      feild: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
  const row = [];
  orders &&
    orders.forEach((i) => {
      row.push({
        id: i._id,
        name: i.orderItems[0].name,
        itemQty: i.orderItems.length,
        total: "Tk." + i.totalPrice,
        status: i.orderStatus,
      });
    });
  return (
    <div className="1024px:pl-8 pl-0 pt-1 768px:max-w-[98%] 768px:pl-2 1024px:w-full">
      {!placeOrder ? (
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableRowSelectionOnClick
          autoHeight
          responsiveLayout
        
        />
      ) : (
        <div className="1024px:pl-8 768px:pl-3 pl-1 pt-2">
          <div
            className="flex items-center 768px:gap-[10px] gap-[3px] rounded-md 
                     shadow-md shadow-[#f7d6ab] 1024px:px-2 px-1 py-1 1350px:w-[65%] 1024px:w-[90%]  w-[100%]"
          >
            <RiErrorWarningLine  className="text-[red] 768px:text-[30px] text-[18px] 1350px:text-[26px]" />
            <h4 className="text-[#242424] 768px:font-semibold font-[500] 1500px:text-[18px] 1350px:text-[14px]
            1024px:text-[16px] 768px:text-[15px] text-[14px]">
              <span className="text-[orangered]">
                No order has been made yet.
              </span>
               <span className="hidden 768px:inline"> Visit our shop and choice your best products.</span>
            </h4>
            <Link
              to={`/shop`}
              className="1500px:text-[18px] 1024px:text-[16px]  768px:text-[15px] text-[14px] 1350px:text-[13px]
                      font-[600]  768px:font-bold 768px:px-2 px-[5px] py-1 underline text-white bg-[orange]  border-none outline-none
                        rounded-md ml-[3px] 768px:ml-0"
            >
              Visit shop
            </Link>
          </div>
          <div className="768px:w-[95%] w-[100%]  overflow-hidden">
            <img src={o2} alt="" className="w-full 768px:h-[500px] 1350px:h-[350px] h-[280px] 768px:object-contain object-cover" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileContent;



