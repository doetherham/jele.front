<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const profile = ref(null)

onMounted(async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/profile`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, Accept: 'application/json' },
  })
  console.log('RESPONSE /profile', data)
  profile.value = data
})
</script>

<template>
  <div style="max-width:320px;margin:40px auto" v-if="profile">
    <p>ID: {{ profile.id }}</p>
    <p>Email: {{ profile.email }}</p>
    <p>Gender: {{ profile.gender }}</p>
    <p>Created: {{ profile.created_at }}</p>
  </div>
</template>