import express from "express";
import morgan from "morgan";
import cors from "cors";
import Products from "./modals/productSchema.js";
import DefaultData from "./defaultData.js";
import router from "./routes/productRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());

app.use(express.json()); //body parser

app.use(cookieParser(""));

DefaultData();

app.use(router);

app.use(morgan("dev"));

export default app;
