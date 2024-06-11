<template>
  <div>
    <h2>Edit Task</h2>
    <form @submit.prevent="updateTask">
      <input type="text" v-model="updatedTaskTitle" placeholder="New Task Title">
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import getCookie from "../cookies/getCookie.js";

defineProps({
  taskId: String,

})

const updatedTaskTitle = ref('');
const userId = getCookie('userId');
const token = getCookie('token');

const updateTask = async () => {
  try {
    await axios.put(`http://localhost:5000/tasks/${taskId}`, {
      title: updatedTaskTitle.value,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("Task updated successfully");
    // Возможно, вы захотите перенаправить пользователя после успешного обновления
  } catch (error) {
    console.error('Failed to update task:', error.response.data.message);
  }
};
</script>
