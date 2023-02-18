<template>
  <div class="position-relative">
    <b-row class="mb-3">
      <b-col cols="12" sm="4">
        TODO: buttons for template tasks
      </b-col>
      <b-col cols="12" sm="8">
        <b-card title="Tell AI what you want to do">
          <b-card-text>
            <b-form-textarea
                id="textarea"
                v-model="text"
                placeholder="Enter something..."
                rows="5"
                max-rows="10"
            ></b-form-textarea>
          </b-card-text>
          <b-btn @click="submit">submit</b-btn>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-for="(n, i) in choices" cols="12" sm="6">
        <b-card :title="`Draft - ${i+1}`">
          <b-card-text>
            <b-form-textarea :value="n.text"
                             rows="20"
            ></b-form-textarea>
          </b-card-text>
          <b-btn @click="passToModify">further modify this draft (TODO)</b-btn>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '@/api';

export default {
  name: "Round1",
  data() {
    return {
      text: 'act as a officer , draft an email to client explaining the delay of production',
      choices: []
    }
  },
  methods: {
    async submit() {
      this.$emit('update:isLoading', true)
      try {
        const res = (await api.post('/engines/text-davinci-003/completions', {
          "prompt": this.text,
          "max_tokens": 1000,
          "temperature": 0.4,
          "top_p": 1,
          "frequency_penalty": 0,
          "presence_penalty": 0,
          "logprobs": 0,
          "n": 2
        }))
        this.choices = res.data.choices
        this.$emit('update:isLoading', false)
      } catch (e) {
        this.$emit('update:isLoading', false)
      }
    },
    passToModify() {
      //TODO
    }
  }
}
</script>

<style scoped>

</style>
