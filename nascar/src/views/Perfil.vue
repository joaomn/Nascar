<template>
<div>
  <Button label="Adicionar Display" icon="pi pi-check" @click="addDisplayModal = true" />
</div>
    <div  class="table">
      <DataTable :value="displays" paginator showGridlines :rows="5" tableStyle="min-width: 50rem;" >
        <template #header class="gap-5">
            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                <span class="text-xl text-900 font-bold">Displays</span>
                
            </div>
        </template>
        <Column field="name" header="Name" sortable ></Column>
        <Column field="description" header="Descrição" ></Column>
        <Column field="token" header="Token" ></Column>
        <Column field="active" header="Status" sortable ></Column>
        
       
        <template #footer> Um total de  {{ displays ? displays.length : 0 }} displays. </template>
    </DataTable>
        
  </div>

  <Dialog v-model:visible="addDisplayModal" :style="{ width: '450px' }" header="Adicionar Display" :modal="true"
  class="p-fluid">
  <div class="field">
      <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
              <i class="pi pi-user"></i>
          </span>
          <InputText placeholder="Nome" v-model="newDisplay.name" />
      </div>
  </div>
  <div class="field">
      <div class="p-inputgroup">
          <span class="p-inputgroup-addon">
              <i class="pi pi-envelope"></i>
          </span>
          <InputText placeholder="Descrição" v-model="newDisplay.description" />
      </div>
  </div>
  
  <template #footer>
      <Button label="Sair" icon="pi pi-times" @click="addDisplayModal = false" autofocus class="p-button-text" />
      <Button label="Salvar" icon="pi pi-check" @click="addDisplay(), addDisplayModal = false" />
  </template>
</Dialog>
</template>

<script>
import axios from '../request/requests';
import { useToast } from 'primevue/usetoast';
export default {
  name: "Perfil",
  data() {
    return {
      displays: [],
      userId: 1,
      addDisplayModal: false,
      newDisplay:{
        name: null,
        description: '',
        token:'',
        active: '',
        user:{ }

      }
    };
  },
  async mounted() {
     await this.getUser(),
     this.getDisplays()
     
  },
  setup(){
    const toast = useToast();
  },
  methods: {
   async getUser(){
    const email = localStorage.getItem('email');
    const user = await axios.get(`/api/user/email/${email}`)
    .then(resp =>{
      this.userId = resp.data.id;
      console.log(this.userId);
      console.table(resp.data);
    })
    .catch(er =>{
      console.log("errro");
    })
   },
   async getDisplays (){
    const userDisplayID = 1;
    const disp = await axios.get(`/api/display/user/${userDisplayID}`)
    .then(resp =>{
      this.displays = resp.data;
      console.log(resp.data);
    })
    .catch(er =>{
      console.log("errro");
    })
   },
   async addDisplay(){
    this.newDisplay.user.id = 1;
    await axios.post("/api/display", this.newDisplay)
    .then(resp =>{
      console.log(resp);
      this.$toast.add({ severity: 'success', summary: 'Success Message', detail: 'Display Adicionado com  Sucesso!', life: 5000 });
    })
    .catch(err =>{
      console.log(err);
      this.$toast.add({ severity: 'error', summary: 'Error Message', detail: 'Erro ao Tentar Salvar Display', life: 5000 });
    })
   }
    }
  
};
</script>
<style >
.table{
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 40%;
  width: 90%;
  height: 100%;
}


</style>
