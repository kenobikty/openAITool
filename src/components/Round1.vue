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
    <div v-html="res"></div>
  </div>
</template>

<script>
// import api from '@/api';

export default {
  name: "Round1",
  data() {
    return {
      text: '',
      res: null
    }
  },
  methods: {
    async submit() {
      await api.post('/engines/text-davinci-003-playground/completions', {
        "prompt": "act as a officer , draft an email to client explaining the delay of production",
        "max_tokens": 256,
        "temperature": 0.7,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0,
        "best_of": 1,
        "echo": true,
        "logprobs": 0,
        "stream": true
      })
    }
  }
}
</script>

<style scoped>

</style>
