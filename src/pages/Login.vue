<!-- Login.vue -->
<template>
  <div class="login-container">
    <div class="login-box">
      <h2>{{ isLogin ? 'Login' : 'Registrazione' }}</h2>
      <form @submit.prevent="handleSubmit">
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          required
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
        />
        <button type="submit" :disabled="loading">
          {{ loading ? 'Attendi...' : isLogin ? 'Login' : 'Registrati' }}
        </button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
      <p class="toggle" @click="isLogin = !isLogin">
        {{ isLogin ? 'Non hai un account? Registrati' : 'Hai già un account? Login' }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const email = ref('')
const password = ref('')
const error = ref(null)
const loading = ref(false)
const isLogin = ref(true)
const router = useRouter()

const handleSubmit = async () => {
  error.value = null
  loading.value = true

  try {
    let result

    if (isLogin.value) {
      result = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
      })
    } else {
      result = await supabase.auth.signUp({
        email: email.value,
        password: password.value
      })
    }

    const { data, error: err } = result

    if (err) throw err

    if (isLogin.value) {
      router.push('/')
    } else {
      alert('Registrazione avvenuta con successo! Controlla la tua email per confermare.')
      isLogin.value = true
    }
  } catch (err) {
    error.value = err.message || 'Errore durante l\'autenticazione'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
}

.login-box {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  width: 300px;
  text-align: center;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  padding: 0.5rem 1rem;
  background: #0077ff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button[disabled] {
  background: #aaa;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 1rem;
}

.toggle {
  margin-top: 1rem;
  color: #0077ff;
  cursor: pointer;
  font-size: 0.9rem;
}
</style>
