import Redis from 'ioredis'
import dotenv from 'dotenv'
dotenv.config()
import { GoogleGenerativeAI } from "@google/generative-ai"
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string );
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const subscriber=  new Redis(process.env.Redis_URI!);

import  WebSocket from  "ws"


export {Redis,model,subscriber}

