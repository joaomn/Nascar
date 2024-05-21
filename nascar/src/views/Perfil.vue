<template>
<div class="table">
  <Button label="Adicionar Display" icon="pi pi-check" @click="addDisplayModal = true" />
  
</div>
<Card>
  <template #content>

    {{sessionUser.name }}
      {{ sessionUser.email }}
  </template>
</Card>
    <div  class="table">
      <DataTable :value="displays" id="tabela" paginator showGridlines :rows="5" tableStyle="min-width: 50rem;" >
        <template #header class="gap-5">
            <div class="flex flex-wrap align-items-center justify-content-between gap-5 mb-3" >
                <span class="text-xl text-900 font-bold">Displays</span>
                
            </div>
        </template>
        <Column field="name" id="coluna" header="Name" sortable ></Column>
        <Column field="description" id="coluna" header="Descrição" ></Column>
        <Column field="token" id="coluna" header="Token" ></Column>
        <Column field="active" id="coluna" header="Status" sortable ></Column>
        <Column id="colunabotao" header="" style="padding: 20px">
          <template #body="slotProps">
              <Button label="Editar" id="botoes" icon="pi pi-user-edit" class="p-button-rounded p-button-warning"
                  style="border-radius: 10px;margin: 5 auto;max-width: 200px;
        padding: 8px;" @click="openEdit(slotProps.data)" />
              <Button label="Deletar" id="botoes" icon="pi pi-trash" class="p-button-rounded p-button-danger" style="border-radius: 10px;
        margin: 5 auto;
        max-width: 200px;
        padding: 8px;" @click="$event => deleteDialogbox(slotProps.data)" />
          </template>
      </Column>
        
       
        <template #footer> Um total de  {{ displays ? displays.length : 0 }} displays. </template>
    </DataTable>
        
  </div>

 

  <Dialog v-model:visible="addDisplayModal" :style="{ width: '650px' }" header="Adicionar Display" :modal="true"
  class="p-fluid">
  <template #header>
    <div class="inline-flex align-items-center justify-content-center gap-2">
        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
        <span class="font-bold white-space-nowrap">Amy Elsner</span>
    </div>
</template>

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
      sessionUser:[],
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
      this.sessionUser = resp.data;
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
      this.getDisplays();
    })
    .catch(err =>{
      console.log(err);
      this.$toast.add({ severity: 'error', summary: 'Error Message', detail: 'Erro ao Tentar Salvar Display', life: 5000 });
    })
   },
   deleteDialogbox(agenda) {
            this.pessoa = { ...agenda }

            this.deleteDialog = true;


        },
    }
  
};
</script>
<style scoped>
.table{
  display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2px;
    width: 90%;
    box-sizing: content-box;
    padding: 30px 40px 30px 40px;
}
#tabela {
  display: block;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  padding: 2px;
  box-sizing: content-box;
  width: 90%;
  margin-left: 4rem;
  box-shadow: -10px 20px 20px 4px rgba(209, 212, 212, 0.801);


}

#botoes {
  margin: 4px;
}

#coluna {
  padding: 2px;
  width: 10px;
  box-sizing: content-box;
}
#colunabotao {
  display: flex;
  justify-content: end;
  border: solid black 5px;
  box-sizing: content-box;
  align-items: start;
  background-color: blueviolet;


}


</style>
