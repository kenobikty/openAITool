<template>
    <div>
        <h2>Resource calculation (Last-Save: {{displayTime}})</h2>
        <b-button @click="save">Save</b-button>
        <b-row>
            <b-col class="mt-2" cols="4" v-for="key in speedUpKey" :key="key">
                <b-card
                        :title="key"
                >
                    <template v-if="packageOwned[key]">
                        <h2 class="text-dark">
                            Total (mins): {{ subtotal(key)}}
                        </h2>
                        <h2>
                            Total (hrs): {{ subtotal(key) | handleMinutes('h')}}
                        </h2>
                        <h2 class="text-primary">
                            Total (days): {{ subtotal(key) | handleMinutes('d')}}
                        </h2>
                    </template>
                    <div v-for="(n,i) in amountType" :key="i" class="mb-2">
                        <span>{{n}}</span>
                        <b-form-input type="number"
                                      v-model.number="packageOwned[key][i]"></b-form-input>
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: "SpeedUp",
    computed: {
      subtotal() {
        return (key) => {
          return this.MatrixOfArray(this.packageOwned[key], this.amountType)
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
        speedUpKey: ['general', 'building', 'solider', 'research', 'medical', 'ordnance'],
        lastUpdate: null,
        packageOwned: {
          general: [],
          building: [],
          solider: [],
          research: [],
          medical: [],
          ordnance: [],
        },
        amountType: [
          5,
          30,
          60,
          120,
          180,
          480
        ],
      }
    },
    methods: {
      init() {
        const data = JSON.parse(window.localStorage.getItem('dataSpeedUp'));
        if (data) {
          if (data.lastUpdate) this.lastUpdate = data.lastUpdate;
          if (data.packageOwned) this.packageOwned = data.packageOwned;
        }
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
        window.localStorage.setItem('dataSpeedUp', JSON.stringify(data))
        this.lastUpdate = moment()
      }
    }
  }
</script>

<style scoped>

</style>
