import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/lib/model/client";
import bcrypt from "bcryptjs";
import connect from "@/lib/db";
import userAccountModel, { Account } from "@/lib/model/userAccount"

import jwt from "jsonwebtoken";
const authOption :NextAuthOptions ={
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        authorization: {
          params: {
            prompt: "select_account", // Ensures the UI appears
            access_type: "offline",
            response_type: "code",
          },
        },
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          await connect();
          if (credentials) {
            const email = credentials.email;
            const password = credentials.password;
        
            const user = await User.findOne({ email: email });
            if (!user) {
              throw new Error("Please sign up,user credentials are not found!");
            } else {
              const result = await bcrypt.compare(password, user.password);
              console.log(result);
              if (!result) {
                throw new Error("Incorrect password was entered");
              }
            }
            return {
              id: user._id.toString(),
              name: user.userName,
              email: user.email,
            };
         
          }
          throw new Error("user credentials are missing");
          
        },
      }),
    ],
  
    secret: process.env.NEXTAUTH_SECRET,
   
    callbacks: {
      async signIn({ account, profile }) {
      
        await connect();
        if (profile) {
          const email = profile?.email;
          const picture = (profile as { picture?: string })?.picture;
          const user = await User.findOne({ email: email });
  
          if (!user) {
            const newUser = await User.create({
              userName: profile.name,
              email: profile.email,
              picture: picture,
            });
                const newAccount = new userAccountModel({
                  user:newUser._id,
                  balance:0,
                  email:newUser.email,
                  Coins:0
              })
               await newAccount.save()

              

            
          }
          
        }
        return true;
      },
      async jwt({ token, account }) {
      
        await connect();
        // if (account) {
          const user = await User.findOne({ email: token?.email });
  
          token.accessToken = jwt.sign(
            { name: user.userName, email: user?.email,id:user._id,role:user?.userType },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: "30m" }
          );
  
          // Generate Refresh Token
          token.refreshToken = jwt.sign(
            { name: user.userName,id:user._id,email:user?.email,role:user?.userType },
            process.env.REFRESH_TOKEN_SECRET!,
            { expiresIn: "2d" }
          );
          const updateUser = await User.findByIdAndUpdate(user._id, {
            refreshToken: token.refreshToken,
          });
          return token;
        },
    async session({ session, token }: { session: any; token: any }) {
      // Attach token properties to the session object
      if (session?.user && token) {
        await connect();
        const user = await User.findOne({ email: session?.user?.email });
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.role=user.userType
      }
      return session;
    },
},
    pages: {
    signIn: "/signin", // Redirect to custom login page
    // signOut: "/signout", // Optional: Custom logout page
    error: "/signin", // Optional: Custom error page
  },
}  
  


export default authOption