import { defineStore } from 'pinia';
export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: sessionStorage.getItem('isLoggedIn') === 'true', // Verifica se o usuário estava logado antes
    token: sessionStorage.getItem('token') || null,
  }),
  getters: {
    getToken() {
      return this.token;
    },
    getIsLoggedIn() {
      return this.isLoggedIn;
    },
  },
  actions: {
    setToken(token) {
      this.token = token;
      sessionStorage.setItem('token', token); // Armazena o token no localStorage
    },
    setIsLoggedIn(value) {
      this.isLoggedIn = value;
      sessionStorage.setItem('isLoggedIn', value); // Armazena o estado de login no localStorage
    },
  },
});