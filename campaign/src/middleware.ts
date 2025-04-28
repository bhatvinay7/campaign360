import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt';
import redirect from  'next/navigation' 
import auth from '@/lib/auth' 
export async function middleware(req: NextRequest) {
   
    
    const token = await getToken({ req: req });
   
   
    if(!token){
        console.log("hii")
        return NextResponse.redirect(new URL('/signin', req.url))

    }
    const res = NextResponse.next()

  res.headers.set('Access-Control-Allow-Origin', '*') // Or set your domain
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.headers.set('Access-Control-Allow-Credentials', 'true')
  
  return res
}

export const config = {
    matcher:[ "/analytics", "/dashboard","/task","/campaign/:path*","/reward",],

  }

