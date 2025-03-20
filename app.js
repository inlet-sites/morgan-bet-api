import express from "express";
import compression from "compression";
import mongoose from "mongoose";
import cors from "cors";
import cron from "node-cron";
import getGames from "./fetchData/updateGames.js";

import {catchError} from "./HttpError.js";

import userRoutes from "./routes/user.js";
import mlbTeamRoutes from "./routes/mlbTeam.js";
import rankingGameRoutes from "./routes/rankingGame.js";

const app = express();
global.cwd = import.meta.dirname;

let mongoString = "mongodb://127.0.0.1/morganbet";
if(process.env.NODE_ENV === "production"){
    mongoString = `mongodb://website:${process.env.MONGODB_PASS}@127.0.0.1:27017/morganbet?authSource=admin`;
}
mongoose.connect(mongoString);

app.use(compression());
app.use(express.json());
app.use(cors());

userRoutes(app);
mlbTeamRoutes(app);
rankingGameRoutes(app);

app.use(catchError);

cron.schedule("0 9 * * *", getGames);

if(process.env.NODE_ENV !== "production"){
    app.listen(8000);
}
export default app;
