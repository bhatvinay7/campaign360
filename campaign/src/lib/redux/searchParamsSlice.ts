import {createSlice} from '@reduxjs/toolkit'
import  {RootState} from '@/lib/redux/store'
const initialState:{ campaignId:string,userId:string}={
    campaignId:"",
    userId:""
}

const searchParamsSlice=createSlice({
     name:"searchParams",
     initialState,
     reducers:{
        searchParam:(state,action)=>{
            state.campaignId=action.payload.campaignId
            state.userId=action.payload.userId
        }
     }

})

export const {searchParam} =searchParamsSlice.actions
export const searchParamsValue=(state:RootState)=>state?.searchParams
export default searchParamsSlice.reducer