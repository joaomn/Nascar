<template>
  <div id="header" class="flex flex-wrap align-items-center justify-content-between gap-5 mb-3 p-3">
  <div class="notification">
    <div class="notiglow"></div>
    <div class="notiborderglow"></div>
    <div class="notititle mb-3">
      <span>
        <Avatar icon="pi pi-user" class="mr-2" size="large" style="background-color: #ece9fc; color: #2a1261" shape="circle" />
      </span>Usuario:  {{sessionUser.name }}</div>
    <div class="notibody"> Email: {{ sessionUser.email }}</div>
  </div>
<div>
  <Button label="Atualizar Cadastro" icon="pi pi-user-edit" severity="warning" raised style="padding: 8px; gap:8px;" @click="updateDisplayDialog = true" />
</div>
  
</div>
<!-- tabela de displays-->
    <div  class="table">
      <DataTable :value="displays" id="tabela" paginator showGridlines :rows="5" tableStyle="min-width: 50rem;" >
        <template #header class="gap-5">
            <div class="flex flex-wrap align-items-center justify-content-between gap-5 mb-3 p-3" >
                <span class="text-xl text-900 font-bold">Displays</span>
                <Button label="Adicionar Display" icon="pi pi-plus" severity="success" raised style="padding: 5px;gap: 5px;" @click="addDisplayModal = true" />
            </div>
        </template>
        <Column field="name"  class="p-3"id="coluna" header="Name" sortable ></Column>
        <Column field="description" id="coluna" header="Descrição" ></Column>
        <Column field="token" id="coluna" header="Token" ></Column>
        <Column field="active" id="coluna" header="Status" sortable ></Column>
        <Column id="colunabotao" header=" Açoes" style="padding: 20px">
          <template #body="slotProps">
              <Button label="Editar" id="botoes" icon="pi pi-user-edit" class="p-button-rounded p-button-warning"
                  style="border-radius: 10px;margin: 5 auto;max-width: 200px;
        padding: 8px;" @click="openEdit(slotProps.data)" />
              <Button label="Deletar" id="botoes" icon="pi pi-trash" class="p-button-rounded p-button-danger" style="border-radius: 10px;
        margin: 5 auto;
        max-width: 200px;
        padding: 8px;" @click="$event => deleteDialogbox(slotProps.data)" />
        <Button  id="botoes" icon="pi pi-chart-line" class="p-button-rounded p-button-info" style="border-radius: 10px;
        margin:  auto;
        max-width: 200px;
        padding: 3px;
        max-height: 38px;" @click="$event => deleteDialogbox(slotProps.data)" />
          </template>
      </Column>
        
       
        <template #footer >
          <div class="flex flex-wrap align-items-center justify-content-center p-3">
            Um total de  {{ displays ? displays.length : 0 }} displays.
          </div> 
           </template>
    </DataTable>
        
  </div>

 
<!--modal de adicionar um display-->
  <Dialog v-model:visible="addDisplayModal" :style="{ width: '650px' }" header="Adicionar Display" :modal="true"
  class="p-fluid">
  <template #header>
    <div class="inline-flex align-items-center justify-content-center gap-2">
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
<!--modald e delete do display-->
<Dialog v-model:visible="deleteDialog" :style="{ width: '650px' }" header="Deletar" :modal="true">

  <div class="textodelete">
      Tem Certeza que deseja excluir?
  </div>
  <div class="botaoDeletar">

      <Button label="Sair" icon="pi pi-times" style="background-color: #f2f2f2; width: 120px;height:45px ;"
          @click="deleteDialog = false" autofocus class="p-button-text" />
      <Button label="Deletar" icon="pi pi-trash"
          style="background-color: red;width: 120px;height:45px ;margin-left: 10px;"
          @click="deleteDisplay(pessoa.id), deleteDialog = false" />
  </div>
</Dialog>
<!-- modald e update do display-->
<Dialog v-model:visible="updateDisplayDialog" :style="{ width: '450px' }" header="Editar Cadastro" :modal="true"
        class="p-fluid">
        <div class="field">
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-user"></i>
                </span>
                <InputText placeholder="Nome" v-model="userUpdate.name" />
            </div>
        </div>
        <div class="field">
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-envelope"></i>
                </span>
                <InputText placeholder="Email" v-model="userUpdate.email" />
            </div>
        </div>
        <div class="field">
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    <i class="pi pi-phone"></i>
                </span>
                <Password v-model="userUpdate.password" toggleMask />
            </div>
        </div>
        <template #footer>
            <Button label="Sair" icon="pi pi-times" @click="updateDisplayDialog = false" autofocus class="p-button-text" />
            <Button label="Salvar" icon="pi pi-check" @click="updateUser(sessionUser.id), updateDisplayDialog = false" />
        </template>
    </Dialog>

    <!--MOdal de Update de display-->
    <Dialog v-model:visible="updateDisplayModal" :style="{ width: '650px' }" header="Adicionar Display" :modal="true"
    class="p-fluid">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
          <span class="font-bold white-space-nowrap">Amy Elsner</span>
      </div>
  </template>
      <div class="field">
          <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                  <i class="pi pi-user"></i>
              </span>
              <InputText placeholder="Nome" v-model="updateDisplayModel.name" />
          </div>
      </div>
      <div class="field">
          <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                  <i class="pi pi-envelope"></i>
              </span>
              <InputText placeholder="Descrição" v-model="updateDisplayModel.description" />
          </div>
      </div>
      <div class="field">
        <div class="p-inputgroup">
            <span class="p-inputgroup-addon" >
               Status: 
            </span>
            <ToggleButton v-model="updateDisplayModel.active" onLabel="Ativo" offLabel="Inativo" onIcon="pi pi-check" 
            offIcon="pi pi-times-circle" class="w-2 ml-3" aria-label="Do you confirm" />
        </div>
    </div>
    <template #footer>
        <Button label="Sair" icon="pi pi-times" @click="updateDisplayModal = false" autofocus class="p-button-text" />
        <Button label="Salvar" icon="pi pi-check" @click="updateDisplay(updateDisplayModel.id), updateDisplayModal = false" />
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
      },
      userUpdate:{
        name: null,
        password: null,
        email: null
      },
      updateDisplayModel:{
        name: null,
        description: '',
        active: '',
        user:{ }
      },
      deleteDialog: false,
      updateDisplayDialog: false,
      updateDisplayModal: false
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
   deleteDialogbox(data) {
    this.pessoa = { ...data }

    this.deleteDialog = true;

  },
  openEdit(data) {

this.updateDisplayModal = true;
this.updateDisplayModel = {...data};
},
async deleteDisplay(id) {
  await axios.delete("/api/display/" + id)
  .then(resp =>{
    this.$toast.add({ severity: 'secondary', summary: 'Sucesso', detail: 'Display Deletado com Sucesso', life: 8000 });
    this.getDisplays();
  })
  .catch(err =>{
    this.$toast.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao deletar display', life: 8000 });

  })
},
async updateUser(id){
  await axios.put("/api/user/" + id, {
    name: this.userUpdate.name,
    email: this.userUpdate.email,
    password: this.userUpdate.password,
  })
  .then(resp =>{
    this.$toast.add({ severity: 'success', summary: 'Success Message', detail: 'Cadastro Atualizado com sucesso!', life: 8000 });
    this.getUser();
  })
  .catch(err =>{
    this.$toast.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao Atualizar Cadastro', life: 8000 });
  })
},
async updateDisplay(id){
  this.updateDisplayModel.user.id = 1;
  await axios.put("/api/display/" + id, {
    name: this.updateDisplayModel.name,
    description: this.updateDisplayModel.description,
    active: this.updateDisplayModel.active
  })
  .then(resp =>{
    this.$toast.add({ severity: 'success', summary: 'Success Message', detail: 'Display Atualizado com sucesso!', life: 8000 });
    this.getDisplays();
  })
  .catch(err =>{
    this.$toast.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao Atualizar Display', life: 8000 });
  })
}
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
    box-sizing: content-box;
}
#tabela {
  display: block;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  padding: 2px;
  box-sizing: content-box;
  width: 100%;
  margin-left: 4rem;
  box-shadow: -10px 20px 20px 4px rgba(209, 212, 212, 0.801);
  padding-right: 10px;


}

#botoes {
  margin: 4px;
}

#coluna {
  padding: 2px;
  width: 10px;
  padding-right: 15px;
  box-sizing: content-box;
}
#colunabotao {
  display: flex;
  justify-content: end;
  border: solid black 5px;
  box-sizing: content-box;
  align-items: start;
  background-color: blueviolet;
  margin-right: 0;
}

.botaoDeletar {
  display: flex;
  align-items: end;
  justify-content: end;
  padding: 10px;
  margin: 2px;
}

.textodelete {
  display: flex;
  justify-content: flex-start;
  padding: 2px;
  margin-bottom: 20px;
  border-bottom: solid black 2px;

  font-weight: bolder;
}

.body-user{
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-start;
  width: 80%;
  padding: 20px;
  gap: 15px;
  
}
.notification {
  display: flex;
  flex-direction: column;
  isolation: isolate;
  position: relative;
  width: fit-content;
  height: 8rem;
  background: #d0d0db;
  border-radius: 1rem;
  overflow: hidden;
  font-size: 16px;
  margin: 20px;
  padding: 10px auto;
  --gradient: linear-gradient(to bottom, #053352, #3d83ff, #7e61ff);
  --color: #32a6ff
}

.notification:before {
  position: absolute;
  content: "";
  inset: 0.0625rem;
  border-radius: 0.9375rem;
  background: #75b3cf1c;
  z-index: 2
}

.notification:after {
  position: absolute;
  content: "";
  width: 0.25rem;
  inset: 0.65rem auto 0.65rem 0.5rem;
  border-radius: 0.125rem;
  background: var(--gradient);
  transition: transform 300ms ease;
  z-index: 4;
}

.notification:hover:after {
  transform: translateX(0.15rem)
}

.notititle {
  color: #0b0b1b;
  padding: 1.5rem 0.8rem 0.4rem 1.25rem;
  font-weight: 700;
  font-size: 1.9rem;
  transition: transform 300ms ease;
  z-index: 5;
  width: fit-content;
}

.notification:hover .notititle {
  transform: translateX(0.15rem)
}

.notibody {
  color: #0b0b1b;
  padding: 0 1.25rem;
  transition: transform 300ms ease;
  z-index: 5;
 
}

.notification:hover .notibody {
  transform: translateX(0.25rem)
}

.notiglow,
.notiborderglow {
  position: absolute;
  width: 20rem;
  height: 20rem;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle closest-side at center, white, transparent);
  opacity: 0;
  transition: opacity 300ms ease;
}

.notiglow {
  z-index: 3;
}

.notiborderglow {
  z-index: 1;
}

.notification:hover .notiglow {
  opacity: 0.1
}

.notification:hover .notiborderglow {
  opacity: 0.1
}

.note {
  color: var(--color);
  position: fixed;
  top: 80%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 0.9rem;
  width: 75%;
}

</style>
