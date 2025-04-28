import {NextRequest,NextResponse} from 'next/server'
import { getServerSession } from "next-auth";
import User from '@/lib/model/client'
import auth from '@/lib/auth'
import { CustomError } from './customError/error';
const  middleware= async(req:NextRequest)=>{
    const session:user | null= await getServerSession(auth) 

    const user=await User.findOne({email:session?.user?.email})
    if(!session){
       
        throw new CustomError("unauthorized",401)
    }
       

    else if(session?.user?.role as string  !=="admin"){
     
        throw new CustomError("forbidden",403)
    }
    return NextResponse.next()

}
export {middleware}