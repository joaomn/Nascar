<template>
  <div class="header flex justify-content-center m-4">
    <h1>Dashboard </h1>

  </div>
      <div class="principalChart">
        <div class="card">
          <Chart type="line" :data="data" :options="options" class="h-30rem" />
        </div>
      </div>
      <div class="statusCharts flex justify-content-center">
        <div class="statusChart ">
          <div class="card">
            <span >Contagem de Status do tipo "Bom"</span>
            <Chart type="pie" :data="goodStatusData" :options="barOptions" class="w-full md:w-30rem" />
          </div>
          <div class="card">
            <span >Contagem de Status do tipo "Satisfatório"</span>
            <Chart type="pie" :data="satisfactoryStatusData" :options="barOptions" class="w-full md:w-30rem" />
          </div>
          <div class="card" >
            <span >Contagem de Status do tipo "Ruim"</span>
            <Chart type="pie" :data="badStatusData" :options="barOptions" class="w-full md:w-30rem" />
          </div>
        </div>
      </div>
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

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, TimeScale);
  export default {
    name: 'Dashboard',
    props: ['display'],
    data() {
      return {
        displayy: null,
        data: {},
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
          const response = await axios.get(`/api/display/${this.display}`);
          this.displayy = response.data;
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

        await axios.get(`/api/event/events?startDate=${formattedStartDate}&endDate=${formattedEndDate}&displayId=${this.display}`)
          .then(resp => {
            const labels = resp.data.map(item => item.date);
        const luminosity = resp.data.map(item => item.luminosity);
        const sound = resp.data.map(item => item.sound);
        const temperature = resp.data.map(item => item.temperature);
        
        const luminosityStatus = resp.data.map(item => item.luminosityStatus);
        const soundStatus = resp.data.map(item => item.soundStatus);
        const temperatureStatus = resp.data.map(item => item.temperatureStatus);

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
          })
          .catch(error => {
            console.error('Erro ao obter os dados:', error);
          });
      }
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
</style>
  