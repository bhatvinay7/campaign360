'use client'
import React from 'react'
import {useRouter} from 'next/navigation'
import {useState,useEffect} from 'react'
import { Menu } from 'lucide-react';
import { ToggleSlideBar } from "@/lib/redux/slideBarSlice";
import { useDispatch } from 'react-redux';
import { useSession, signIn, signOut } from "next-auth/react";
import SlideBarToggle from "@/component/slideBarToggle";
export default function Header() {
  const session=useSession()
  // const [isLogin,setIsLogin]=useState<boolean>(?true:false)
  const dispatch=useDispatch()
  const router=useRouter()
  
  return (
    <div className='w-full fixed z-[39] bg-slate-800 border-0 flex justify-between items-center h-16 sm:h-20'>
      <div className='flex w-fit items-center space-x-1.5'>
          <SlideBarToggle/>
      <div onClick={()=>{router.push('/')}} className='w-fit hover:cursor-pointer p-2 text-xl sm:text-xl font-bold text-white/75'>
      Campaign360
      </div>
      </div>
    
      <div className={` ${session?.data?.user?.email  ? "hidden":"block"} mr-2 flex space-x-1.5`}>
        <button onClick={()=>router.push('/signup')} className='rounded-sm hidden sm:block px-1.5 py-1 sm:px-2 sm:py-1.5 text-slate-900 border border-green-950/75 hover:bg-slate-300 bg-slate-300/60' type="button">Sign Up</button>
        <button onClick={()=>router.push('/signin')} className='rounded-sm  hidden sm:block px-1.5 py-1 sm:px-2 sm:py-1.5 text-slate-900 border border-green-950/75 hover:bg-slate-300 bg-slate-300/60' type="button">Sign In</button>
      </div>

        <div className='sm:hidden mr-2'>
         <Menu onClick={()=> dispatch(ToggleSlideBar(null))} className='w-7 h-7 text-gray-300 '></Menu>
        </div> 
    </div>
  )
}
