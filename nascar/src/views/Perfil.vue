<template>

    <div class="shadow-7 card ">
      <DataTable :value="displays" paginator showGridlines :rows="5" tableStyle="min-width: 50rem">
        <template #header>
            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
                <span class="text-xl text-900 font-bold">Displays</span>
                <Button icon="pi pi-refresh" rounded raised />
            </div>
        </template>
        <Column field="name" header="Name" style="width: 50%"></Column>
       
        <Column field="token" header="Token" style="width: 50%"></Column>
        <Column   id="coluna botao" header=" ">
          <template #body="slotProps">
          <Button icon="pi pi-comment" class="shadow-7 border-none" text  severity="help" @click="openComent(slotProps.data)"/> 
          </template>
        </Column>
       
        <template #footer> Um total de  {{ displays ? displays.length : 0 }} displays. </template>
    </DataTable>
        
  </div>
</template>

<script>
import axios from '../request/requests';
export default {
  name: "Perfil",
  data() {
    return {
      displays: [],
      userId: ''
    };
  },
  async mounted() {
     await this.getUser(),
     this.getDisplays()
  },
  methods: {
   async getUser(){
    const email = localStorage.getItem('email');
    const user = await axios.get(`/api/user/email/${email}`)
    .then(resp =>{
      this.userId = resp.data.Message;
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
   }
    }
  
};
</script>
<style >
.table{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
