import express from "express";
import compression from "compression";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
global.cwd = import.meta.dirname;

let mongoString = "mongodb://127.0.0.1/morganbet";
if(process.env.NODE_ENV === "production"){
    mongoString = `mongodb://webshite:${process.env.MONGODB_PASS}@127.0.0.1:27017/morganbet?authSource=admin`;
}
mongoose.connect(mongoString);

app.use(compression());
app.use(express.json());
app.use(cors());

if(process.env.NODE_ENV !== "production"){
    app.listen(8000);
}
export default app;
