<template>
  <div>
    <v-container>
      <v-text-field v-model="token" label="token"></v-text-field>
      <v-btn @click="auth">Auth</v-btn>
      <v-text-field v-model="callFrom" label="call from"></v-text-field>
      <v-text-field v-model="callTo" label="call to"></v-text-field>
      <v-btn :disabled="!isAuth" color="primary" @click="call">Call</v-btn>
      <v-btn :disabled="!isAuth" color="error" @click="reject">Reject</v-btn>
      <p>Status: {{ status }}</p>
    </v-container>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { CapacitorStringee } from '@wellcare/capacitor-stringee'
export default defineComponent({
  setup() {
    const token = ref(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InN0cmluZ2VlLWFwaTt2PTEifQ.eyJqdGkiOiJTS3NXTXlPZjhqUm51c3dPS1pEOXI5alZtVHE2bXB2MzhCXzE2ODM2ODcwMzA4MDgiLCJpc3MiOiJTS3NXTXlPZjhqUm51c3dPS1pEOXI5alZtVHE2bXB2MzhCIiwiZXhwIjoxNjgzNzczNDMwODA4LCJ1c2VySWQiOiIzODcyODMiLCJpYXQiOjE2ODM2ODcwMzB9.LHTymQDrGSwTKSAkZfddq-w5S_7Y0M8nAbDjr3jasIo'
    )
    const callFrom = ref('387283')
    const callTo = ref('84348375392')
    const status = ref('')
    const isAuth = ref(false)
    const StringeePlugin = CapacitorStringee
    const auth = () => {
      if (process.client) StringeePlugin.StringeeConnect(token.value)
    }
    const call = () => {
      if (process.client)
        StringeePlugin.StringeeCall(callFrom.value, callTo.value)
    }
    const reject = () => {
      if (process.client) StringeePlugin.StringeeReject()
    }
    // StringeePlugin.addListener('singaling-state', (data: any) => {
    //   console.log(data, ' line 37')
    //   if (data.reason) status.value = data.reason
    // })
    StringeePlugin.addListener('lk_ips', (message: string) => {
      console.log(message)
      if (message === 'authen') isAuth.value = true
    })
    StringeePlugin.addListener('call-log2', (message: string) => {
      console.log(message, ' line 46')
    })
    StringeePlugin.addListener('call-log', (message: string) => {
      console.log(message, ' line 46')
    })
    return {
      token,
      callFrom,
      callTo,
      status,
      isAuth,
      auth,
      call,
      reject
    }
  },
  head() {
    return {
      title: 'Stringee'
    }
  }
})
</script>
