import express from "express";
import { request } from "http";
import mongoose from "mongoose";
import { Products } from "../Database/models/products";
import productTable from "../Database/schemas/productSchema";

const apiRouter: express.Router = express.Router();

// UserRegistation
apiRouter.post("/user",async(request:express.Request, response:express.Response)=>{
  try {
    let user={
      name:request.body.name,
      mobile:request.body.mobile,
      email:request.body.email,
      password:request.body.password  
    }
  } catch (error) {
    
  }
})

// delete product
apiRouter.post( "/products",
  async (request: express.Request, response: express.Response) => {
    try {
      let product = {
        name: request.body.name,
        image: request.body.image,
        price: request.body.price,
        qty: request.body.qty,
        info: request.body.info,
      };
      // product is exist or not
      let existProduct = await productTable.findOne({ name: product.name });
      if (existProduct) {
        response.status(401).json({
          msg: `Product is already existing`,
        });
      }
      // Create Product
      let newProduct = new productTable(product);
      product = await newProduct.save();
      response.status(200).json(product);
    } catch (error) {
      console.log(error);
      response.status(500).json(error);
    }
  }
);

// Update Product
apiRouter.put("/products/:productId",
  async (request: express.Request, response: express.Response) => {
    let { productId } = request.params;
    try {
      let updateProduct = {
        name: request.body.name,
        image: request.body.image,
        price: request.body.price,
        qty: request.body.qty,
        info: request.body.info,
      };
      // product is exist or not
      let product: Products | null = await productTable.findById(productId);
      if (!product) {
        return response.status(404).json({ msg: "Product is not exist?" });
      }
      // update product
      product = await productTable.findByIdAndUpdate(
        productId,
        {
          $set: {
            name: updateProduct.name ? updateProduct.name : product.name,
            image: updateProduct.image ? updateProduct.image : product.image,
            price: updateProduct.price ? updateProduct.price : product.price,
            qty: updateProduct.qty ? updateProduct.qty : product.qty,
            info: updateProduct.info ? updateProduct.info : product.info,
          },
        },
        { new: true }
      );
      return response.status(200).json(product);
    } catch (error) {
      if (error) {
        return response.status(404).json({ msg: "Not product is exist" });
      }
    }
  }
);

// get all products
apiRouter.get(
  "/products",
  async (request: express.Request, response: express.Response) => {
    try {
      let products: Products[] = await productTable.find();
      response.status(200).json(products);
    } catch (error) {
      console.log(error);
      response.status(500).json(error);
    }
  }
);

//get single product
apiRouter.get(
  "/products/:productId",
  async (request: express.Request, response: express.Response) => {
    let { productId } = request.params;
    try {
      let product: Products | null = await productTable.findById(productId);
      if (!product) {
        return response.status(404).json({ msg: "Product is not found" });
      }
      // get sngle product
      response.status(200).json({ product: product });
    } catch (error) {
      if (error) {
        return response.status(404).json({ msg: "Product Id is exist" });
      }
    }
  }
);
// delete product
apiRouter.delete("/products/:productId",async(request: express.Request, response: express.Response) => {
    let { productId } = request.params;
    try {
      let product: Products | null = await productTable.findById(productId);
      if (!product) {
        return response.status(404).json({ msg: "Product is not found" });
      }
      // delete product
      product=await productTable.findByIdAndRemove(productId);
      response.status(200).json(product);
    } catch (error) {
      if (error) {
        return response.status(404).json({ msg: "Product Id is exist" });
      }
    }
  }
);

export default apiRouter;
