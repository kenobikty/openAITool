<template>
    <div>
        <b-tabs card>
            <b-tab title="Round1" active>
              <Round1/>
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
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
