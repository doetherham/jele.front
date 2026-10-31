<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const email = ref('')
const password = ref('')
const gender = ref('')
const show = ref(false)
const error = ref('')

const emailOk = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
const passOk = computed(() => password.value.length >= 8)
const valid = computed(() => emailOk.value && passOk.value && gender.value)

async function submit() {
  const payload = { email: email.value, password: password.value, gender: gender.value }
  console.log('REQUEST /registration', payload)
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/registration`, payload, {
      headers: { Accept: 'application/json' },
    })
    console.log('RESPONSE /registration', data)
    localStorage.setItem('token', data.token)
    router.push('/profile')
  } catch (e) {
    console.error('ERROR', e.response?.data || e)
    error.value = e.response?.data?.message || 'Ошибка'
  }
}
</script>

<template>
  <form @submit.prevent="submit" style="max-width:320px;margin:40px auto;display:grid;gap:12px">
    <input v-model="email" type="email" placeholder="Email" />
    <small v-if="email && !emailOk" style="color:red">Некорректный email</small>

    <div style="display:flex;gap:6px">
      <input v-model="password" :type="show ? 'text' : 'password'" placeholder="Пароль" style="flex:1" />
      <button type="button" @click="show = !show">{{ show ? 'Скрыть' : 'Показать' }}</button>
    </div>
    <small v-if="password && !passOk" style="color:red">Минимум 8 символов</small>

    <select v-model="gender">
      <option value="" disabled>Пол</option>
      <option value="male">Мужской</option>
      <option value="female">Женский</option>
    </select>

    <button type="submit" :disabled="!valid">Зарегистрироваться</button>
    <small v-if="error" style="color:red">{{ error }}</small>
  </form>
</template>