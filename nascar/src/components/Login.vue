<template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="handleSubmit">
        <input type="text" v-model="username" placeholder="Nome de usuário">
        <input type="password" v-model="password" placeholder="Senha">
        <button type="submit">Entrar</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const username = ref('');
      const password = ref('');
      const router = useRouter();
  
      const handleSubmit = () => {
        // Autentique o usuário aqui (por exemplo, usando uma API)
        if (autenticaçãoBemSucedida) {
          router.push({ name: 'app' });
        } else {
          // Exibir mensagem de erro
        }
      };
  
      return {
        username,
        password,
        handleSubmit,
      };
    },
  };
  </script>