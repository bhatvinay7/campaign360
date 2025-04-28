import {createSlice} from '@reduxjs/toolkit'
import  {RootState} from '@/lib/redux/store'
const initialState:{message:string}={
    message:""
}

const responseSlice=createSlice({
     name:"response",
     initialState,
     reducers:{
        responseMessage:(state,action)=>{
            state.message=action.payload
        }
     }

})

export const {responseMessage} =responseSlice.actions
export const message=(state:RootState):string=>state?.response?.message
export default responseSlice.reducer