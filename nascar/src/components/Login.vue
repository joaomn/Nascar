<template>
  <div class="container">
    <div v-if="showLogin" class="form-container">
      <form class="form" @submit.prevent="handleLogin">
        <div class="header">
          <img src="../assets/fundobrancologo.jpg" alt="" class="logo" />
          <h3>Acesse o portal: </h3>
        </div>

        <label>
          <span>Seu email</span>
          <input id="username" v-model="email" aria-describedby="username-help" />
        </label>

        <label>
          <span>Senha</span>
          <input type="password" name="password" v-model="password" />
        </label>

        <button class="submit">Login</button>
        
        <p>
          Não tem uma conta? <a href="#" @click.prevent="toggleForm('signup')">Cadastre-se</a>
        </p>
        <p>
          Esqueceu sua senha?
          <a href="#" @click.prevent="toggleForm('recover')">Recuperar senha</a>
        </p>
      </form>
    </div>

    <div v-else-if="showRecoverForm" class="form-container">
      <form class="form" @submit.prevent="handleRecoverPassword">
        <h1>Recuperar Senha</h1>
        <label>
          <span>Seu email</span>
          <input type="email" name="email" v-model="emailRecover" />
        </label>

        <button class="submit">Enviar</button>
        <p>
          Voltar para <a href="#" @click.prevent="toggleForm('login')">login</a>
        </p>
      </form>
    </div>

    <div v-else class="form-container">
      <form class="form" @submit.prevent="handleSignup">
        <h1>Cadastrar</h1>

        <label>
          <span>Nome: </span>
          <input type="text" v-model="name" />
        </label>
        <label>
          <span>Email: </span>
          <input type="email" name="email" v-model="email" />
        </label>

        <label>
          <span>Senha :</span>
          <input type="password" name="password" v-model="password" />
        </label>

        <button class="submit">Cadastrar</button>
        <p>Já tem uma conta? <a href="#" @click.prevent="toggleForm('login')">Faça login</a></p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import axios from '../request/requests';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';


export default {
  setup() {
    const showLogin = ref(true);
    const showRecoverForm = ref(false);
    const showSignUp = ref(false);
    const name = ref("");
    const email = ref("");
    const emailRecover = ref("");
    const password = ref("");
    const toast = useToast();
    const authStore = useAuthStore();
    const router = useRouter();

    const handleLogin = async () => {
      try {
        const response = await axios.post("/api/user/login", { email: email.value, password: password.value });
        authStore.setToken(response.data.token);
        authStore.setIsLoggedIn(true);
        localStorage.setItem('email', email.value);
        router.push('/perfil'); 
        toast.add({ severity: 'success', summary: 'Success Message', detail: 'Login bem-sucedido', life: 3000 });
      } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Erro no login', life: 3000 });
      }
    };

    const handleSignup = async () => {
      try {
        const response = await axios.post("/api/user", { name: name.value, email: email.value, password: password.value });
        toast.add({ severity: 'success', summary: 'Success Message', detail: 'Cadastrado com sucesso', life: 3000 });
        toggleForm('login');
      } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Erro no cadastro', life: 3000 });
      }
    };

    const toggleForm = (form) => {
      showLogin.value = form === 'login';
      showRecoverForm.value = form === 'recover';
      showSignUp.value = form === 'signup';
    };

    const handleRecoverPassword = async () => {
      try {
        await axios.post(`/api/user/${emailRecover.value}/password`);
        toast.add({ severity: 'success', summary: 'Success Message', detail: 'Email de recuperação enviado', life: 3000 });
        toggleForm('login');
      } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: 'Erro ao enviar email de recuperação', life: 3000 });
      }
    };

    return {
      showLogin,
      showRecoverForm,
      showSignUp,
      name,
      email,
      emailRecover,
      password,
      handleLogin,
      handleSignup,
      toggleForm,
      handleRecoverPassword,
    };
  },
};
</script>


<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #d6e0f09a;
}

.form-container {
  background: #e6f4f55b;
  box-shadow: 0 19px 38px black, 0 15px 12px rgba(0, 0, 0, 0.22);
  border-radius: 25px;
  width: 80%;
  margin: 0 10px;
  padding: 30px; 
}

form {
  padding: 0 20px; 
}

h1 {
  color: black;
  text-align: center;
  font-size: 30px;
  
}

label {
  display: block;
  margin: 25px auto 0; 
  width: 100%;
  text-align: center; 
}

label span {
  font-size: 14px;
  font-weight: 600;
  color: #505f75;
  text-transform: uppercase;
}

input {
  display: block;
  width: 100%;
  margin-top: 5px;
  font-size: 16px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(5, 5, 5, 0.4);
  text-align: center;
  height: 40px;
  
}

button {
  display: block;
  margin: 20px auto ;
  width: 100%;
  height: 36px;
  background-color: rgb(16, 97, 56);
  font-size: 20px;
  
}

button:hover {
  background-color: rgba(16, 97, 56, 0.699);
  font-size: 22px;
}

@media (min-width: 768px) {
  .form-container {
    width: 40%; /* Restaurado para 40% em telas maiores */
  }
}

.logo{
  width: 150px;
  height: 150px;
  min-width: auto;
  min-height: auto;
  position: inherit;
  bottom: 40px;
}

.header{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
