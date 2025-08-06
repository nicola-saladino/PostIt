<!-- Login.vue -->
<template>
  <div class="login-container">
    <!-- Left Side - Form -->
    <div class="login-form-section">
      <div class="form-container">
        <!-- Logo -->
        <div class="logo-section">
          <img src="../assets/logo.png" alt="Logo" class="login-logo" />
        </div>

        <!-- Form Header -->
        <div class="form-header">
          <h1 class="form-title">{{ isLogin ? 'Accedi' : 'Crea Account' }}</h1>
          <p class="form-subtitle" v-if="!isLogin">
            Già hai un account? 
            <button type="button" class="link-button" @click="toggleMode">Accedi</button>
          </p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="auth-form">
          <!-- Email Input -->
          <div class="input-group">
            <InputText
              v-model="email"
              type="email"
              placeholder="Indirizzo email"
              :class="{ 'p-invalid': emailError }"
              class="form-input"
              required
            />
            <small v-if="emailError" class="error-text">{{ emailError }}</small>
          </div>

          <!-- Password Input -->
          <div class="input-group">
            <Password
              v-model="password"
              placeholder="Password"
              :class="{ 'p-invalid': passwordError }"
              class="form-input"
              :feedback="false"
              toggleMask
              required
            />
            <small v-if="passwordError" class="error-text">{{ passwordError }}</small>
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            :label="loading ? 'Caricamento...' : isLogin ? 'Accedi' : 'Crea Account'"
            :loading="loading"
            class="submit-button"
            :disabled="loading"
          />

          <!-- Error/Success Messages -->
          <div v-if="error" class="message error-message">
            {{ error }}
          </div>

          <div v-if="successMessage" class="message success-message">
            {{ successMessage }}
          </div>
        </form>

        <!-- Terms (only for registration) -->
        <div v-if="!isLogin" class="terms-section">
          <p class="terms-text">
            Creando un account, accetti la nostra 
            <a href="#" class="terms-link">Privacy Policy</a> e i 
            <a href="#" class="terms-link">Termini di Servizio</a>.
          </p>
        </div>

        <!-- Toggle Login/Register -->
        <div v-if="isLogin" class="toggle-section">
          <p class="toggle-text">
            Non hai ancora un account? 
            <button type="button" class="link-button" @click="toggleMode">Registrati</button>
          </p>
        </div>
      </div>
    </div>

    <!-- Right Side - Post-it Wall -->
    <div class="illustration-section">
      <div class="postit-wall">
        <!-- Row 1 -->
        <div class="postit postit-yellow-1" style="--rotation: 3deg; --delay: 0s;">
          <div class="postit-text">💡 Idee creative</div>
        </div>
        <div class="postit postit-pink-1" style="--rotation: -5deg; --delay: 0.1s;">
          <div class="postit-text">✨ Design</div>
        </div>
        <div class="postit postit-blue-1" style="--rotation: 2deg; --delay: 0.2s;">
          <div class="postit-text">📝 Note</div>
        </div>
        <div class="postit postit-orange-1" style="--rotation: -3deg; --delay: 0.3s;">
          <div class="postit-text">🚀 Progetti</div>
        </div>
        <div class="postit postit-purple-1" style="--rotation: 4deg; --delay: 0.4s;">
          <div class="postit-text">🎯 Goals</div>
        </div>
        <div class="postit postit-green-1" style="--rotation: -2deg; --delay: 0.5s;">
          <div class="postit-text">🌟 Features</div>
        </div>

        <!-- Row 2 -->
        <div class="postit postit-teal-1" style="--rotation: -4deg; --delay: 0.6s;">
          <div class="postit-text">🏆 Success</div>
        </div>
        <div class="postit postit-yellow-2" style="--rotation: -1deg; --delay: 0.7s;">
          <div class="postit-text">✅ Tasks</div>
        </div>
        <div class="postit postit-pink-2" style="--rotation: 3deg; --delay: 0.8s;">
          <div class="postit-text">🎨 Arte</div>
        </div>
        <div class="postit postit-blue-2" style="--rotation: -3deg; --delay: 0.9s;">
          <div class="postit-text">📱 App ideas</div>
        </div>
        <div class="postit postit-orange-2" style="--rotation: 2deg; --delay: 1s;">
          <div class="postit-text">🔥 Trends</div>
        </div>
        <div class="postit postit-lime-1" style="--rotation: 5deg; --delay: 1.1s;">
          <div class="postit-text">🌱 Growth</div>
        </div>

        <!-- Row 3 -->
        <div class="postit postit-red-1" style="--rotation: -5deg; --delay: 1.2s;">
          <div class="postit-text">❤️ Love</div>
        </div>
        <div class="postit postit-purple-2" style="--rotation: 1deg; --delay: 1.3s;">
          <div class="postit-text">💻 Code</div>
        </div>
        <div class="postit postit-yellow-3" style="--rotation: -2deg; --delay: 1.4s;">
          <div class="postit-text">📊 Analytics</div>
        </div>
        <div class="postit postit-pink-3" style="--rotation: 4deg; --delay: 1.5s;">
          <div class="postit-text">🎪 Fun</div>
        </div>
        <div class="postit postit-blue-3" style="--rotation: -1deg; --delay: 1.6s;">
          <div class="postit-text">🌈 Colors</div>
        </div>
        <div class="postit postit-green-2" style="--rotation: 3deg; --delay: 1.7s;">
          <div class="postit-text">⚡ Speed</div>
        </div>

        <!-- Row 4 -->
        <div class="postit postit-indigo-1" style="--rotation: 6deg; --delay: 1.8s;">
          <div class="postit-text">🔮 Future</div>
        </div>
        <div class="postit postit-orange-3" style="--rotation: -4deg; --delay: 1.9s;">
          <div class="postit-text">🎵 Music</div>
        </div>
        <div class="postit postit-teal-2" style="--rotation: 2deg; --delay: 2s;">
          <div class="postit-text">📚 Learn</div>
        </div>
        <div class="postit postit-yellow-4" style="--rotation: -3deg; --delay: 2.1s;">
          <div class="postit-text">🎮 Games</div>
        </div>
        <div class="postit postit-pink-4" style="--rotation: 1deg; --delay: 2.2s;">
          <div class="postit-text">🍕 Food</div>
        </div>
        <div class="postit postit-blue-4" style="--rotation: -5deg; --delay: 2.3s;">
          <div class="postit-text">✈️ Travel</div>
        </div>

        <!-- Row 5 -->
        <div class="postit postit-purple-3" style="--rotation: 4deg; --delay: 2.4s;">
          <div class="postit-text">📸 Photo</div>
        </div>
        <div class="postit postit-green-3" style="--rotation: -2deg; --delay: 2.5s;">
          <div class="postit-text">💪 Sport</div>
        </div>
        <div class="postit postit-orange-4" style="--rotation: 3deg; --delay: 2.6s;">
          <div class="postit-text">☕ Coffee</div>
        </div>
        <div class="postit postit-yellow-5" style="--rotation: -4deg; --delay: 2.7s;">
          <div class="postit-text">🎭 Theatre</div>
        </div>
        <div class="postit postit-red-2" style="--rotation: 2deg; --delay: 2.8s;">
          <div class="postit-text">🎬 Cinema</div>
        </div>
        <div class="postit postit-teal-3" style="--rotation: -1deg; --delay: 2.9s;">
          <div class="postit-text">🌍 World</div>
        </div>

        <!-- Additional scattered post-its -->
        <div class="postit postit-lime-2" style="--rotation: 7deg; --delay: 3s;">
          <div class="postit-text">🎪 Magic</div>
        </div>
        <div class="postit postit-indigo-2" style="--rotation: -6deg; --delay: 3.1s;">
          <div class="postit-text">🚲 Bike</div>
        </div>
        <div class="postit postit-pink-5" style="--rotation: 5deg; --delay: 3.2s;">
          <div class="postit-text">🌸 Spring</div>
        </div>
        <div class="postit postit-blue-5" style="--rotation: -3deg; --delay: 3.3s;">
          <div class="postit-text">🏖️ Beach</div>
        </div>
        <div class="postit postit-yellow-6" style="--rotation: 4deg; --delay: 3.4s;">
          <div class="postit-text">🎉 Party</div>
        </div>
        <div class="postit postit-green-4" style="--rotation: -2deg; --delay: 3.5s;">
          <div class="postit-text">🌙 Night</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

const email = ref('')
const password = ref('')
const error = ref('')
const successMessage = ref('')
const loading = ref(false)
const isLogin = ref(true)
const emailError = ref('')
const passwordError = ref('')
const router = useRouter()

const isValidPassword = (pwd) => {
  const hasUppercase = /[A-Z]/.test(pwd)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
  const hasMinLength = pwd.length >= 8
  return hasUppercase && hasSpecialChar && hasMinLength
}

const validateForm = () => {
  emailError.value = ''
  passwordError.value = ''
  
  if (!email.value) {
    emailError.value = 'Email richiesta'
    return false
  }
  
  if (!password.value) {
    passwordError.value = 'Password richiesta'
    return false
  }
  
  if (!isLogin.value && !isValidPassword(password.value)) {
    passwordError.value = 'La password deve contenere almeno 8 caratteri, una maiuscola e un carattere speciale'
    return false
  }
  
  return true
}

const toggleMode = () => {
  isLogin.value = !isLogin.value
  error.value = ''
  successMessage.value = ''
  emailError.value = ''
  passwordError.value = ''
}

const handleSubmit = async () => {
  if (!validateForm()) return
  
  error.value = ''
  successMessage.value = ''
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

      const { error: signUpError } = result

      if (signUpError) {
        error.value = signUpError.message || 'Errore durante la registrazione'
        loading.value = false
        return
      }

      // Inserimento nella tabella users
      const { error: insertError } = await supabase
        .from('users')
        .insert([{ email: email.value }])

      if (insertError) {
        if (insertError.message.includes('duplicate key')) {
          error.value = 'Questa email è già registrata. Prova a fare login.'
        } else {
          error.value = insertError.message || 'Errore durante la registrazione'
        }
        loading.value = false
        return
      }

      successMessage.value = 'Registrazione avvenuta con successo! Controlla la tua email per confermare.'
      setTimeout(() => {
        isLogin.value = true
        successMessage.value = ''
      }, 3000)
      loading.value = false
      return
    }

    if (isLogin.value && !result.error) {
      successMessage.value = 'Login effettuato con successo!'
      setTimeout(() => {
        router.push('/')
      }, 1000)
    } else if (result.error) {
      error.value = result.error.message || 'Errore durante l\'autenticazione'
    }
  } catch (err) {
    error.value = err.message || 'Errore durante l\'autenticazione'
  } finally {
    loading.value = false
  }
}

// Pulisci errori quando l'utente cambia modalità
watch(isLogin, () => {
  error.value = ''
  successMessage.value = ''
  emailError.value = ''
  passwordError.value = ''
})
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  overflow: hidden;
}

.login-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  background: #2a2a2a;
  color: white;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
}

.login-form-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  max-width: 480px;
  height: 100vh;
  overflow: hidden;
}

.form-container {
  width: 100%;
  max-width: 360px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo-section {
  text-align: center;
  margin-bottom: 1.5rem;
}

.login-logo {
  width: 180px;
  height: auto;
  margin-bottom: 0.5rem;
}

.form-header {
  text-align: left;
  margin-bottom: 1.2rem;
}

.form-title {
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0 0 0.3rem 0;
  color: white;
}


.form-subtitle {
  color: #fff;
  font-size: 0.9rem;
  margin: 0;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-input {
  width: 100%;
}

.form-input :deep(.p-inputtext) {
  background: black;
  border: 2px solid #4a4a4a;
  border-radius: 8px;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  color: white;
  transition: all 0.3s ease;
}

.form-input :deep(.p-inputtext::placeholder) {
  color: #fff;
}

data-p{
  color: #fff;
}

.form-input :deep(.p-inputtext:focus) {
  border-color: #ffd670;
  box-shadow: 0 0 0 3px rgba(255, 214, 112, 0.1);
  background: #404040;
}

.form-input :deep(.p-password) {
  width: 100%;
}

.form-input :deep(.p-password .p-inputtext) {
  width: 100%;
  background: black;
  border: 2px solid #4a4a4a;
  border-radius: 8px;
  color: white;
}

.form-input :deep(.p-password .p-password-toggle-icon) {
  color: #fff;
}

.error-text {
  color: #ff6b6b;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.submit-button {
  width: 100%;
  padding: 0.875rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  background: #ffd670;
  border: none;
  color: #2a2a2a;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.submit-button:hover:not(:disabled) {
  background: #ffcc33;
  transform: translateY(-1px);
}

.submit-button:disabled {
  opacity: 0.6;
  transform: none;
}

.message {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.error-message {
  background: rgba(255, 107, 107, 0.1);
  color: #ff6b6b;
  border: 1px solid rgba(255, 107, 107, 0.2);
}

.success-message {
  background: rgba(78, 205, 196, 0.1);
  color: #4ecdc4;
  border: 1px solid rgba(78, 205, 196, 0.2);
}

.terms-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #404040;
}

.terms-text {
  color: #fff;
  font-size: 0.875rem;
  line-height: 1.4;
  margin: 0;
}

.terms-link {
  color: #ffd670;
  text-decoration: none;
}

.terms-link:hover {
  text-decoration: underline;
}

.toggle-section {
  margin-top: 2rem;
  text-align: center;
}

.toggle-text {
  color: #fff;
  font-size: 0.95rem;
  margin: 0;
}

.link-button {
  background: none;
  border: none;
  color: #ffd670;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  font-size: inherit;
  padding: 0;
}

.link-button:hover {
  text-decoration: underline;
}

.illustration-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #333;
  position: relative;
  overflow: hidden;
  padding: 1.5rem;
  min-height: 100vh;
}

.postit-wall {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.8rem;
  width: 100%;
  max-width: 600px;
  position: relative;
  max-height: 90vh;
  overflow: hidden;
}

.postit {
  width: 80px;
  height: 80px;
  position: relative;
  cursor: pointer;
  transform: rotate(var(--rotation));
  animation: fadeInPostit 0.6s ease-out var(--delay) both;
  transition: all 0.3s ease;
  box-shadow: 
    0 2px 4px rgba(0,0,0,0.1),
    0 4px 8px rgba(0,0,0,0.1);
}

.postit::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  border-radius: 2px;
  transform: translateZ(0);
}

.postit:hover {
  transform: rotate(0deg) scale(1.1);
  z-index: 10;
  box-shadow: 
    0 8px 16px rgba(0,0,0,0.2),
    0 12px 24px rgba(0,0,0,0.15);
}

.postit-text {
  position: relative;
  z-index: 2;
  padding: 0.5rem;
  font-size: 0.7rem;
  font-weight: 500;
  color: #333;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  line-height: 1.1;
}

/* Post-it Colors - Extended palette */
.postit-yellow-1, .postit-yellow-2, .postit-yellow-3, .postit-yellow-4, .postit-yellow-5, .postit-yellow-6 { background: #ffd670; }
.postit-pink-1, .postit-pink-2, .postit-pink-3, .postit-pink-4, .postit-pink-5 { background: #ff9ff3; }
.postit-blue-1, .postit-blue-2, .postit-blue-3, .postit-blue-4, .postit-blue-5 { background: #74b9ff; }
.postit-orange-1, .postit-orange-2, .postit-orange-3, .postit-orange-4 { background: #fdcb6e; }
.postit-green-1, .postit-green-2, .postit-green-3, .postit-green-4 { background: #55efc4; }
.postit-purple-1, .postit-purple-2, .postit-purple-3 { background: #a29bfe; }
.postit-red-1, .postit-red-2 { background: #fd79a8; }
.postit-teal-1, .postit-teal-2, .postit-teal-3 { background: #00cec9; }
.postit-lime-1, .postit-lime-2 { background: #81ecec; }
.postit-indigo-1, .postit-indigo-2 { background: #6c5ce7; }

/* Grid positioning - automatic flow for cleaner layout */
.postit:nth-child(n) { 
  margin: 0; /* Reset all margins for cleaner grid */
}

/* Add some random offsets for natural look */
.postit:nth-child(3n) { margin-top: 5px; }
.postit:nth-child(5n) { margin-left: 8px; }
.postit:nth-child(7n) { margin-top: -3px; }
.postit:nth-child(11n) { margin-left: -5px; }

@keyframes fadeInPostit {
  from {
    opacity: 0;
    transform: rotate(var(--rotation)) translateY(20px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: rotate(var(--rotation)) translateY(0) scale(1);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .illustration-section {
    display: none;
  }
  
  .login-form-section {
    max-width: none;
    padding: 2rem;
  }
  
  .login-logo {
    width: 160px;
  }
}

@media (max-width: 768px) {
  .login-form-section {
    padding: 1rem;
  }
  
  .form-container {
    max-width: 100%;
  }
  
  .form-title {
    font-size: 1.4rem;
  }
  
  .login-logo {
    width: 140px;
  }
}

@media (max-width: 480px) {
  .login-logo {
    width: 120px;
  }
  
  .form-title {
    font-size: 1.3rem;
  }
}
</style>