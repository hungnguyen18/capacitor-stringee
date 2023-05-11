import { PluginListenerHandle } from '@capacitor/core'

export interface CapacitorStringeePlugin {
  /**
   * echo input value
   */
  echo(options: { value: string }): Promise<{ value: string }>
  StringeeConnect(token: string): void
  StringeeCall(callFrom: string, callTo: string): void
  StringeeReject(): void
  // listener for connect event
  // bug detect: seem capacitor only notify only one event, so I will temporary comment it
  addListener(
    name: string,
    listenerFunc: (data: any) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle
  // addListener(
  //   name: 'stringee-log',
  //   listenerFunc: (message: string) => void
  // ): Promise<PluginListenerHandle> & PluginListenerHandle
  // addListener(
  //   name: 'incoming-call',
  //   listenerFunc: (res: any) => void
  // ): Promise<PluginListenerHandle> & PluginListenerHandle
  // addListener(
  //   name: 'otherdevice-authen',
  //   listenerFunc: (res: any) => void
  // ): Promise<PluginListenerHandle> & PluginListenerHandle
  // listener for call event
  // addListener(
  //   name: 'error',
  //   listenerFunc: (data: any) => void
  // ): Promise<PluginListenerHandle> & PluginListenerHandle
  // addListener(
  //   name: 'add-localstream',
  //   listenerFunc: (data: any) => void
  // ): Promise<PluginListenerHandle> & PluginListenerHandle
  // addListener(
  //   name: 'add-remotestream',
  //   listenerFunc: (data: any) => void
  // ): Promise<PluginListenerHandle> & PluginListenerHandle
  // addListener(
  //   name: 'signaling-state',
  //   listenerFunc: (data: any) => void
  // ): Promise<PluginListenerHandle> & PluginListenerHandle
  // addListener(
  //   name: 'media-state',
  //   listenerFunc: (data: any) => void
  // ): Promise<PluginListenerHandle> & PluginListenerHandle
  // addListener(
  //   name: 'info',
  //   listenerFunc: (data: any) => void
  // ): Promise<PluginListenerHandle> & PluginListenerHandle
  // addListener(
  //   name: 'otherdevice',
  //   listenerFunc: (data: any) => void
  // ): Promise<PluginListenerHandle> & PluginListenerHandle
  // listener for reject event
  // addListener(
  //   name: 'call-reject',
  //   listenerFunc: (data: any) => void
  // ): Promise<PluginListenerHandle> & PluginListenerHandle
}
