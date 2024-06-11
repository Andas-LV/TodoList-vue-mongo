import getCookie from "../../cookies/getCookie.js";
import axios from "axios";

export const ReadTasks = async () => {
    const userId = getCookie('userId');
    const token = getCookie('token');

    try {
        const response = await axios.get(`http://localhost:5000/tasks/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        tasks.value = response.data;
    } catch (error) {
        console.error('Failed to fetch tasks:', error.response.data.message);
    }
};