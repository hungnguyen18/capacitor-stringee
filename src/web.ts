import { WebPlugin } from '@capacitor/core'

import type { CapacitorStringeePlugin } from './definitions'

export class CapacitorStringeeWeb
  extends WebPlugin
  implements CapacitorStringeePlugin
{
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('[web] echo - options ', options)
    return options
  }
}

const CapacitorStringee = new CapacitorStringeeWeb()

export { CapacitorStringee }
