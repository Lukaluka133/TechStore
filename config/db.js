import mongoose, { mongo, Mongoose } from "mongoose";

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { coonn: null, promise: null }
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn
    } 

    if (!cached.promise) {
        const opts = {
            bufferCommands:false
        }
        
        cached.promise = mongo.connect(`${process.env.MONGODB_URI}/TechStore`, opts).then( mongoose => {
            return mongoose
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}

export default connectDB