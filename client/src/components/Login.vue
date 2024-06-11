<script setup>
import {onMounted, ref} from 'vue';
import axios from 'axios';
import setCookie from "../cookies/setCookie.js";
import getCookie from "../cookies/getCookie.js";

const username = ref('');
const password = ref('');

const handleSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:5000/login', {
      username: username.value,
      password: password.value,
    });
    // cookie
    const token = response.data.token;
    console.log('token =>', token);
    setCookie('token', token, 1);

    // userId
    const userId = response.data.userId;
    console.log("userId =>", userId);
    setCookie('userId', userId);

  } catch (error) {
    console.error('Login failed:', error.response.data.message);
  }
};

onMounted(() => {
  const token = getCookie("token");
  if (token) {
    console.log("token =>", token);
  }

  const userId = getCookie("userId");
  if (userId) {
    console.log("userId =>", userId);
  }
});
</script>

<template>
  <div>
    <h2>Login</h2>
    <form>
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
      <button type="submit" @click.prevent="handleSubmit">Login</button>
    </form>
  </div>
</template>

<style scoped>

</style>
