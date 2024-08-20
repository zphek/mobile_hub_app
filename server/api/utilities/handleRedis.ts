import { createClient } from "redis";

const client:any = createClient()
  .on('error', err => console.log('Redis Client Error', err))
  .connect();