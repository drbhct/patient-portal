<template>
    <div class="row mt-5 mr-2 ml-2 justify-content-md-center">
        <div class="col-lg-5 mt-5">
            <section class="card card-featured mb-4">
                <div class="card-body">
                    <form @submit.prevent="login">
                        <span>
                            <h3 class="label">PORTAL LOGIN</h3>
                        </span>
                        <div class="form-group">
                            <label class="label f-weight-550">Email Address</label>
                            <input
                                type="email"
                                class="form-control form-control-sm"
                                required
                                v-model="loginForm.email"
                            />
                        </div>
                        <div class="form-group mb-4">
                            <label class="label f-weight-550">Password</label>
                            <input
                                type="password"
                                class="form-control form-control-sm"
                                required
                                v-model="loginForm.password"
                            />
                        </div>
                        <button type="submit" class="mb-1 mt-1 mr-5 btn btn-primary" :disabled="isSaving">
                            {{ isSaving ? 'Logging in...' : 'Login' }}
                        </button>
                        <router-link to="/account/forgotpassword" class="ml-3">
                            Need help logging in?
                        </router-link>
                    </form>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'
import { useToast } from 'vue-toastification'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const loginForm = ref({
    email: '',
    password: ''
})

const isSaving = ref(false)

const login = async () => {
    isSaving.value = true
    try {
        await authStore.login({
            userName: loginForm.value.email,
            password: loginForm.value.password
        })
        router.push('/')
    } catch (error) {
        toast.error('Login failed. Please check your credentials and try again.')
        console.error('Login error:', error)
    } finally {
        isSaving.value = false
    }
}
</script>
