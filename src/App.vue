<template>
  <div id="app">
    <img alt="logo" height="50" src="./assets/logo.png">
    <span>Version: 0.0.5(1)</span>
    <WasteLand/>
  </div>
</template>

<script>
import WasteLand from './components/WasteLand'

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
