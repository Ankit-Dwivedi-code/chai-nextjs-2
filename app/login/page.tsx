'use client'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Link from 'next/link'


function LoginPage() {
  const router = useRouter()

  const [user, setUser] = useState({
      email: "",
      password : "",
     
  })

  const [buttondisabled, setButtondisabled] = useState(false)

  const [loading, setLoading] = useState(false)

  const onLogin = async() =>{
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login", user)
      // console.log("Login success", response.data);
      router.push('/profile')

      
    } catch (error:any) {
      console.log("Signup Failed");
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 ) {
      setButtondisabled(false)
    }else{
      setButtondisabled(true)
    }
  }, [user])
  

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing..." : "Login"}</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input id='email' className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black' value={user.email} onChange={(e)=> setUser({...user , email : e.target.value})} placeholder='email' type="email" />
      <label htmlFor="password">password</label>
      <input id='password' className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black' value={user.password} onChange={(e)=> setUser({...user , password : e.target.value})} placeholder='password' type="password" />
      <Button variant="secondary" disabled={buttondisabled} onClick={onLogin}>{buttondisabled ? "Please fill the form" : "Login"}</Button>
      <Link className='text-blue-700 mt-3' href="/signup">Visit Signup Page</Link>

    </div>
  )
}

export default LoginPage
