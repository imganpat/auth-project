import dotenv from "dotenv";
import express, { json } from "express";
import cors from "cors"
import router from "./routes/user.js";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(express.json())

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(cookieParser());

app.use("/", router)

const port = process.env.PORT || 4000;

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}.`);
});
