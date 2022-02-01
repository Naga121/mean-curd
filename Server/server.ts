import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import apiRouter from "./Router/apiRouter";

const app: express.Application = express();

// configurations
app.use(cors()); // CORS
dotenv.config({ path: "./.env" }); // for env variables
app.use(express.json()); // json from data

let hostName: string | undefined = process.env.HOST_NAME;
let port: number | undefined = Number(process.env.PORT);
let mongoDBURL: string | undefined = process.env.MONGODB_URL;

// MongoDB Connection
if (mongoDBURL) {
  mongoose
    .connect(mongoDBURL)
    .then((res) => {
      console.log(`Successfully connect MongoDb`);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1); // stop the node.js process
    });
}

// Router Configuration
app.use('/api/v1',apiRouter);


app.get("/", (request: express.Request, response: express.Response) => {
  response.status(200).json({
    msg: "server is Start for Big_Market App",
  });
});

if (port !== undefined && hostName !== undefined) {
  app.listen(port, hostName, () => {
    console.log(`Express Server is Started At :http://${hostName}:${port} `);
  });
}
