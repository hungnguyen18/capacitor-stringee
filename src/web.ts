import { WebPlugin } from '@capacitor/core'

import type { CapacitorStringeePlugin } from './definitions'
// import StartCall from './stringee/start-call'

declare var StringeeClient: any
declare var StringeeCall: any
export class CapacitorStringeeWeb
  extends WebPlugin
  implements CapacitorStringeePlugin
{
  #client: any
  #call: any
  #isAuth: boolean = false
  StringeeConnect(token: string) {
    this.#client = new StringeeClient()
    this.#client.connect(token)
    this.#client.on('connect', () => {
      this.notifyListeners('stringee-log', 'connect')
    })
    this.#client.on('authen', (res: any) => {
      if (res.r === 0) {
        this.#isAuth = true
        this.notifyListeners('stringee-log', 'authen')
      } else {
        console.error(res.message)
      }
    })
    this.#client.on('disconnect', () => {
      this.#isAuth = false
      this.notifyListeners('stringee-log', 'disconnect')
    })
    this.#client.on('incomingcall', (res: any) => {
      this.notifyListeners('incoming-call', res)
    })
    this.#client.on('otherdeviceauthen', (data: any) => {
      this.notifyListeners('otherdevice-authen', data)
    })
  }
  StringeeCall(callFrom: string, callTo: string) {
    // const emitEvent = (name: string, data: any) => {
    //   this.notifyListeners(name, data)
    // }
    if (this.#isAuth && this.#client) {
      this.notifyListeners('call-log', 'start')
      this.#call = new StringeeCall(this.#client, callFrom, callTo)
      this.#call.makeCall((res: any) => {
        if (res.r !== 0) console.log('call-status', res.message)
      })

      this.#call.on('error', (info: any) => {
        console.error(info)
        this.notifyListeners('error', info)
      })

      this.#call.on('addlocalstream', (stream: any) => {
        this.notifyListeners('add-localstream', stream)
      })
      this.#call.on('addremotestream', (stream: any) => {
        this.notifyListeners('add-remotestream', stream)
      })

      this.#call.on('signalingstate', (state: any) => {
        console.log(state, ' line 64')
        this.notifyListeners('signaling-state', state)
      })

      this.#call.on('mediastate', (state: any) => {
        this.notifyListeners('media-state', state)
      })

      this.#call.on('info', (info: any) => {
        this.notifyListeners('info', info)
      })

      this.#call.on('otherdevice', (data: any) => {
        this.notifyListeners('otherdevice', data)
      })
    }
  }
  StringeeReject(): void {
    if (this.#call) {
      this.#call.reject((res: any) => {
        this.notifyListeners('call-reject', res)
      })
    }
  }
  // async testStringeePlugin(
  //   token: string,
  //   callFrom: string,
  //   callTo: string
  // ): Promise<void> {
  //   const emitEvent = (name: string, data: any) => {
  //     this.notifyListeners(name, data)
  //   }
  //   const call: any = await StartCall(token, callFrom, callTo)

  //   call.makeCall((res: any) => {
  //     if (res.r !== 0) console.log('call-status', res.message)
  //   })

  //   call.on('error', function (info: any) {
  //     console.error(info)
  //     emitEvent('error', info)
  //   })

  //   call.on('addlocalstream', function (stream: any) {
  //     console.log('stringee stream', stream)
  //     emitEvent('addlocal-stream', stream)
  //   })

  //   call.on('signalingstate', function (state: any) {
  //     emitEvent('signaling-state', state)
  //   })

  //   call.on('mediastate', function (state: any) {
  //     emitEvent('media-state ', state)
  //   })

  //   call.on('info', function (info: any) {
  //     emitEvent('info', info)
  //   })
  // }
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('[web] echo - options ', options)
    options.value = 'web: hello, world'
    return options
  }
}

const CapacitorStringee = new CapacitorStringeeWeb()

export { CapacitorStringee }
