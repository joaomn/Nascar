<template>
  <div class="container">
    <div v-if="showLogin" class="form-container">
      <form class="form">
        <h1>Logar</h1>

        <label>
          <span>Seu email</span>
          <input type="email" name="email" v-model="username" />
        </label>

        <label>
          <span>Senha</span>
          <input type="password" name="password" v-model="password" />
        </label>

        <button class="submit" @click="handleLogin">Login</button>
        <p>
          Não tem uma conta? <a href="#" @click="toggleForm">Cadastre-se</a>
        </p>
        <p>
          Esqueceu sua senha?
          <a href="#" @click="showRecoverForm = true">Recuperar senha</a>
        </p>
      </form>
    </div>

    <div v-else-if="showRecoverForm" class="form-container">
      <form class="form">
        <h1>Recuperar Senha</h1>
        <label>
          <span>Seu email</span>
          <input type="email" name="email" v-model="email" />
        </label>

        <button class="submit" @click="handleRecoverPassword">Enviar</button>
        <p>
          Voltar para <a href="#" @click="showRecoverForm = false">login</a>
        </p>
      </form>
    </div>

    <div v-else class="form-container">
      <form class="form">
        <h1>Cadastrar</h1>

        <label>
          <span>Seu email</span>
          <input type="email" name="email" v-model="username" />
        </label>

        <label>
          <span>Senha</span>
          <input type="password" name="password" v-model="password" />
        </label>

        <button class="submit" @click="handleSignup">Cadastrar</button>
        <p>Já tem uma conta? <a href="#" @click="toggleForm">Faça login</a></p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const showLogin = ref(true);
    const showRecoverForm = ref(false);
    const name = ref("");
    const email = ref("");
    const username = ref("");
    const password = ref("");

    const handleLogin = () => {
      // Autentique o usuário aqui (por exemplo, usando uma API)
      if (autenticaçãoBemSucedida) {
        router.push({ name: "app" });
      } else {
        // Exibir mensagem de erro
      }
    };

    const handleSignup = () => {
      // Implemente a lógica de cadastro de usuário aqui
    };

    const toggleForm = () => {
      showLogin.value = !showLogin.value;
    };

    const handleRecoverPassword = () => {
      // Implemente a lógica de recuperação de senha aqui
    };

    return {
      showLogin,
      showRecoverForm,
      name,
      email,
      username,
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
}

.form-container {
  background: #fff;
  box-shadow: 0 19px 38px black, 0 15px 12px rgba(0, 0, 0, 0.22);
  border-radius: 25px;
  width: 80%;
  margin: 0 10px;
  padding: 30px; /* Ajuste do espaçamento interno */
}

form {
  padding: 0 20px; /* Ajuste do espaçamento interno */
}

h1 {
  color: black;
  text-align: center;
  font-size: 30px;
}

label {
  display: block;
  margin: 25px auto 0; /* Ajuste do espaçamento superior */
  width: 100%;
  text-align: center; /* Centralização do texto */
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
  border-bottom: 1px solid rgba(109, 93, 93, 0.4);
  text-align: center;
  font-family: "nunito", sans-serif;
}

button {
  display: block;
  margin: 20px auto 0;
  width: 100%;
  height: 36px;
  border-radius: 30px;
  background-color: blue;
  font-size: 15px;
  cursor: pointer;
  color: #fff;
}

button:hover {
  background-color: red;
}

@media (min-width: 768px) {
  .form-container {
    width: 40%; /* Restaurado para 40% em telas maiores */
  }
}
</style>
