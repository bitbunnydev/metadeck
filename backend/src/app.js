import express from "express";
import cors from "cors";

const app = express();

//middleware
app.use(
  cors({
    origin: "",
    credentials: true,
  }),
);
app.use(express.json());

//routes

export default app;
