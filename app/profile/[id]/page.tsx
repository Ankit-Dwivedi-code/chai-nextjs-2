'use client'
import User from '@/models/userModel'
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


export default function IdPage({params} : any) {
  const [data, setData] = useState({
    userName: "",
    email : ""
  })
  const getUserDetails = async ()=>{
    try {
      const res = await axios.post('/api/users/me')
      console.log(res.data.data);
      setData(res.data.data)
      
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message)
      
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])
  

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile Page</h1>
      <h2 className='p-3 bg-green-500 rounded text-black'>This Id : {params.id} belongs to : </h2>
      <p className='p-3 mt-5 bg-gray-500 rounded text-white'>Name : {data.userName}</p>
      <p className='p-3 mt-2 bg-gray-500 rounded text-white'>EmailId : {data.email}</p>
    <Button className='mt-5'><Link href='/profile'>Back</Link></Button>
    </div>
  )
}


