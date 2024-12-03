import Koa from "koa";
import Router from "koa-router";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "koa-bodyparser"; 
import jobRoutes from "./routes/jobRoutes";
import cors from '@koa/cors';

dotenv.config();


const app = new Koa();
const router = new Router();
const PORT = process.env.PORT || 4001;
const mongooseURI = process.env.MONGO_URI
if(mongooseURI){
  mongoose.connect(mongooseURI, {
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB", error));
}



app.use(cors());
app.use(bodyParser());


app.use(async (ctx, next) => {
  ctx.set("Content-Type", "application/json");
  await next();
});


app.use(jobRoutes.routes()).use(jobRoutes.allowedMethods());


app.listen(() => {
  console.log(`Server running  `);
});


