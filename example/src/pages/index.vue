<template>
  <div>
    <v-container>
      <v-text-copy v-model="token" label="token"></v-text-copy>
      <v-btn @click="connect">Connect</v-btn>
      <v-text-field v-model="callFrom" label="call from"></v-text-field>
      <v-text-field v-model="callTo" label="call to"></v-text-field>
      <v-btn :disabled="isAuth" color="primary" @click="call">Call</v-btn>
      <v-btn :disabled="isAuth" color="error" @click="reject">Reject</v-btn>
      <p>Status: {{ status }}</p>
      <w-debug-log />
    </v-container>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { CapacitorStringee } from '@wellcare/capacitor-stringee'
import { useLog } from '@wellcare/vue-component'
import { useStringee } from '../repositories/use-stringee'

export default defineComponent({
  setup() {
    const { log } = useLog()
    const { token } = useStringee()
    const callFrom = ref('387283')
    const callTo = ref('84348375392')
    const status = ref('')
    const isAuth = ref(false)
    const StringeePlugin = CapacitorStringee
    const connect = () => {
      if (process.client)
        StringeePlugin.StringeeConnect(token.value, onClientEvent)
    }
    const call = () => {
      if (process.client)
        StringeePlugin.StringeeCall(callFrom.value, callTo.value, onCallEvent)
    }
    const reject = () => {
      if (process.client)
        StringeePlugin.StringeeReject((data: any) => {
          log({ context: 'Stringee', message: `onReject ${data.event}`, data })
        })
    }
    const onClientEvent = (data: any) => {
      log({ context: 'Stringee', message: `onClientEvent ${data.event}`, data })
      if (data.event === 'authen') isAuth.value = true
    }
    const onCallEvent = (data: any) => {
      log({ context: 'Stringee', message: `onCallEvent ${data.event}`, data })
      if (data.event === 'signaling-state') {
        status.value = data.data.reason
      }
    }
    return {
      token,
      callFrom,
      callTo,
      status,
      isAuth,
      connect,
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
