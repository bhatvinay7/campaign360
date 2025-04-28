"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publisher = void 0;
var ioredis_1 = require("ioredis");
exports.publisher = new ioredis_1.Redis(process.env.Redis_URI);
// export const subscriber = new Redis(process.env.Redis_URI!)
// export const publisher = new Redis({
//   url:process.env.Redis_URI ,
//   token:process.env.Redis_Token ,
// })
// export const subscriber = new Redis({
//     url:process.env.Redis_URI ,
//     token:process.env.Redis_Token ,
//   })
