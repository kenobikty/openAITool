<template>
    <div>
        <b-tabs card>
            <b-tab title="Resource" active>
                <h2>Resource calculation (Last-Update: {{lastUpdate}})</h2>
                <b-button @click="save">Save</b-button>
                <b-form class="text-left">
                    <h4>Clay (Safe)</h4>
                    <b-form-row>
                        <template v-for="(n,i) in clayType">
                            <b-col xs="4" sm="2">
                                <span>{{n}}</span>
                                <b-form-input type="number" v-model.number="claySafe[i]"></b-form-input>
                            </b-col>
                        </template>
                        <b-col xs="4" sm="2">
                            <span>Subtotal</span>
                            <p>{{subtotalClaySafe}}</p>
                        </b-col>
                    </b-form-row>
                    <h4>Clay (unsafe)</h4>
                    <b-form-row>
                        <template v-for="(n,i) in clayType">
                            <b-col xs="4" sm="2">
                                <span>{{n}}</span>
                                <b-form-input type="number" v-model.number="clay[i]"></b-form-input>
                            </b-col>
                        </template>
                        <b-col xs="4" sm="2">
                            <span>Subtotal</span>
                            <p>{{subtotalClay}}</p>
                        </b-col>
                    </b-form-row>
                </b-form>
                <b-form class="text-left">
                    <h4>Food (Safe)</h4>
                    <b-form-row>
                        <template v-for="(n,i) in foodType">
                            <b-col xs="4" sm="2">
                                <span>{{n}}</span>
                                <b-form-input type="number" v-model.number="foodSafe[i]"></b-form-input>
                            </b-col>
                        </template>
                        <b-col xs="4" sm="2">
                            <span>Subtotal</span>
                            <p>{{subtotalFoodSafe}}</p>
                        </b-col>
                    </b-form-row>
                    <h4>Food (unsafe)</h4>
                    <b-form-row>
                        <template v-for="(n,i) in foodType">
                            <b-col xs="4" sm="2">
                                <span>{{n}}</span>
                                <b-form-input type="number" v-model.number="food[i]"></b-form-input>
                            </b-col>
                        </template>
                        <b-col xs="4" sm="2">
                            <span>Subtotal</span>
                            <p>{{subtotalFood}}</p>
                        </b-col>
                    </b-form-row>
                </b-form>
                <b-form class="text-left">
                    <h4>Water (Safe)</h4>
                    <b-form-row>
                        <template v-for="(n,i) in waterType">
                            <b-col xs="4" sm="2">
                                <span>{{n}}</span>
                                <b-form-input type="number" v-model.number="waterSafe[i]"></b-form-input>
                            </b-col>
                        </template>
                        <b-col xs="4" sm="2">
                            <span>Subtotal</span>
                            <p>{{subtotalWaterSafe}}</p>
                        </b-col>
                    </b-form-row>
                    <h4>Water (unsafe)</h4>
                    <b-form-row>
                        <template v-for="(n,i) in waterType">
                            <b-col xs="4" sm="2">
                                <span>{{n}}</span>
                                <b-form-input type="number" v-model.number="water[i]"></b-form-input>
                            </b-col>
                        </template>
                        <b-col xs="4" sm="2">
                            <span>Subtotal</span>
                            <p>{{subtotalWater}}</p>
                        </b-col>
                    </b-form-row>
                </b-form>
                <b-form class="text-left">
                    <h4>Oil (Safe)</h4>
                    <b-form-row>
                        <template v-for="(n,i) in oilType">
                            <b-col xs="4" sm="2">
                                <span>{{n}}</span>
                                <b-form-input type="number" v-model.number="oilSafe[i]"></b-form-input>
                            </b-col>
                        </template>
                        <b-col xs="4" sm="2">
                            <span>Subtotal</span>
                            <p>{{subtotalOilSafe}}</p>
                        </b-col>
                    </b-form-row>
                    <h4>Oil (unsafe)</h4>
                    <b-form-row>
                        <template v-for="(n,i) in oilType">
                            <b-col xs="4" sm="2">
                                <span>{{n}}</span>
                                <b-form-input type="number" v-model.number="oil[i]"></b-form-input>
                            </b-col>
                        </template>
                        <b-col xs="4" sm="2">
                            <span>Subtotal</span>
                            <p>{{subtotalOil}}</p>
                        </b-col>
                    </b-form-row>
                </b-form>
            </b-tab>
            <b-tab title="Speed-up (TODO)">
                <p>Speed-up (TODO)</p>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    computed: {
      subtotalClay() {
        return this.MatrixOfArray(this.clay, this.clayType)
      },
      subtotalClaySafe() {
        return this.MatrixOfArray(this.claySafe, this.clayType)
      },
      subtotalFood() {
        return this.MatrixOfArray(this.food, this.foodType)
      },
      subtotalFoodSafe() {
        return this.MatrixOfArray(this.foodSafe, this.foodType)
      },
      subtotalWater() {
        return this.MatrixOfArray(this.water, this.waterType)
      },
      subtotalWaterSafe() {
        return this.MatrixOfArray(this.waterSafe, this.waterType)
      },
      subtotalOil() {
        return this.MatrixOfArray(this.oil, this.oilType)
      },
      subtotalOilSafe() {
        return this.MatrixOfArray(this.oilSafe, this.oilType)
      },
    },
    beforeMount() {
      this.init()
    },
    data() {
      return {
        resourceOrder: ['clay', 'food', 'water', 'oil'],
        lastUpdate: null,
        clay: [],
        food: [],
        water: [],
        oil: [],
        claySafe: [],
        foodSafe: [],
        waterSafe: [],
        oilSafe: [],
        clayType: [
          1000,
          10000,
          50000,
          150000,
          500000,
        ],
        foodType: [
          1000,
          10000,
          50000,
          150000,
          500000,
        ],
        waterType: [
          160,
          1600,
          8000,
          25000,
          80000,
        ],
        oilType: [
          40,
          400,
          2000,
          6250,
          20000,
        ],
      }
    },
    methods: {
      init() {
        const data = JSON.parse(this.$cookie.get('data'));
        this.lastUpdate = data.lastUpdate;
        this.clay = data.clay;
        this.food = data.food;
        this.water = data.water;
        this.oil = data.oil;
        this.claySafe = data.claySafe;
        this.foodSafe = data.foodSafe;
        this.waterSafe = data.waterSafe;
        this.oilSafe = data.oilSafe;
      },
      MatrixOfArray(a1, a2) {
        let out = 0
        for (let i in a1) {
          out += a1[i] * a2[i]
        }
        return out
      },
      save() {
        const data = {
          clay: this.clay,
          claySafe: this.claySafe,
          food: this.food,
          foodSafe: this.foodSafe,
          water: this.water,
          waterSafe: this.waterSafe,
          oil: this.oil,
          oilSafe: this.oilSafe,
          lastUpdate: new Date()
        };
        this.$cookie.set('data', JSON.stringify(data))
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
