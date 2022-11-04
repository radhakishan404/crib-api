import express from "express";

const app = express();

import cribRoutes from "../features/crib/crib.route.js";

app.use("/", cribRoutes);

export default app;