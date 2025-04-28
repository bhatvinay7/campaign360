'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {useState} from 'react'
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import axios from 'axios';

const schema = z.object({
  role: z.string(),
  gmail: z.string().email("Invalid Gmail address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignUpForm() {
    const [response,setResponse]=useState<{message:string}>()
    const [errorResponse,setErrorResponse]=useState<{message:string}>()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async(data:any) => {
      try{
       
    const response=await axios.post('/api/admin',data)
    setResponse(response.data)
     }
      catch(error:any){
       setErrorResponse(error.response.data)
      }
      finally{
        setInterval(()=>{
            setResponse({message:""})
            setErrorResponse({message:""})
        },7000)
      }
  };

  return (
    <div className="flex border border-indigo-950/15 w-full items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-center">Update Youser Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-ful h-auto">
            <div className="w-full text-start mb-2">
                {response?.message && <p className="text-green-700">{response.message}</p> }
                {errorResponse?.message && <p className="text-red-700">{errorResponse?.message}</p> }
            </div>
           
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-0.5">
              <Label>Role</Label>
              <Input {...register("role")} placeholder="Enter your username" />
              {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
            </div>
            <div className="space-y-0.5">
              <Label>Gmail</Label>
              <Input type="email" {...register("gmail")} placeholder="Enter your Gmail" />
              {errors.gmail && <p className="text-red-500 text-sm">{errors.gmail.message}</p>}
            </div>
            <div className="space-y-0.5">
              <Label>Password</Label>
              <Input type="password" {...register("password")} placeholder="Enter your password" />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-700/75 text-gray-200">Update The Acess</Button>
          </form>
          </div>  
        </CardContent>
      </Card>
    </div>
  );
}
