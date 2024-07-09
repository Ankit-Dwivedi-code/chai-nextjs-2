'use client'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"


function SignUpPage() {
  const router = useRouter()

  const [user, setUser] = useState({
      email: "",
      password : "",
      userName : ""
  })

  const [buttondisabled, setButtondisabled] = useState(false)

  const [loading, setLoading] = useState(false)

  const onSignup = async() =>{
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup", user)
      console.log("SignUp success", response.data);
      router.push('/login')

      
    } catch (error:any) {
      console.log("Signup Failed");
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.userName.length > 0) {
      setButtondisabled(false)
    }else{
      setButtondisabled(true)
    }
  }, [user])
  

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing..." : "Signup"}</h1>
      <hr />
      <label htmlFor="userName">username</label>
      <input id='userName' className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black' value={user.userName} onChange={(e)=> setUser({...user , userName : e.target.value})} placeholder='username' type="text" />
      <label htmlFor="email">email</label>
      <input id='email' className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black' value={user.email} onChange={(e)=> setUser({...user , email : e.target.value})} placeholder='email' type="email" />
      <label htmlFor="password">password</label>
      <input id='password' className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black' value={user.password} onChange={(e)=> setUser({...user , password : e.target.value})} placeholder='password' type="password" />
      <Button variant="secondary" onClick={onSignup}>{buttondisabled ? "Please fill the form" : "signup"}</Button>
    </div>
  )
}

export default SignUpPage
