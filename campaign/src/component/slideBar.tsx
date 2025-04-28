"use client";
import {
  Megaphone,
  LayoutDashboard,
  BarChart,
  LogOut,
  User,
  Wallet,
  LogIn,
  Trophy
} from "lucide-react";
import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { sliseBarState,ToggleProfile } from "@/lib/redux/slideBarSlice";
import { useSession, signIn, signOut } from "next-auth/react";
import {useRouter} from 'next/navigation'
export default function SlideBar() {
  const value = useSelector(sliseBarState);
  const dispatch=useDispatch()
  const session = useSession();
  const router=useRouter()
  return (
    <>
      <div
        className={` ${
          value ? " min-w-[250px] transition-all delay-500 ease-in " : " w-0 invisible"
        } hidden sm:block sticky top-0 border-r border-r-black/10 min-h-screen   bg-gray-100 `}
      >
        <div className="flex flex-col space-y-4 p-4  bg-gray-100 w-full min-h-screen h-auto ">
          <button
          onClick={()=>router.push('/campaign')}
            type="button"
            className="flex items-center space-x-2 p-2 hover:bg-white/75 rounded-2xl"
          >
            <Megaphone className="w-5 h-5 text-slate-600" />
            <span className="text-black/75">Campaign</span>
          </button>
          <button
             onClick={()=>router.push('/dashboard')}
            type="button"
            className="flex items-center space-x-2 p-2 hover:bg-white/75 rounded-2xl"
          >
            <LayoutDashboard className="w-5 h-5 text-slate-600" />
            <span className="text-black/75">Dashboard</span>
          </button>
          <button
           onClick={()=>router.push('/analytics')}
            type="button"
            className="flex items-center space-x-2 p-2 hover:bg-white/75 rounded-2xl"
          >
            <BarChart className="w-5 h-5 text-slate-600 " />
            <span className="text-black/75">Analytics</span>
          </button>

          <button
          onClick={()=>dispatch(ToggleProfile(null))}
            type="button"
            className={` ${session.data?.user ?"block":"hidden"} flex items-center space-x-2 p-2 hover:bg-white/75 rounded-2xl`}
          >
                    
            <User className="w-5 h-5 text-slate-600"></User>
            <span className="text-black/75">Profile</span>
          </button>

          <button
           onClick={()=>router.push('/reward')}
            type="button"
            className="flex items-center space-x-2 p-2 hover:bg-white/75 rounded-2xl"
          >
            <Trophy className="w-5 h-5 text-slate-600 " />
            <span className="text-black/75">Reward</span>
          </button>





          {session?.data?.user?.email && (
            <button
            onClick={()=>signOut()}
              type="button"
              className="flex items-center space-x-2 p-2 hover:bg-white/75 text-red-600/60 rounded-2xl"
            >
              <LogOut className="w-5 h-5 text-slate-600" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>

      <div
        className={`  " w-full p-1.5 z-[37]      border-0 sm:hidden  backdrop-blur-2xl  fixed bottom-12   max-h-3 transition-all delay-700 ease-in    `}
      >
        <div className="flex flex-row justify-evenly rounded-xl p-1 bg-blue-400/80 w-full  h-auto ">
          <button
           onClick={()=>{router.push('/campaign'),dispatch(ToggleProfile(true))}}
            type="button"
            className="flex flex-col  items-center space-x-2 p-1.5  rounded-2xl"
          >
            <Megaphone className="w-4 h-4 text-slate-100" />
            <span className="text-black text-[12px] ">Campaign</span>
          </button>
          <button
            type="button"
            onClick={()=>{router.push('/dashboard'),dispatch(ToggleProfile(true))}}
            className="flex flex-col items-center  space-x-2 p-1.5 rounded-2xl"
          >
            <LayoutDashboard className="w-4 h-4 text-slate-100" />
            <span className="text-black text-[12px] ">Dashboard</span>
          </button>
          <button
            type="button"
            onClick={()=>{router.push('/analytics'),dispatch(ToggleProfile(true))}}
            className="flex flex-col items-center  space-x-2 p-1.5  rounded-2xl"
          >
            <BarChart className="w-4 h-4 text-slate-100 " />
            <span className="text-black text-[12px] ">Analytics</span>
          </button>
          {/* <button type="button"  className="flex items-center space-x-2 p-2 hover:bg-white/75 text-red-600/60 rounded-2xl">
        <LogOut className="w-5 h-5 text-slate-600"  />
        <span>Logout</span>
      </button> */}
        </div>
      </div>
      <div
        className={`${
          value
            ? " h-fit  z-[40]  opacity-100 visible"
            : " h-0  opacity-10   invisible"
        } transition-all delay-700 ease-in w-full  sm:hidden  fixed  top-16 sm:top-20 p-1 flex flex-col space-y-3 pt-1   border-b border-b-slate-400/45`}
      >
        
        <div className=" w-full h-auto space-y-2 p-3 bg-slate-200 backdrop-blur-3xl rounded-md ">
        {session.data?.user?.email && (
          <div     onClick={()=>dispatch(ToggleProfile(false))}   className=" flex flex-row justify-start items-center hover:border-2 hover:border-blue-400/45 px-1.5 py-2 ml-1  space-x-1 group  hover:bg-white/75 rounded-2xl">
            <User className=" w-5 h-5 group-hover:text-indigo-950 text-gray-600"></User>
            <span className="text-black text-sm ">Profile</span>
          </div> )}
         
{session.data?.user?.email && (
            <div
            onClick={()=>{router.push('/reward'), dispatch(ToggleProfile(true))}}
            className="flex flex-row justify-base  items-center hover:border-2 hover:border-blue-400/45 px-1.5 py-2 space-x-1 ml-1 group   hover:bg-white/75 rounded-2xl">
              <Trophy className=" w-5 h-5 mb-0 group-hover:text-indigo-950 text-gray-600 " />
              <span className="text-black text-sm ">Reward</span>
            </div>
          )}
          {session.data?.user?.email && (
            <div
            onClick={()=>signOut()} 
            className="flex flex-row justify-base  items-center hover:border-2 hover:border-blue-400/45 px-1.5 py-2 space-x-1 ml-1 group   hover:bg-white/75 rounded-2xl">
              <LogOut className=" w-5 h-5 mb-0 group-hover:text-indigo-950 text-gray-600 " />
              <span className="text-black text-sm ">Log Out</span>
            </div>
          )}


          {!session.data?.user?.email && (
            <div
            onClick={()=>router.push('/signin')}
            className="flex flex-row  justify-start items-center border-2 border-blue-400/45 px-1.5 py-2 space-x-1  ml-1.5   hover:bg-white/75 rounded-2xl">
              <LogIn className=" w-5 h-5 mb-0 text-slate-600" />

              <span className="text-black text-sm ">Sign In</span>
            </div>
          )}
        </div> 
      </div>
    </>
  );
}
