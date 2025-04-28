'use client'
import React from 'react'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useDispatch } from 'react-redux'
import {searchParam} from '@/lib/redux/searchParamsSlice'
export default function Suspance() {
  const dispatch=useDispatch()
  const searchParams=useSearchParams()
  useEffect(()=>{
    dispatch(searchParam({ userId:searchParams.get("userId") ,campaignId:searchParams.get("campaignId") }))
    },[])
  return (
     <>
     
     </>
  )
}
