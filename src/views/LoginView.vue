<template>
  <div class="login-view">
    <div class="login-card">
      <div class="logo">🏥</div>
      <h2>Hospital Login</h2>
      <form @submit.prevent="handleLogin">
        <input 
          type="text" 
          placeholder="Username" 
          class="input" 
          v-model="username"
        />
        <input 
          type="password" 
          placeholder="Password" 
          class="input" 
          v-model="password"
        />
        <button type="submit" class="login-btn">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')

const handleLogin = () => {
  // Simpan status login ke localStorage
  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('username', username.value)
  
  // Redirect ke dashboard
  router.push('/')
}
</script>

<style scoped>
.login-view {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}
.login-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(25, 118, 210, 0.07);
  padding: 2.5rem 2rem;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo {
  font-size: 3rem;
  margin-bottom: 1rem;
}
h2 {
  color: #1976d2;
  margin-bottom: 2rem;
}
.input {
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: 6px;
  border: 1px solid #b0bec5;
  margin-bottom: 1.2rem;
  font-size: 1rem;
}
.login-btn {
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
}
.login-btn:hover {
  background: #1565c0;
}
</style> 