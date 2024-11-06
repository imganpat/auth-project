import express, { json } from "express";
import cors from "cors"
import router from "./routes/user.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true

}))

app.use(cookieParser());

const port = 3000;

app.use("/", router)

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})