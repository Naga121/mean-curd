import mongoose from "mongoose";
import { Products, User } from "../models/products";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    price: { type: String, required: true },
    qty: { type: String, required: true },
    info: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const productTable: mongoose.Model<Products> = mongoose.model(
  "product",
  productSchema
);

const userSchema=new mongoose.Schema({
  name:{type:String,required:true},
  mobile:{type:String,required:true},
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true},
});

const userTable:mongoose.Model<User>=mongoose.model(
  "user",userSchema
)


export default productTable;
