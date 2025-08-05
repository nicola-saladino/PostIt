<!-- Login.vue -->
<template>
  <div class="login-container">

            <img src="../assets/logo.png" alt="Logo" class="login-logo" />



    <div class="login-box">

      <h2>{{ isLogin ? 'Login' : 'Registrazione' }}</h2>
      <form @submit.prevent="handleSubmit">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
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

const isValidPassword = (pwd) => {
  const hasUppercase = /[A-Z]/.test(pwd)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
  const hasMinLength = pwd.length >= 8
  return hasUppercase && hasSpecialChar && hasMinLength
}



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
      if (!isValidPassword(password.value)) {
        error.value = 'La password deve contenere almeno 8 caratteri, una maiuscola e un carattere speciale.'
        loading.value = false
        return
      }

      result = await supabase.auth.signUp({
        email: email.value,
        password: password.value
      })

      const { error: signUpError, data: signUpData } = result

   
        if (signUpError) {
        error.value = signUpError.message || 'Errore durante la registrazione'
        loading.value = false
        return
        }

        
// Prova a inserire l'email nella tabella custom `users`
const { error: insertError } = await supabase
  .from('users')
  .insert([{ email: email.value }])

if (insertError) {
  // Se l'inserimento fallisce per email duplicata
  if (insertError.message.includes('duplicate key')) {
    error.value = 'Questa email è già registrata. Prova a fare login.'
  } else {
    error.value = insertError.message || 'Errore durante la registrazione'
  }

  // Annulla la registrazione utente (opzionale: puoi anche eliminarlo da auth)
  loading.value = false
  return
}

alert('Registrazione avvenuta con successo! Controlla la tua email per confermare.')
isLogin.value = true



      alert('Registrazione avvenuta con successo! Controlla la tua email per confermare.')
      isLogin.value = true
    }

    if (isLogin.value && !result.error) {
      router.push('/')
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #2d2926;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
}



.login-box {
  position: relative;
  z-index: 10;
  background: #f8f9fa;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  width: 320px;
  text-align: center;
  color: #222222;
}



h2 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #4C585B;
}

input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #fff;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #4C585B;
  outline: none;
}

button {
  width: 70%;
  height: 40px; /* altezza fissa */
  padding: 0.4rem 0.75rem;
  background: #ffd670;
  color: black;
  border: none;
  border-radius: 8px;
  font-size: 24px; /* aumentato */
  font-weight: bold;
  font-family: "Indie Flower", cursive;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.3s;
}


button:hover:not([disabled]) {
  background: #ffc228;
}

button[disabled] {
  background: #aaa;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.toggle {
  margin-top: 1.5rem;
  color: black;
  background-color: #f7a58f;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px; /* aumentato */
  transition: background 0.3s;
    font-weight: bold;
  font-family: "Indie Flower", cursive;
  text-transform: uppercase;
  
}


.toggle:hover {
  background-color:#f07167 ;
}


.postit:hover {
  transform: scale(1.05) rotate(0deg);
  box-shadow: 4px 4px 12px rgba(0,0,0,0.3);
}


.login-logo {
  width: 200px;
  margin-bottom: 1rem;
  z-index: 10;
  position: relative;
}

.login-box h2{
    color: #222222;
}

</style>
