<template>
  <div class="header flex justify-content-between m-5">
    <h1>Dashboard de: {{displayy.name}}</h1>
    <div class="flex  gap-2">
      <Button label="Exportar" severity="help" icon="pi pi-file-export" raised @click="exportModal = true" />
      <Button label="Filtrar Data" severity="secondary" icon="pi pi-filter" raised @click="filtertModal = true" />
      <Button label="Atualizar" severity="warning" icon="pi pi-refresh" raised @click="reloadCharts" />
  
    </div>
   
  </div>
  <div class=" flex justify-content-center m-8" v-if="dataLoading">
    <div>

      <h1> Não há dados para este Display</h1>
    </div>
  </div>
  <div class="principalChart" v-if="!dataLoading">
    <div class="card ">
      <Chart type="line" :data="data" :options="options" class="h-30rem flex justify-content-center" />
    </div>
  </div>
  <div class="grid gap-8 justify-content-center" v-if="!dataLoading">
    
      <div class="col-12 md:col-8 lg:col-4">
        <span>Contagem de Status do tipo "Bom"</span>
        <Chart type="pie" :data="goodStatusData" :options="barOptions" class="w-full md:w-30rem" />
      </div>
      <div class="col-12 md:col-8 lg:col-6">
        <span>Contagem de Status do tipo "Satisfatório"</span>
        <Chart type="pie" :data="satisfactoryStatusData" :options="barOptions" class="w-full md:w-30rem" />
      </div>
      <div class="col-12 md:col-8 lg:col-8">
        <span>Contagem de Status do tipo "Ruim"</span>
        <Chart type="pie" :data="badStatusData" :options="barOptions" class="w-full md:w-30rem" />
      </div>
    
  </div>
  <!--exportModal-->
  <Dialog v-model:visible="exportModal" :style="{ width: '650px' }" header="Adicionar Display" :modal="true"
    class="p-fluid">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <span class="font-bold white-space-nowrap titulo-modal">Modal de Export CSV</span>
      </div>
    </template>
    
    <div class="field">
      <div class="p-inputgroup">
        
        <Calendar v-model="exportStartDate" placeholder="Data Inicial" class="p-inputgroup-addon" required showIcon showButtonBar />
      </div>
    </div>
    <div class="field">
      <div class="p-inputgroup">
        
        <Calendar id="calendar" v-model="exportEndDate" placeholder="Data Final" required showIcon class="p-inputgroup-addon" showButtonBar/>
      </div>
    </div>
    
    <template #footer>
      <Button label="Sair" severity="danger" icon="pi pi-times" @click="exportModal = false" 
        class="p-button-text" />
      <Button label="Enviar" icon="pi pi-check" severity="success" @click="sendExport(), (exportModal = false)
    " class="p-button-text" />
    </template>
  </Dialog>

  <!--filtertModal-->
  <Dialog v-model:visible="filtertModal" :style="{ width: '650px' }" header="Adicionar Display" :modal="true"
    class="p-fluid">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <span class="font-bold white-space-nowrap titulo-modal">Filtrar Datas do Grafico</span>
      </div>
    </template>
    
    <div class="field">
      <div class="p-inputgroup">
        
        <Calendar v-model="filterStartDate" placeholder="Data Inicial" class="p-inputgroup-addon"  required showIcon showButtonBar />
      </div>
    </div>
    <div class="field">
      <div class="p-inputgroup">
        
        <Calendar id="calendar" v-model="filterendDate" placeholder="Data Final" required showIcon class="p-inputgroup-addon"  showButtonBar/>
      </div>
    </div>
    
    <template #footer>
      <Button label="Sair" severity="danger" icon="pi pi-times" @click="filtertModal = false" 
        class="p-button-text" />
      <Button label="Enviar" icon="pi pi-check" severity="success" @click="getchartByFilterData(filterStartDate,filterendDate), (filtertModal = false)
    " class="p-button-text" />
    </template>
  </Dialog>
</template>
  
  <script>
  import axios from '../request/requests';
  import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { useToast } from "primevue/usetoast";

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, TimeScale);
  export default {
    name: 'Dashboard',
    props: ['display'],
    setup(){
      const toast = useToast();
    },
    data() {
      return {
        displayy: [],
        dataLoading: true,
        exportModal: false,
        exportStartDate: null,
        exportEndDate: null,
        filtertModal: false,
        filterStartDate: null,
        filterendDate: null,
        dateFormat: 'yy-mm-dd',
        data: {},
        displayID: '',
        startDate: null,
        endDate: null,
      statusData: {},
      goodStatusData: {},
      satisfactoryStatusData: {},
      badStatusData: {},
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day', // Ajuste isso conforme necessário
              tooltipFormat: 'yyyy-MM-dd HH:mm',
              
            },
            title: {
              display: true,
              text: 'Data'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Valor'
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              title: function(tooltipItems) {
                const date = tooltipItems[0].parsed.x;
                return 'Data e Hora: ' + new Date(date).toLocaleString('pt-BR');
              }
            }
          }
        }
      },
      barOptions: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: ''
            }
          },
          y: {
            title: {
              display: true,
              text: ''
            }
          }
        }
      },

    }
    },
    
    async mounted() {
      await this.fetchDisplay();
      this.getchartData();
    },
    methods: {
      async fetchDisplay() {
        try {
          const response = await axios.get(`/api/display/get-by-token/${this.display}`);
          this.displayID = response.data.id;
          this.displayy = response.data
        } catch (error) {
          console.error('Erro ao buscar os detalhes do display:', error);
        }
      },
      async getchartData(){
        
          
          const currentDate = new Date();
          const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        

        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() retorna o mês de 0 a 11
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };

        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);

        await axios.get(`/api/event/events?startDate=${formattedStartDate}&endDate=${formattedEndDate}&displayId=${this.displayID}`)
          .then(resp => {
            const labels = resp.data.map(item => item.date);
        const luminosity = resp.data.map(item => item.luminosity);
        const sound = resp.data.map(item => item.sound);
        const temperature = resp.data.map(item => item.temperature);
        
        

        const statusCounts = {
          luminosity: { good: 0, satisfactory: 0, bad: 0 },
          sound: { good: 0, satisfactory: 0, bad: 0 },
          temperature: { good: 0, satisfactory: 0, bad: 0 }
        };

        resp.data.forEach(item => {
          if (item.luminosityStatus === 'Bom') statusCounts.luminosity.good++;
          if (item.luminosityStatus === 'Satisfatorio') statusCounts.luminosity.satisfactory++;
          if (item.luminosityStatus === 'Ruim') statusCounts.luminosity.bad++;

          if (item.soundStatus === 'Bom') statusCounts.sound.good++;
          if (item.soundStatus === 'Satisfatorio') statusCounts.sound.satisfactory++;
          if (item.soundStatus === 'Ruim') statusCounts.sound.bad++;

          if (item.temperatureStatus === 'Bom') statusCounts.temperature.good++;
          if (item.temperatureStatus === 'Satisfatorio') statusCounts.temperature.satisfactory++;
          if (item.temperatureStatus === 'Ruim') statusCounts.temperature.bad++;
        });

        this.data = {
          labels,
          datasets: [
            {
              label: 'Luminosidade',
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              data: luminosity,
              fill: true
            },
            {
              label: 'Som',
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              data: sound,
              fill: true
            },
            {
              label: 'Temperatura',
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
              data: temperature,
            },
          ],
        };

        

        this.goodStatusData = {
          labels: ['Luminosidade', 'Som', 'Temperatura'],
          datasets: [
            {
              label: 'Bom',
              
              borderWidth: 1,
              data: [
                statusCounts.luminosity.good,
                statusCounts.sound.good,
                statusCounts.temperature.good
              ]
            }
          ]
        };

        this.satisfactoryStatusData = {
          labels: ['Luminosidade', 'Som', 'Temperatura'],
          datasets: [
            {
              label: 'Satisfatório',
             
              borderWidth: 1,
              data: [
                statusCounts.luminosity.satisfactory,
                statusCounts.sound.satisfactory,
                statusCounts.temperature.satisfactory
              ]
            }
          ]
        };

        this.badStatusData = {
          labels: ['Luminosidade', 'Som', 'Temperatura'],
          datasets: [
            {
              label: 'Ruim',
             
              borderWidth: 1,
              data: [
                statusCounts.luminosity.bad,
                statusCounts.sound.bad,
                statusCounts.temperature.bad
              ]
            }
          ]
        };
        this.dataLoading = false;
          })
          .catch(error => {
            console.error('Erro ao obter os dados:', error);
          });
      },
      async sendExport(){

        const formattedExportStartDate = this.formatDate(this.exportStartDate);
        const formattedExportendDate = this.formatDate(this.exportEndDate);
        this.$toast.add({
            severity: "contrast",
            summary: "Solicitação de Report recebida",
            detail: "Sua Solicitação será processada e em instantes respondida no seu email",
            life: 80000,
          });
        await axios.get(`/api/event/events/csv-generate?startDate=${formattedExportStartDate}&endDate=${formattedExportendDate}&displayId=${this.displayID}`)
        .then(() =>{
          this.$toast.add({
            severity: "success",
            summary: "CSV pronto",
            detail: "Confira sua caixa de email, seu CSV foi enviado",
            life: 10000,
          });
          this.restoreDatas();
        })
        .catch(()=>{
          this.$toast.add({
            severity: "error",
            summary: "Oops...",
            detail: "Houve algum problema com a geração do CSV, tente novamente mais tarde",
            life: 10000,
          });
        })
      },
      formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    reloadCharts(){
      this.getchartData();
    },
    restoreDatas(){
      this.exportStartDate = null
       this.exportEndDate = null
       this.filterStartDate= null
        this.filterendDate = null
    },
    async getchartByFilterData(start, end){
   

        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() retorna o mês de 0 a 11
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };

        const formattedStartDate = formatDate(start);
        const formattedEndDate = formatDate(end);

        await axios.get(`/api/event/events?startDate=${formattedStartDate}&endDate=${formattedEndDate}&displayId=${this.displayID}`)
          .then(resp => {
            const labels = resp.data.map(item => item.date);
        const luminosity = resp.data.map(item => item.luminosity);
        const sound = resp.data.map(item => item.sound);
        const temperature = resp.data.map(item => item.temperature);
        
        

        const statusCounts = {
          luminosity: { good: 0, satisfactory: 0, bad: 0 },
          sound: { good: 0, satisfactory: 0, bad: 0 },
          temperature: { good: 0, satisfactory: 0, bad: 0 }
        };

        resp.data.forEach(item => {
          if (item.luminosityStatus === 'Bom') statusCounts.luminosity.good++;
          if (item.luminosityStatus === 'Satisfatorio') statusCounts.luminosity.satisfactory++;
          if (item.luminosityStatus === 'Ruim') statusCounts.luminosity.bad++;

          if (item.soundStatus === 'Bom') statusCounts.sound.good++;
          if (item.soundStatus === 'Satisfatorio') statusCounts.sound.satisfactory++;
          if (item.soundStatus === 'Ruim') statusCounts.sound.bad++;

          if (item.temperatureStatus === 'Bom') statusCounts.temperature.good++;
          if (item.temperatureStatus === 'Satisfatorio') statusCounts.temperature.satisfactory++;
          if (item.temperatureStatus === 'Ruim') statusCounts.temperature.bad++;
        });

        this.data = {
          labels,
          datasets: [
            {
              label: 'Luminosidade',
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              data: luminosity,
              fill: true
            },
            {
              label: 'Som',
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              data: sound,
              fill: true
            },
            {
              label: 'Temperatura',
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
              data: temperature,
            },
          ],
        };

        

        this.goodStatusData = {
          labels: ['Luminosidade', 'Som', 'Temperatura'],
          datasets: [
            {
              label: 'Bom',
              
              borderWidth: 1,
              data: [
                statusCounts.luminosity.good,
                statusCounts.sound.good,
                statusCounts.temperature.good
              ]
            }
          ]
        };

        this.satisfactoryStatusData = {
          labels: ['Luminosidade', 'Som', 'Temperatura'],
          datasets: [
            {
              label: 'Satisfatório',
             
              borderWidth: 1,
              data: [
                statusCounts.luminosity.satisfactory,
                statusCounts.sound.satisfactory,
                statusCounts.temperature.satisfactory
              ]
            }
          ]
        };

        this.badStatusData = {
          labels: ['Luminosidade', 'Som', 'Temperatura'],
          datasets: [
            {
              label: 'Ruim',
             
              borderWidth: 1,
              data: [
                statusCounts.luminosity.bad,
                statusCounts.sound.bad,
                statusCounts.temperature.bad
              ]
            }
          ]
        };
        this.dataLoading = false;
          })
          .catch(error => {
            console.error('Erro ao obter os dados:', error);
          });
      },
    }
  };
  </script>

  <style scoped>

  .card {
    background: var(--surface-card);
    padding: 2rem;
    border-radius: 10px;
    margin-bottom: 1rem;
    width: auto;
    height: auto;
}

.custom-calendar .p-inputtext {
  height: 2rem; /* Ajuste a altura conforme necessário */
  padding: 0.5rem; /* Ajuste o preenchimento conforme necessário */
  font-size: 1rem; /* Ajuste o tamanho da fonte conforme necessário */
  border: 3px solid black;
}


.statusCharts {
 justify-content: center;
  display: grid;
  grid-template-columns: repeat(1, minmax(30rem, 1fr));
  gap: 1rem;
}

.statusChart {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
.border{
  border: 3px solid black;
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
  --color: #32a6ff;
}
Button{
  gap: 5px;
}
.notification:before {
  position: absolute;
  content: "";
  inset: 0.0625rem;
  border-radius: 0.9375rem;
  background: #75b3cf1c;
  z-index: 2;
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
  transform: translateX(0.15rem);
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
  transform: translateX(0.15rem);
}

.notibody {
  color: #0b0b1b;
  padding: 0 1.25rem;
  transition: transform 300ms ease;
  z-index: 5;
}

.notification:hover .notibody {
  transform: translateX(0.25rem);
}

.notiglow,
.notiborderglow {
  position: absolute;
  width: 20rem;
  height: 20rem;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle closest-side at center,
    white,
    transparent
  );
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
  opacity: 0.1;
}

.notification:hover .notiborderglow {
  opacity: 0.1;
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
  