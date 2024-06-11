import axios from "axios";

export const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(`http://localhost:5000/tasks/${taskId}`);
        console.log('Task deleted successfully:', response.data);
    } catch (error) {
        console.error('Failed to delete task:', error.response.data.message);
    }
};