<template>
    <div>
        <b-tabs card>
            <b-tab title="Resource" active>
                <ResourceCalculate/>
            </b-tab>
            <b-tab title="Speed-up (TODO)">
                <p>Speed-up (TODO)</p>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
  import ResourceCalculate from "../components/ResourceCalculate";

  export default {
    name: 'WasteLand',
    components: {ResourceCalculate},
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
