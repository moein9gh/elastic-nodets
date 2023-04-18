import express from "express";
import bodyParser from "body-parser";
import { searchRoutes } from "./routes/searchRoutes";

const app = express();
app.use(bodyParser.json());
app.use("/api", searchRoutes);

export { app };
