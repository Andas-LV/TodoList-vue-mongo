const User = require("../models/User.js");
const Task = require("../models/Task");
require('dotenv').config();

exports.create = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const newTask = new Task({
            title: req.body.title,
            user: req.params.userId
        });
        const task = await newTask.save();

        user.tasks.push(task._id);
        await user.save();

        res.status(201).json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
