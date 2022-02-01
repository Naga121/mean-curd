import mongoose from "mongoose";

export interface Products extends mongoose.Document{
    _id?:string,
    name:string,
    image:string,
    price:string,
    qty:string,
    info:string,
    create_at?:string,
    update_at?:string 
} 
export interface User extends mongoose.Document {
    name:string,
    mobile:string,
    email:string,
    password:string
}

