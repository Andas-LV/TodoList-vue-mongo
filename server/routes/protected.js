require('dotenv').config();
const secret = process.env.SECRET;

exports.protectedPage = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Authentication failed" });
    }
    try {
        const payload = jwt.verify(token, secret);
        res.json({ message: `Hello, ${payload.username}! This is a protected route.` });
    } catch (error) {
        res.status(401).json({ message: "Authentication failed" });
    }
};
