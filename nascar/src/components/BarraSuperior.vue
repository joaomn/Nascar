<template>
  <div class="barra">
    <img src="../assets/fundobrancologo.jpg" alt="" class="logo" />
  </div>
</template>

<script>
export default {};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
}

.barra {
  background: #678c99;
  margin: 0rem;
  width: 100%;
  height: 6rem;
  margin-bottom: 0px;
  box-shadow: -5px 4px 2px 1px rgb(221, 218, 218);
  justify-content: start;
  display: flex;
}

.logo {
  height: 15rem;
  height: 100%;
  mix-blend-mode: multiply;
  bottom: 30px;
  position: relative;
}

.barra .logo {
  height: 14rem;
  top: -65px;
}
</style>
