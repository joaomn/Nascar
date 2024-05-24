<template>
    <div>
      <h1>Dashboard</h1>
      <p>ID: {{ display }}</p>
      <div v-if="displayy">
        <p>Name: {{ displayy.name }}</p>
        <p>Description: {{ displayy.description }}</p>
        <!-- Adicione mais detalhes conforme necessário -->
      </div>
    </div>
  </template>
  
  <script>
  import axios from '../request/requests';
  
  export default {
    name: 'Dashboard',
    props: ['display'],
    data() {
      return {
        displayy: null
      };
    },
    async mounted() {
      await this.fetchDisplay();
    },
    methods: {
      async fetchDisplay() {
        try {
          const response = await axios.get(`/api/display/${this.display}`);
          this.displayy = response.data;
        } catch (error) {
          console.error('Erro ao buscar os detalhes do display:', error);
        }
      }
    }
  };
  </script>
  