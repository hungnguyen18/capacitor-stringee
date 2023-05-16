import { PluginListenerHandle } from '@capacitor/core'

export interface CapacitorStringeePlugin {
  /**
   * echo input value
   */
  echo(options: { value: string }): Promise<{ value: string }>
  StringeeConnect(token: string, listenerFunc: (data: any) => void): void
  StringeeCall(
    callFrom: string,
    callTo: string,
    listenerFunc: (data: any) => void
  ): void
  StringeeReject(listenerFunc: (data: any) => void): void
  StringeeHangup(listenerFunc: (data: any) => void): void
  // listener for connect event
  // bug detect: seem capacitor only notify only one event, so I will temporary comment it
  addListener(
    name: string,
    listenerFunc: (data: any) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle
}
