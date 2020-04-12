<template>
    <div>
        <b-tabs card>
            <b-tab title="Resource" active>
                <h2>Resource calculation (Last-Save: {{displayTime}})</h2>
                <b-button @click="save">Save</b-button>
                <b-row class="mt-2">
                    <b-col xs="3" v-for="key in resourceKey" :key="key">
                        <b-card
                                :title="key"
                        >
                            <template v-if="packageOwned[key]">
                                <h2 class="text-primary">
                                    Total: {{ subtotal(key , 'safe') + subtotal(key, 'unsafe')| million }}
                                </h2>
                                <b-row>
                                    <b-col xs="6">
                                        <h3>
                                            Safe : {{ subtotal(key, 'safe') | million }}
                                        </h3>
                                    </b-col>
                                    <b-col xs="6">
                                        <h3>
                                            Unsafe : {{ subtotal(key, 'unsafe') }}
                                        </h3>
                                    </b-col>
                                </b-row>
                            </template>
                            <b-row>
                                <b-col xs="6">
                                    <!--safe-->
                                    <div v-for="(n,i) in amountType[key]" :key="i" class="mb-2">
                                        <span>{{n}}</span>
                                        <b-form-input type="number"
                                                      v-model.number="packageOwned[key]['safe'][i]"></b-form-input>
                                    </div>
                                </b-col>
                                <b-col xs="6">
                                    <!--unsafe-->
                                    <div v-for="(n,i) in amountType[key]" :key="i" class="mb-2">
                                        <span>{{n}}</span>
                                        <b-form-input type="number"
                                                      v-model.number="packageOwned[key]['unsafe'][i]"></b-form-input>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-card>
                    </b-col>
                </b-row>
            </b-tab>
            <b-tab title="Speed-up (TODO)">
                <p>Speed-up (TODO)</p>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: 'WasteLand',
    computed: {
      subtotal() {
        return (key, safeType) => {
          return this.MatrixOfArray(this.packageOwned[key][safeType], this.amountType[key])
        }
      },
      displayTime() {
        return moment(this.lastUpdate).fromNow()
      }
    },
    beforeMount() {
      this.init()
    },
    data() {
      return {
        resourceKey: ['clay', 'food', 'water', 'oil'],
        lastUpdate: null,
        packageOwned: {
          clay: {
            safe: [],
            unsafe: []
          },
          food: {
            safe: [],
            unsafe: []
          },
          water: {
            safe: [],
            unsafe: []
          },
          oil: {
            safe: [],
            unsafe: []
          },
        },
        amountType: {
          clay: [
            1000,
            10000,
            50000,
            150000,
            500000,
          ], food: [
            1000,
            10000,
            50000,
            150000,
            500000,
          ],
          water: [
            160,
            1600,
            8000,
            25000,
            80000,
          ],
          oil: [
            40,
            400,
            2000,
            6250,
            20000,
          ],
        },
      }
    },
    methods: {
      init() {
        const data = JSON.parse(window.localStorage.getItem('data'));
        if (data.lastUpdate) this.lastUpdate = data.lastUpdate;
        if (data.packageOwned) this.packageOwned = data.packageOwned;
      },
      MatrixOfArray(a1, a2) {
        let out = 0
        if (!a1.length || !a2.length) return out
        for (let i in a1) {
          out += a1[i] * a2[i]
        }
        return out
      },
      save() {
        const data = {
          packageOwned: this.packageOwned,
          lastUpdate: moment()
        };
        window.localStorage.setItem('data', JSON.stringify(data))
        this.lastUpdate = moment()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
