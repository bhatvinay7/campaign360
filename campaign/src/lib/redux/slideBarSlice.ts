import { createSlice } from "@reduxjs/toolkit";
import  {RootState} from '@/lib/redux/store'

const initialState:slideBar={
    isWidowOpen:false,
    isProfileOpen:false
}

const slideBarSlice=createSlice({
    name:"slideBar",
    initialState,
    reducers:{
        ToggleSlideBar:(state,action)=>{
            state.isWidowOpen=!state.isWidowOpen
        },
        ToggleProfile:(state,action)=>{
            state.isProfileOpen=action?.payload ? false  :!state.isProfileOpen
        },
      
    }   
})

export const {ToggleSlideBar, ToggleProfile}=slideBarSlice.actions
export const sliseBarState = (state: RootState) :boolean=> state?.slideBar?.isWidowOpen;
export const profileState= (state: RootState) :boolean=> state?.slideBar?.isProfileOpen;
export default slideBarSlice.reducer