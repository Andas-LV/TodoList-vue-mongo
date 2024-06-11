const Task = require("../models/Task");
require('dotenv').config();

exports.read = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.params.userId });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
