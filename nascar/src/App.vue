<script setup>
import BarraSuperior from './components/BarraSuperior.vue';
import Menu from './components/Menu.vue';
</script>

<template>
  <div class="app">
    <BarraSuperior />
    <div class="menu-container">
      <Menu />
    </div>
  </div>
</template>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.app {
  display: flex;
  flex-direction: column; 
  min-height: 100vh;
}

.menu-container {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.Menu {
  min-width: 25%; 
  min-height: 100vh;
  position: relative;
  z-index: 0;
}

.BarraSuperior {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1; 
}
</style>