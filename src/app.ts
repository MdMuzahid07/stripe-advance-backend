import express, { Application, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import NotFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import router from "./app/routes";
import Stripe from "stripe";
import config from "./app/config";


const app: Application = express();
export const stripe = new Stripe(config.stripe_sk!);

// parsers
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5174", "http://localhost:3000"], credentials: true
}));
app.use(cookieParser());

// application routes
app.use("/api/v1", router);

// test route
app.get("/", (req: Request, res: Response) => {
  res.send("Server running");
});

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(NotFound);

export default app;
