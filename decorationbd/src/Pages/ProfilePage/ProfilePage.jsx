import React, { useEffect, useState } from "react";
import Styles from "../../Styles/Styles";
import ProfileSidebar from "../../components/Profile/ProfileSidebar/ProfileSidebar.jsx";
import ProfileContent from "../../components/Profile/ProfileContent/ProfileContent.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetLoggedUserQuery } from "../../Redux/UserAndAuthServices/userAuthApi.js";
import {
  getToken,
  removeToken,
} from "../../Redux/UserAndAuthServices/LocalStorageService.js";
import { unSetUserToken } from "../../Redux/AuthAndUserSlice/authSlice.js";
import {
  setUserInfo,
  unsetUserInfo,
} from "../../Redux/AuthAndUserSlice/userSlice.js";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  const handleLogout = () => {
    dispatch(unsetUserInfo({ name: "", email: "" }));
    dispatch(unSetUserToken({ access_token: null }));
    removeToken();
    navigate("/login");
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { access_token } = getToken();
  console.log(access_token);
  const {
    data,
    isSuccess,
    refetch: profilerefetch,
  } = useGetLoggedUserQuery(access_token);
  // console.log(data)
  // console.log(data);
  // const customRequest = axios.create({
  //   baseURL: 'http://127.0.0.1:8000/api/user/',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    profile_picture: null,
  });
  const [isForm, setIsForm] = useState(false);
  const [billingAddressForm, setBillingAddressForm] = useState(false);
  const [shippingForm, setShippingForm] = useState(false);

  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        email: data.email,
        profile_picture: data.profile_picture,
      });

      // console.log(userData);
    }
  }, [data, isSuccess]);

  // Store User Data in Redux Store
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(
        setUserInfo({
          email: data.email,
          username: data.username,
        })
      );
    }
  }, [data, isSuccess, dispatch]);
  // useEffect(()=>{
  //   profilerefetch()
  // })
  return (
    <div>
      <div
        className={`1500px:${Styles.section} 1024px:w-[98%] 1280px:w-[96%] 1350px:w-[94%] w-[98%] flex bg-[#f5f5f5] py-2 1280px:mt-[20px] 1350px:mt-[10px] mt-[80px]`}
      >
        <div className="1500px:w-[335px] 1280px:w-[270px] w-[60px] 768px:w-[70px] 768px:ml-[10px] 300px:ml-[5px]">
          <ProfileSidebar
            active={active}
            setIsForm={setIsForm}
            setBillingAddressForm={setBillingAddressForm}
            setShippingForm={setShippingForm}
            setActive={setActive}
            handleLogout={handleLogout}
          />
        </div>
        <ProfileContent
          active={active}
          data={userData}
          isForm={isForm}
          setIsForm={setIsForm}
          billingAddressForm={billingAddressForm}
          setBillingAddressForm={setBillingAddressForm}
          shippingForm={shippingForm}
          setShippingForm={setShippingForm}
          profilerefetch={profilerefetch}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
