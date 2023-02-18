<template>
  <div class="position-relative full-height-main-container">
    <span class="mx-2">Version: 0.1.0</span>
    <div class="loadingBackdrop" v-if="isLoading">
      <b-spinner label="Spinning" variant="success"></b-spinner>
    </div>
    <b-tabs card>
      <b-tab title="Round1" active>
        <Round1 :isLoading.sync="isLoading"/>
      </b-tab>
      <b-tab title="Round2">
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import Round1 from "../components/Round1.vue";

export default {
  name: 'HomePage',
  components: {Round1},
  data(){
    return {
      isLoading: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.full-height-main-container{
  height: 100vh;
}
.loadingBackdrop {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0, 0.3);
}
</style>
