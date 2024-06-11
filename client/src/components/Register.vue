<script setup>
import { ref } from 'vue';
import axios from 'axios';

const username = ref('');
const password = ref('');

const handleSubmit = async () => {
  try {
    await axios.post('http://localhost:5000/register', {
      username: username.value,
      password: password.value,
    });
    console.log('Register successful');
  } catch (error) {
    console.error('Register failed:', error.response.data.message);
  }
};
</script>

<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleSubmit">
      <input
          type="text"
          placeholder="Username"
          v-model="username"
      />
      <input
          type="password"
          placeholder="Password"
          v-model="password"
      />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<style scoped>

</style>