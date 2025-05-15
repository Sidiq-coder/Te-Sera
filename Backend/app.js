import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import auth from "./src/modules/Auth/route.js"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

// const connect = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO);
//         console.log("Connected to mongoDB");
//     } catch (error) {
//         throw error;
//     }
// };

// mongoose.connection.on("disconnected", () => {
//     console.log("mongoDB disconnected");
// });

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());


app.use(auth);


app.listen(5000, () => {
    // connect();
    console.log("Connected to backend");
});