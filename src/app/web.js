import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "../middleware/error-middleware.js";
import lessonRoute from "../routes/lesson-route.js";
import cors from "cors";

const web = express();
web.use(cookieParser());
web.use(express.json());
web.use(
  cors({
    origin: ["http://localhost:5173", "https://exame-web.vercel.app"], // allow for this url
    credentials: true, //to set cookie in localstorage , but postman didn need it
  })
);

web.use(lessonRoute);

web.use(errorMiddleware);

export default web;
