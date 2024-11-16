import userModel from '../models/user.js';
import database from "../config/database-config.js"
import jwt from "jsonwebtoken";


const greet = async (req, res) => {
    const token = req.cookies["token"];
    if (!token) return;
    const { username, email } = jwt.verify(token, "Ganpat");
    res.json({ username, email });
}


const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    const user = new userModel({ username, email, password });
    await user.save();
    res.json({ status: 201, message: `Registeration successfully.` });
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel
        .findOne({ email })
        .catch((err) => {
            console.log(err);
        });

    if (!user) {
        res.json({ status: 404, message: "User not found." });
        return;
    }

    //i am only passing email and password so cannot use username 
    const token = jwt.sign({ username: user.username, email }, "Ganpat", {
        expiresIn: "1h",
    });

    if (password !== user.password) {
        res.json({ status: 401, message: "Wrong password" })
        return
    }

    res.cookie("token", token, {
        httpOnly: false,
        sercure: true,
        maxAge: 3600000,
    });

    res.json({ status: 200, message: "Login successful" })
}


const logoutUser = async (req, res) => {
    //logout user
    res.cookie("token", "", { expires: new Date(0) })
    res.json({ status: 200, message: "Logout successful." })
}


export default { greet, registerUser, loginUser, logoutUser };