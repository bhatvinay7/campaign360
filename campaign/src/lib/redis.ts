import { Redis } from 'ioredis'

export const publisher = new Redis(process.env.Redis_URI!)

export const subscriber = new Redis(process.env.Redis_URI!)

// export const publisher = new Redis({
//   url:process.env.Redis_URI ,
//   token:process.env.Redis_Token ,
// })

// export const subscriber = new Redis({
//     url:process.env.Redis_URI ,
//     token:process.env.Redis_Token ,
//   })
  
