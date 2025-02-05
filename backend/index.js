import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { connectDB } from "./db/db.js";
config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

import userRoutes from "./routes/index.js";

app.use("/api/v1", userRoutes);

connectDB()
   .then(() => {
      app.listen(port, () => {
         console.log("Server is listening on port at: ", port);
      });
   })
   .catch((err) => {
      console.log("Internal server error", err);
   });
