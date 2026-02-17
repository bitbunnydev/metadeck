import express from "express";
import cors from "cors";

const app = express();

//middleware
app.use(
  cors({
    origin: "", //Frontend URL
    credentials: true,
  }),
);
app.use(express.json());

//routes
app.use("/api/onepiece", onePieceRoutes);

export default app;
