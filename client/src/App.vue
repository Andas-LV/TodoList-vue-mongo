<script setup>
import { ref } from 'vue';
import Register from "./components/Register.vue";
import Login from "./components/Login.vue";
import Protected from "./components/Protected.vue";
import getCookies from "./cookies/getCookie.js";
import AddTask from "./components/AddTask.vue";
import TaskList from "./components/TaskList.vue";
import refresh from "./components/hooks/refresh.js";

const token = ref(getCookies('token'));

const updateTokenFromCookies = () => {
  token.value = getCookies('token');
};

refresh(updateTokenFromCookies);
</script>

<template>
  <Login/>
  <Register/>
  <Protected :token="token"/>

  <AddTask/>
  <TaskList/>
</template>

<style scoped>

</style>
