import { WebPlugin } from '@capacitor/core'

import type { CapacitorPluginStarterPlugin } from './definitions'

export class CapacitorPluginStarterWeb
  extends WebPlugin
  implements CapacitorPluginStarterPlugin
{
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('[web] echo - options ', options)
    return options
  }
}

const CapacitorPluginStarter = new CapacitorPluginStarterWeb()

export { CapacitorPluginStarter }
