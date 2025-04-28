'use client';
import {useState,useEffect} from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import { useSelector } from 'react-redux';
import {profileState } from '@/lib/redux/slideBarSlice';
import axios from '@/lib/axios'
export default function ProfilePage() {
    const value=useSelector(profileState)
    const [profile,setProfile]=useState<{balance:number,coins:number}>({balance:0,coins:0})
    const session:any=useSession()
    console.log(session)
    useEffect(()=>{
       async function fetch(){
        const response=await axios.get('/api/profile')
        setProfile(response.data)
        console.log(response.data)
       }
       fetch()
    },[])
  return (
    <div className={`${value ?"block w-full sm:w-[280px]  opacity-100 sm:left-[250px] transion-all delay-300 ease-in  ":"invisible opacity-55 w-0 left-0 "} min-h-screen sm:max-h-screen shadow-lg bg-gray-100  h-full  absolute inset-0  z-[36]  `}>
      <div className="w-full h-full mx-auto ">
        <Card className="shadow-lg bg-gray-100 h-full border border-gray-200">
          <CardHeader className="bg-gray-100  rounded-t-2xl py-1.5">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Profile Overview
            </CardTitle>
          </CardHeader>

          <CardContent className="bg-gray-100 p-6 flex flex-col space-y-3">
                {session?.data?.user?.image as string &&
            <div className='relative flex justify-center w-full h-auto'>
                <Image
                src={`${session?.data?.user?.image}`}
                alt="user image"
                className='relative  rounded-full'
                width={50}
                height={50}
                ></Image>
            </div>
}
            <div className="space-y-1">
              <h2 className="text-base font-medium text-gray-700">Name</h2>
              <p className="text-gray-600">{session?.data?.user?.name}</p>
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-medium text-gray-700">Email</h2>
              <p className="text-gray-600">{session?.data?.user?.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                <h3 className="text-sm text-gray-500">Balance</h3>
                <p className="text-xl font-semibold text-gray-800">
                  ₹{profile?.balance}
             
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border text-center">
                <h3 className="text-sm text-gray-500">Coins</h3>
                <p className="text-xl font-semibold text-yellow-500">
                  
                    {profile?.coins}
                    </p>
              </div>
            </div>

            <div className="pt-6">
              <Badge variant="secondary" className="text-sm">
                Account Type:{session?.data?.user?.role}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
