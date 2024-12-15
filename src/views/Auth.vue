<template>
    <div class="auth">
        <div class="auth-box">
            <h3>Admin Giriş</h3>
            <div class="auth-field">
                <div class="username">
                    <InputText v-model="username" placeholder="İsim" />
                </div>
                <div class="password">
                    <InputText v-model="password" type="password" placeholder="Şifre" @keyup.enter="handleLogin" />
                </div>
                <Button @click="handleLogin">Giriş Yap</Button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import AuthService from '../services/AuthService';
import { useRouter } from 'vue-router';

const router = useRouter();

const username = ref('');
const password = ref('');

const handleLogin = async () => {
    try {
        const token = await AuthService.login(username.value, password.value);
        console.log('Token:', token);
        if (token) {
            router.push('/');
        }
    } catch (error) {
        alert('Kullanıcı adı veya şifre hatalı!');
    }
};
</script>

<style scoped>
.auth {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.auth-field {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px
}

.auth-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border: 1px solid var(--p-content-border-color);
    gap: 10px;
    border-radius: 5px;
    transition: transform 0.3s;
}

.auth-box:hover {
    transform: scale(1.05);
}

.username,
.password {
    margin-bottom: 10px;
}
</style>