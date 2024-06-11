const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
require('dotenv').config();
const secret = process.env.SECRET;

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (await bcrypt.compare(password, user.passwordHash)) {
        const token = jwt.sign({ username }, secret, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: true });
        res.cookie('userId', user._id.toString(), { httpOnly: true, secure: true }); // Устанавливаем userId в куки
        return res.json({ message: "Authentication successful", token, userId: user._id.toString() });
    } else {
        return res.status(401).json({ message: "Authentication failed" });
    }
};
