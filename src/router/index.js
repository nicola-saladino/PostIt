import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Post from '../pages/Post.vue'
import { supabase } from '../lib/supabase'

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Post,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Protezione delle rotte
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
