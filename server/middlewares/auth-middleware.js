import jwt from "jsonwebtoken"

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return res.json({ status: 401, message: "Unauthorized" })

    try {
        const decoded = jwt.verify(token, "Ganpat");
        req.user = decoded;
        next()
    } catch (error) {
        return res.json({ status: 401, message: "Unauthorized" })
    }
}

export default authenticate;