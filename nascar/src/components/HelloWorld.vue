<script setup>
import { ref } from "vue";

const date = ref();
</script>

<template>
<h1>ola</h1>
<div class="card flex justify-content-center">
  <Calendar v-model="date" />
</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
