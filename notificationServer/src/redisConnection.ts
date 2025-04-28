import { Redis } from 'ioredis';
const redisSubscriber = new Redis(process.env.REDIS_URI as string);

const redispublisher = new Redis(process.env.REDIS_URI as string);

export {redisSubscriber,redispublisher}