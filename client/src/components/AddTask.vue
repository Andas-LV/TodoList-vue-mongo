<script setup>
import getCookie from "../cookies/getCookie.js";
import axios from "axios";
import { ref } from "vue";

const newTaskTitle = ref('');
const userId = getCookie('userId');
const token = getCookie('token');

const addTask = async () => {
  try {
    await axios.post(`http://localhost:5000/tasks/${userId}`, {
      title: newTaskTitle.value,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    newTaskTitle.value = '';
    console.log("Task added successfully");
  } catch (error) {
    console.error('Failed to add task:', error.response.data.message);
  }
};
</script>

<template>
  <div>
    <h2>Add Task</h2>
    <form @submit.prevent="addTask">
      <input type="text" placeholder="Task Title" v-model="newTaskTitle"/>
      <input type="text" placeholder="Task Description"/>
      <button type="submit">Add</button>
    </form>
  </div>
</template>
