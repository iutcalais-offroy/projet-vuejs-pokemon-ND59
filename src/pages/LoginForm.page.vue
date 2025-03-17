<template>
  <n-tabs v-model:value="activeTab">
    <n-tab-pane name="login" tab="Connexion">
      <n-form @submit.prevent="login">
        <n-form-item label="Email">
          <n-input v-model="loginForm.email" type="email" placeholder="Entrez votre email" />
        </n-form-item>
        <n-form-item label="Mot de passe">
          <n-input v-model="loginForm.password" type="password" placeholder="Entrez votre mot de passe" />
        </n-form-item>
        <n-button type="primary" @click="login">Se connecter</n-button>
      </n-form>
    </n-tab-pane>

    <n-tab-pane name="register" tab="Inscription">
      <n-form @submit.prevent="register">
        <n-form-item label="Email">
          <n-input v-model="registerForm.email" type="email" placeholder="Entrez votre email" />
        </n-form-item>
        <n-form-item label="Mot de passe">
          <n-input v-model="registerForm.password" type="password" placeholder="Entrez votre mot de passe" />
        </n-form-item>
        <n-form-item label="Confirmer le mot de passe">
          <n-input v-model="registerForm.confirmPassword" type="password" placeholder="Confirmez votre mot de passe" />
        </n-form-item>
        <n-button type="primary" @click="register">S'inscrire</n-button>
      </n-form>
    </n-tab-pane>
  </n-tabs>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';

const router = useRouter();
const activeTab = ref('login');
const loginForm = reactive({ email: '', password: '' });
const registerForm = reactive({ email: '', password: '', confirmPassword: '' });

const register = () => {
  if (registerForm.password !== registerForm.confirmPassword) {
    alert('Les mots de passe ne correspondent pas');
    return;
  }
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.find(user => user.email === registerForm.email)) {
    alert('Cet email est déjà utilisé');
    return;
  }
  users.push({ id: uuidv4(), email: registerForm.email, password: registerForm.password });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Compte créé avec succès ! Vous pouvez maintenant vous connecter.');
  activeTab.value = 'login';
};

const login = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(user => user.email === loginForm.email && user.password === loginForm.password);
  if (user) {
    localStorage.setItem('token', JSON.stringify({ email: user.email, id: user.id }));
    alert('Connexion réussie !');
    router.push('/deck-builder');
  } else {
    alert('Email ou mot de passe incorrect');
  }
};
</script>

<style scoped>
n-form {
  max-width: 400px;
  margin: auto;
}
</style>