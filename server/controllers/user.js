import jwt from "jsonwebtoken";
import userModel from '../models/user.js';
import database from "../config/database-config.js"


const greet = async (req, res) => {
    const { username, email } = req.user; //set by middelware

    res.json({ status: 200, username, email });
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

    const token = jwt.sign({ username: user.username, email }, "Ganpat", {
        expiresIn: "1h",
    });

    if (password !== user.password) {
        res.json({ status: 401, message: "Wrong password" })
        return
    }

    res.json({ status: 200, message: "Login successful", token: token })
}


const logoutUser = async (req, res) => {
    res.json({ status: 200, message: "Logout successful." })
}


export default { greet, registerUser, loginUser, logoutUser };