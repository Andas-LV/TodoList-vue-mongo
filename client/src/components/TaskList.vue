<template>
  <div>
    <h2>Register Tasks</h2>
    <ul>
      <li v-for="task in tasks" :key="task._id">
        <span>{{ task.title }}</span>
        <button class="edit-btn" >
          Edit
        </button>

        <button class="delete-btn" @click="deleteTask(task._id)">
          🗑️
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import axios from 'axios';
import getCookie from "../cookies/getCookie.js";
import refresh from "./hooks/refresh.js";
import {deleteTask} from "./crud/DeleteTask.js";

const tasks = ref([]);

const ReadTasks = async () => {
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

onMounted(ReadTasks);
refresh(ReadTasks);
</script>

<style scoped>
.delete-btn {
  background-color: black;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.edit-btn {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
}
</style>
