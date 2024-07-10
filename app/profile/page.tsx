'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import IdPage from './[id]/page'


export default function ProfilePage() {
  const router = useRouter()
  const [data, setData] = useState("nothing")


  const getUserDetails = async ()=>{
    try {
      const res = await axios.post('/api/users/me')
      console.log(res.data.data);
      setData(res.data.data._id)
      
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message)
      
    }
  }

  const logout = async ()=>{
    try {
      await axios.get('api/users/logout')
      toast.success("Logout Success")
      router.push('/login')
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile Page</h1>
      <hr />
      <h2>{data === "nothing"? "Nothing" : <Link className='text-blue-500' href={`/profile/${data}`}>Follow this link {data}</Link>}</h2>
      <Button className='mt-4' onClick={logout}>Logout</Button>
      <Button className='bg-green-500 mt-4' onClick={getUserDetails}>Get User Details</Button>
    </div>
  )
}

 
