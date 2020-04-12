<template>
    <div>
        <b-tabs card>
            <b-tab title="Resource" active>
                <ResourceCalculate/>
            </b-tab>
            <b-tab title="Speed-up">
                <SpeedUp/>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
  import ResourceCalculate from "../components/ResourceCalculate";
  import SpeedUp from "../components/SpeedUp";

  export default {
    name: 'WasteLand',
    components: {SpeedUp, ResourceCalculate},
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
