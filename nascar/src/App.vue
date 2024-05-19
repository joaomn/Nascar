<script setup>
import BarraSuperior from './components/BarraSuperior.vue';
import Menu from './components/Menu.vue';
import BarraInferior from './components/BarraInferior.vue'
import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();
</script>

<template>
 
  <div class="app" >
    <BarraSuperior />
    <div class="menu-container">
      <Menu  v-if="authStore.isLoggedIn"></Menu>
      <Divider layout="vertical" />
      <div class="content">
       <RouterView />
      </div>
    </div>
    <BarraInferior v-if="!authStore.isLoggedIn"></BarraInferior>
   
  </div>
 
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
}

.menu-container {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
}

.Menu {
  width: 25%; 
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.content {
  flex: 3;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.RouterView {
  flex: 1;
  min-height: 100vh;
}

.BarraSuperior {
  position: fixed;
  top: -50;
  left: 0;
  right: 0;
  z-index: 1;
  box-shadow: -120px, 400px, -4px, -1px black; 
}

.BarraInferior {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}

</style>