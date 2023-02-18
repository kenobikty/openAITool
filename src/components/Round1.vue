<template>
  <div>
    <b-form-textarea
        id="textarea"
        v-model="text"
        placeholder="Enter something..."
        rows="3"
        max-rows="6"
    ></b-form-textarea>
    <b-btn @click="submit">submit</b-btn>
    <b-row>
      <b-col v-for="n in choices">
<!--        <div v-if="!!n" v-html="n.text">-->
<!--        </div>-->
        <b-form-textarea :value="n.text"
                         rows="30"
        ></b-form-textarea>
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
    }
  }
}
</script>

<style scoped>

</style>
