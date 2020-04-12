<template>
  <div id="app">
    <img alt="logo" height="50" src="./assets/logo.png">
    <span class="mx-2">Version: 0.1.0(2)</span>
    <span>By Dungeon</span>
    <WasteLand/>
  </div>
</template>

<script>
import WasteLand from './views/WasteLand'

export default {
  name: 'app',
  components: {
    WasteLand
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
