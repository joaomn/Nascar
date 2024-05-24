<template>
  <div class="menu-body">
    <nav>
      <ul class="menu">
        <li class="menu-item">
          <RouterLink to="/" class="menu-link">
            <i class="pi pi-home" style="margin-right: 5px;"></i>
            <span class="menu-text">Home</span>
          </RouterLink>
        </li>
        <li class="menu-item" @click="displaySelect = true">
          <i class="pi pi-chart-line" style="margin-right: 5px;"></i>
          <span class="menu-text">Dashboard</span>
        </li>
        <li class="menu-item">
          <RouterLink to="/" class="menu-link">
            <i class="pi pi-sign-out" style="margin-right: 5px;"></i>
            <span class="menu-text">Log out</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
  <Dialog v-model:visible="displaySelect" :style="{ width: '850px' }" header="Adicionar Display" :modal="true"
    class="p-fluid">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <span class="font-bold white-space-nowrap titulo-modal">Escolha um Display</span>
      </div>
    </template>
    <DataTable :value="displays" id="tabela" paginator showGridlines :rows="5" tableStyle="min-width: 50rem;">
      
      
      <Column field="name"  id="coluna" header="Name" sortable></Column>
      <Column  id="coluna" header="Status" sortable>
        <template #body="slotProps">
          <span v-if="slotProps.data.active">
            <i class="pi pi-check" style="color: green;"></i>
            Ativo
          </span>
          <span v-else>
            <i class="pi pi-times" style="color: red;"></i>
            Inativo
          </span>
        </template>
      </Column>
      <Column id="colunabotao" header="" style="">
        <template #body="slotProps">
          <Button id="botoes" icon="pi pi-chart-line" class="p-button-rounded p-button-info" style="
          
        " @click="($event) => goToDashboard(slotProps.data)" />
        </template>
      </Column>

      <template #footer>
        <div class="flex flex-wrap align-items-center justify-content-center p-3">
          Um total de {{ displays ? displays.length : 0 }} displays.
        </div>
      </template>
    </DataTable>

  </Dialog>
</template>
<script>
import axios from "../request/requests";
import { useRouter } from 'vue-router';
export default {
  setup(){
    const router = useRouter();
  },
  async mounted() {
    await this.getUser(),
     this.getDisplays();
  },
  data() {
    return {
      displaySelect: false,
      displays: [],
      sessionUser: [],
    }
  },
  methods:{

    async getUser() {
      const email = localStorage.getItem("email");
      const user = await axios
        .get(`/api/user/email/${email}`)
        .then((resp) => {
          this.userId = resp.data.id;
          this.sessionUser = resp.data;
        })
        .catch((er) => {
          console.log("errro");
        });
    },
    async getDisplays() {
      const userDisplayID = 1;
      const disp = await axios
        .get(`/api/display/user/${userDisplayID}`)
        .then((resp) => {
          this.displays = resp.data;
          console.log(resp.data);
        })
        .catch((er) => {
          console.log("errro");
        });
    },
    goToDashboard(data){
      console.log(data.id);
      this.displaySelect = false;
      this.$router.push({ name: 'dashboard', params: {display: data.id } })
    }
  }
}
</script>

<style scoped>
.menu-body {
  background: #b8c7cc;
  display: flex;
  flex-direction: column;
  /* Alterado para coluna em telas menores */
  padding-top: 150px;
  /* Adaptação do padding para diferentes tamanhos de tela */

}

.menu {
  list-style: none;
  padding: 0;
}



.menu-item {
  background: #f0efee;
  border: none;
  padding: 10px 20px;
  display: flex;
  font-size: 15px;
  font-weight: 600;
  width: auto;
  text-transform: uppercase;
  cursor: pointer;
  transform: skew(-21deg);
  margin: 20px;
  box-shadow: -5px 4px 2px 1px rgb(26, 25, 25);


}

span {
  display: inline-block;
  transform: skew(21deg);
}

.menu-item::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  right: 100%;
  left: 0;
  background: rgba(196, 214, 236, 0.733);
  opacity: 0;
  z-index: -1;
  transition: all 0.5s;
}

.menu-item:hover {
  color: #fff;
}

.menu-item:hover::before {
  left: 0;
  right: 0;
  opacity: 1;
}

.menu-link {
  text-decoration: none;
  color: black;
  display: flex;
  justify-content: flex-start;
  /* Alterado para início flexível para melhor adaptação */
  align-items: center;
  /* Adicionado para alinhar os itens verticalmente */
}

.menu-link i {
  margin-right: 1px;
}

.menu-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  padding: 0;
}

@media (max-width: 768px) {
  .menu-body {
    padding-top: 10px;
    /* Ajuste adicional de padding para telas menores */
  }

  .menu-item {
    padding: 5px;
    /* Redução do padding para telas menores */
  }
}


</style>
