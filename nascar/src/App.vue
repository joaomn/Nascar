<script setup>
import BarraSuperior from './components/BarraSuperior.vue';
import Menu from './components/Menu.vue';
import Login from './components/Login.vue';

</script>

<template>
 
  <div class="app" >
    <BarraSuperior />
    <div class="menu-container">
      <Menu />
      <Divider layout="vertical" />
      <div class="content">
       <RouterView />
      </div>
      
    </div>
   
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
  top: 0;
  left: 0;
  right: 0;
  z-index: 1; 
}
</style>