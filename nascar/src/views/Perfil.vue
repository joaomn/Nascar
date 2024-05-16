<template>
  <div class="perfil">
    <div class="perfil-cabecalho">
      <img :src="fotoPerfil" alt="Foto de Perfil" class="foto-perfil" />
      <h2>{{ primeiroNome }} {{ ultimoNome }}</h2>
      <button @click="mostrarModalEdicao = true">Editar Perfil</button>
    </div>
    <div class="perfil-formulario">
      <h3>Displays</h3>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="display in displays" :key="display.id">
            <td>{{ display.nome }}</td>
            <td>{{ display.descricao }}</td>
            <td>{{ display.status }}</td>
            <td>
              <button @click="abrirDashboard(display)">Abrir Dashboard</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="adicionarDisplay" class="btn-adicionar-display">
        Adicionar Novo Display
      </button>
    </div>

    <!-- Modal de Edição de Perfil -->
    <div v-if="mostrarModalEdicao" class="modal">
      <div class="modal-conteudo">
        <span class="fechar" @click="mostrarModalEdicao = false">&times;</span>
        <h3>Editar Perfil</h3>
        <form @submit.prevent="salvarPerfil">
          <div class="grupo-formulario">
            <label>Nome</label>
            <input type="text" v-model="primeiroNomeEditado" />
          </div>
          <div class="grupo-formulario">
            <label>Sobrenome</label>
            <input type="text" v-model="ultimoNomeEditado" />
          </div>
          <div class="grupo-formulario">
            <label>Email</label>
            <input type="email" v-model="emailEditado" />
          </div>
          <div class="grupo-formulario">
            <label>Senha</label>
            <input type="password" v-model="senhaEditada" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Perfil",
  data() {
    return {
      fotoPerfil: "https://via.placeholder.com/150",
      primeiroNome: "John",
      ultimoNome: "Doe",
      empresa: "Hefesto",
      nomeUsuario: "johndoe",
      email: "john.doe@example.com",
      displays: [
        {
          id: 1,
          nome: "Display 1",
          descricao: "Descrição do Display 1",
          status: "Ativo",
        },
        {
          id: 2,
          nome: "Display 2",
          descricao: "Descrição do Display 2",
          status: "Inativo",
        },
        {
          id: 3,
          nome: "Display 3",
          descricao: "Descrição do Display 3",
          status: "Ativo",
        },
      ],
      mostrarModalEdicao: false,
      primeiroNomeEditado: "",
      ultimoNomeEditado: "",
      emailEditado: "",
      senhaEditada: "",
    };
  },
  methods: {
    salvarPerfil() {
      // Simulação de salvamento do perfil
      this.primeiroNome = this.primeiroNomeEditado;
      this.ultimoNome = this.ultimoNomeEditado;
      this.email = this.emailEditado;
      this.senha = this.senhaEditada;
      this.mostrarModalEdicao = false;
    },
    abrirDashboard(display) {
      // Lógica para abrir o dashboard do display selecionado
      console.log("Abrindo dashboard do display:", display.nome);
    },
    adicionarDisplay() {
      // Lógica para adicionar um novo display
      console.log("Adicionar novo display");
    },
  },
};
</script>

<style scoped>
/* Estilos para o modal */
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-conteudo {
  background-color: #fff;
  margin: 10px;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease;
}

.fechar {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.fechar:hover,
.fechar:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.grupo-formulario {
  margin-bottom: 15px;
}

.grupo-formulario label {
  display: block;
  margin-bottom: 5px;
}

.grupo-formulario input {
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: #f1f1f1;
}

button {
  background-color: #2980b9;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

.perfil {
  text-align: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  color: black;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-height: 100vh;
}

.perfil-cabecalho {
  margin-bottom: 20px;
}

.foto-perfil {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.perfil-formulario {
  text-align: left;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.btn-adicionar-display {
  background-color: #3498db;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  margin: 20px auto;
}

.btn-adicionar-display:hover {
  background-color: #2980b9;
}

@media (max-width: 600px) {
  .modal-conteudo {
    width: 90%;
    padding: 10px;
  }

  .grupo-formulario input {
    font-size: 14px;
  }

  button {
    padding: 8px 16px;
    font-size: 14px;
  }
}
</style>
