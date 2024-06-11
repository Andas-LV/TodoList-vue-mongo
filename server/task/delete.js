const Task = require("../models/Task");
const User = require("../models/User");
require('dotenv').config();

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.taskId);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        const user = await User.findById(task.user);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Удаляем идентификатор задачи из массива задач пользователя
        user.tasks = user.tasks.filter(taskId => taskId.toString() !== req.params.taskId);
        await user.save();

        res.status(200).json({ msg: 'Task deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
