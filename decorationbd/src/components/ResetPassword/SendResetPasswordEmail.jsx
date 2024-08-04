import React, { useState } from 'react'
import { useSendPasswordResetEmailMutation } from '../../Redux/UserAndAuthServices/userAuthApi'
import { toast } from 'react-toastify'

const SendResetPasswordEmail = () => {
  const [server_error, setServerError] = useState({})
  // const [server_msg, setServerMsg] = useState({})
  const [sendPasswordResetEmail, { isLoading }] = useSendPasswordResetEmailMutation()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
    }
    const res = await sendPasswordResetEmail(actualData)
    if (res.error) {
      console.log(typeof (res.error.data.errors))
      console.log(res.error.data.errors)
      setServerError(res.error.data.errors)
      if(res.error.data.errors.non_field_errors){
        toast.error(res.error.data.errors.non_field_errors[0])
      }
    }
    if (res.data) {
      console.log(typeof (res.data))
      console.log(res.data)
      setServerError({})
      // setServerMsg(res.data)
      toast.success(res.data.msg)
      document.getElementById('password-reset-email-form').reset()
    }
  }
  return (
    <div className="w-full 300px:h-full 768px:h-[100vh]  flex !300px:justify-start 768px:justify-center">
    <div className='w-full  h-[200px] 300px:mt-[150px] 768px:mt-[100px] 300px:mb-[100px] 768px:mb-0'>
      <div className="p-[20px] rounded-[3px] shadow-md shadow-[#32ca00]  300px:w-[96%] 768px:w-[500px] mx-auto">
      <h1 className='font-[500] text-[23px] text-[#242424]'>Reset your password</h1>
      <form onSubmit={handleSubmit} id='password-reset-email-form'>
        <label className='font-[500] text-[13px] text-[rgba(0,0,0,0.8)] my-[10px] block'>
          Email :
        </label>
        <input type="email" name="email"  className='py-[10px] px-[30px] w-[95%] mx-auto 
        border-[1px] border-[rgba(0,0,0,0.5)] outline-none text-[12px] rounded-[5px]' placeholder='Enter your email...'/>
        {server_error.email ? <p className='pt-[3px] font-[500] text-[12px] text-[red]'>{server_error.email[0]}</p>:""}
        <button type="submit" className='border-none outline-none py-[5px] px-[10px]
        mt-[10px] w-[70px] text-[14px] text-center text-white font-[500] bg-[#32ca00] rounded-[10px]'>Send</button>
      </form>
      </div>
    </div>
    </div>
  )
}

export default SendResetPasswordEmail
