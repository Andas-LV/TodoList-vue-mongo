<template>
  <div>
    <h2>Protected Page</h2>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const props = defineProps({
  token: String || null,
});

const message = ref('');


const fetchProtectedData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/protected', {
      withCredentials: true,
    });
    message.value = response.data.message;
  } catch (error) {
    console.error('Authentication failed:', error.response.data.message);
  }
};

watch(() => props.token, fetchProtectedData);

onMounted(fetchProtectedData);
</script>
