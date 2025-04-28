import {NextResponse,NextRequest} from 'next/server'
import User from '@/lib/model/client'
import connect from '@/lib/db'
import z from 'zod'
import bcrypt from 'bcrypt';

export async function POST(req:NextRequest){
    try{
   await connect()
   
   const {role,gmail,password}=await req.json()
  const schema=z.object({
    gmail: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role:z.string()
  })

  const result=schema.safeParse({role,gmail,password})

  if(!result.success){
    return NextResponse.json({message:result.error.format()},{status:400})
  }
  const user= await User.findOne({email:gmail})
  const updatedUser = await User.findByIdAndUpdate(user._id,  { $set: { userType: "admin" } },  { new: true }  );
  if(user){

  
  bcrypt.compare(password,user.password,async(err, result)=> {
    
     if(result){

       
        return NextResponse.json({message:"Access granted"},{status:201})
        return
     }
     else{
        return NextResponse.json({message:"User credentials are not valid"},{status:400})
     }
});
return NextResponse.json({message:"Access granted"},{status:201})

  }
  else{
    return NextResponse.json({message:"User does not exists"},{status:400})
  }
}
catch(error:any){
    return NextResponse.json({message:error.message},{status:500})
}

}


