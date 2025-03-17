import { createRouter, createWebHistory } from 'vue-router';
import DeckCollection from './pages/DeckCollection.page.vue';
import DeckBuilder from './pages/DeckBuilder.page.vue';
import LoginFormPage from './pages/LoginForm.page.vue';

const routes = [
  { path: '/', component: LoginFormPage },
  { path: '/deck-builder', component: DeckBuilder },
  { path: '/deck-collection', component: DeckCollection, props: true },
  { path: '/login', component: LoginFormPage },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});