<template>
  <div id="app">
    <span class="mx-2">Version: 0.1.0</span>
    <emailTool/>
  </div>
</template>

<script>
import emailTool from './views/emailTool.vue'

export default {
  name: 'app',
  components: {
    emailTool
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
