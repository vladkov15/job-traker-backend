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
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/vacancy-responses", {

})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("Error connecting to MongoDB", error));


app.use(cors());
app.use(bodyParser());


app.use(async (ctx, next) => {
  ctx.set("Content-Type", "application/json");
  await next();
});


app.use(jobRoutes.routes()).use(jobRoutes.allowedMethods());


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


