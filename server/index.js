import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors"
import router from "./routes/user.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(express.json())

app.use(cors({
    origin: "https://auth-project-gc.vercel.app",
    credentials: true
}))

app.use(cookieParser());

const port = process.env.SERVER_PORT || 4000;

app.use("/", router)

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})