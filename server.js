import express from "express";
import cors from "cors";
import "dotenv/config";
import { logger } from "logger-express";

import joyasRoute from "./routes/joyas.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(logger());
app.use("/joyas", joyasRoute);


app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});