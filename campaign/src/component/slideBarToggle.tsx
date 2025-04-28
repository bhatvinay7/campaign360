'use client'
import React from 'react'
import { PanelLeftDashed } from 'lucide-react';
import {ToggleSlideBar,ToggleProfile,profileState} from '@/lib/redux/slideBarSlice'
import {useDispatch,useSelector} from 'react-redux'
export default function SlideBarToggle() {
    const dispatch=useDispatch()
    const value=useSelector(profileState)
  return (
    <div className=' ml-1.5 z-[39] hidden sm:block w-fit '>
      <div title="click to toggle slidebar">
        <PanelLeftDashed onClick={() =>{ dispatch(ToggleSlideBar(false)),
            value ? dispatch(ToggleProfile(false)):""
        }} className='w-6 h-6 text-gray-400' />
      </div>
    </div>
  )
}
