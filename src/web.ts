import { WebPlugin } from '@capacitor/core'

import type { CapacitorStringeePlugin } from './definitions'

export class CapacitorStringeeWeb
  extends WebPlugin
  implements CapacitorStringeePlugin
{
  test(param: string): string {
    return param
  }
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('[web] echo - options ', options)
    options.value = "web: hello, world"
    return options
  }
}

const CapacitorStringee = new CapacitorStringeeWeb()

export { CapacitorStringee }
