const bcrypt = require("bcrypt");
const User = require("../models/User.js");
require('dotenv').config();

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ username, passwordHash, tasks: [] });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
};
