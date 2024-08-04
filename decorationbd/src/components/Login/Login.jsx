import React, { useEffect, useState } from "react";
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import {FaFacebookSquare} from "react-icons/fa";
import styles from "../../Styles/Styles"
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import { useLoginUserMutation} from "../../Redux/UserAndAuthServices/userAuthApi";
import { getToken, storeToken } from "../../Redux/UserAndAuthServices/LocalStorageService";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../Redux/AuthAndUserSlice/authSlice";
const initialUser = {email:"",password:""};
const Login = () => {
    const [user,setUser] = useState(initialUser)
    const navigate = useNavigate();
    const [loginUser, { isLoading }] = useLoginUserMutation();
    const [server_error, setServerError] = useState({})
    const dispatch = useDispatch();
    // const [email,setEmail] = useState("");
    // const [password,setPassword] = useState("");
    const[visible,setVisible] = useState(false);
    const handleInputChange = ({ target }) => {
      const { name, value } = target;
      setUser((currentUser) => ({
        ...currentUser,
        [name]: value,
      }));
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const actualData = user;
      // console.log(actualData);
      const res = await loginUser(actualData)
      console.log(res);
      if (res.error) {
        // console.log(typeof (res.error.data.errors))
        // console.log(res.error.data.errors)
        if (res.error.data.errors.non_field_errors) {
          toast.error(res.error.data.errors.non_field_errors[0])
        }
        setServerError(res.error.data.errors)
      }
      if (res.data) {
        // console.log(typeof (res.data))
        // console.log(res.data)
        setServerError({})
        toast.success(res.data.msg)
        storeToken(res.data.token)
        let { access_token } = getToken()
        // console.log(access_token);
        dispatch(setUserToken({ access_token: access_token }))
        setUser(initialUser);
        // storeToken(res.data.token)
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
    }
      
      
    }
    let { access_token } = getToken()
    useEffect(() => {
      dispatch(setUserToken({ access_token: access_token }))
    }, [access_token, dispatch])
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center 1024px:justify-start py-12 sm:px-6 lg:px-8 1280px:py-10 1350px:py-6 300px:mx-2 768px:mx-0">
      <div className="sm:mx-auto sm:w-full sm:max-w-md ">
        <h2 className="mt-12 300px:mt-6 1024px:mt-[70px] 1280px:mt-0 text-center text-2xl 300px:text-3xl 1350px:text-[20px]
        font-extrabold text-gray-700">
          Login to DecorationBd
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md 1350px:w-[100%] 1350px:max-w-[350px]
      rounded-sm shadow shadow-[#212121]">
        <div className="bg-white py-8 px-4 1350px:py-5 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6 1350px:space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm 1350px:text-[12px] font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your email***"
                  value={user.email}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 1350px:py-1 border border-gray-300 rounded-md 
                  shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm 1350px:text-[10px]"
                />
                {server_error.email ? <p className='pt-[3px] font-[500] text-[12px] text-[red]'>{server_error.email[0]}</p>:""}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm 1350px:text-[12px] font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible?"text":"password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password***"
                  value={user.password}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 1350px:py-1 border border-gray-300 rounded-md 
                  shadow-sm placeholder-gray-400 
                  focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm 1350px:text-[10px]"
                />
                {visible? <AiOutlineEye 
               
                className="absolute right-2 top-2 cursor-pointer text-gray-500 text-[22px] 1350px:text-[16px]"
                onClick={()=>setVisible(false)} 
                />  : <AiOutlineEyeInvisible 
                
                className="absolute right-2 top-2 cursor-pointer text-gray-500 text-[22px] 1350px:text-[16px]"
                onClick={()=>setVisible(true)} 
                />}
                {server_error.password ? <p className='pt-[3px] font-[500] text-[12px] text-[red]'>{server_error.password[0]}</p>:""}
              </div>
            </div>
            <div className={`${styles.normal_flex} justify-between`}>
                <div className={`${styles.normal_flex}`}>
                    <input type="checkbox" name="remember-me" id="remember-me"
                    className="h-4 w-4 1350px:h-3 1350px:w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-gray-800 1350px:text-[12px]">
                        Remember me
                    </label>
                </div>
                <div className="text-sm 1350px:text-[12px]">
                    <Link to='/sendpasswordresetemail' className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
                        Forgot your password?
                    </Link>
                    
                </div>
            </div>
            <div className={`${styles.normal_flex} justify-between`}>
                <div className={`${styles.normal_flex}`}>
                     <button type="submit" className=" relative 768px:w-[180px] 1350px:w-[130px] 
                     w-[122px] 300px:w-[155px] h-[40px] 1350px:h-[32px] flex
                     py-2 1350px:py-[6px] 300px:px-4 px-2 border border-transparent text-sm 1350px:text-[11px]
                     font-medium rounded-md text-white
                     bg-[#d34836] hover:bg-[#d34836ea] ">Continue with <span className="absolute 
                     300px:right-3 right-1
                     300px:top-2 top-[10px] items-center"><FcGoogle className="300px:text-[18px] 1350px:text-[12px] text-[14px]"/></span></button>
                </div>
                <div>
                <button type="submit" className=" relative 768px:w-[180px] 1350px:w-[130px] 
                     w-[122px] 300px:w-[155px] h-[40px] 1350px:h-[32px] flex
                     py-2 1350px:py-[6px] 300px:px-4 px-2 border border-transparent text-sm font-medium rounded-md text-white 1350px:text-[11px]
                     bg-[#3b5998] hover:bg-[#3b5898e8] ">Continue with <span className="absolute 
                     300px:right-3 right-1
                     300px:top-2 top-[10px]  items-center "><FaFacebookSquare className="300px:text-[18px] text-[14px] 1350px:text-[12px]"/></span></button>
                </div>
            </div>
            <div>
                    <button type="submit" className="group relative w-full h-[40px] 1350px:h-[32px] flex justify-center 
                    py-2 1350px:py-[6px] px-4 border border-transparent text-md font-medium rounded-md text-white 1350px:text-[12px]
                    bg-[#f57224] hover:bg-[#d37742]  " onClick={handleSubmit}>Login</button>
                </div>
                <div className={`${styles.normal_flex} w-full`}>
                    <h4 className="1350px:text-[12px]">Not have any acccount?</h4>
                    <Link to="/signUp" className="text-blue-600 pl-2 1350px:text-[12px]">
                        Sign Up
                    </Link>
                </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
