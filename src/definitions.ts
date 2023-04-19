export interface CapacitorStringeePlugin {
  /**
   * echo input value
   */
  echo(options: { value: string }): Promise<{ value: string }>
}
