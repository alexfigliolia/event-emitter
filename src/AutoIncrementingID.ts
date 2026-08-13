/**
 * Auto Incrementing ID
 *
 * SQL-style ID generation!
 *
 * ```typescript
 * const IDs = new AutoIncrementingID();
 *
 * const uniqueID = IDs.get();
 * ```
 */
export class AutoIncrementingID {
  private incrementor = this.getInitialIncrementor();

  /**
   * Get
   *
   * Returns an auto-incrementing ID
   */
  public get() {
    return (++this.incrementor).toString();
  }

  /**
   * Last
   *
   * Returns the last generated ID
   */
  public last() {
    return this.incrementor.toString();
  }

  /**
   * Reset
   *
   * Resets the `AutoIncrementingID`'s incrementor back to 0
   */
  public reset() {
    this.incrementor = this.getInitialIncrementor();
  }

  private getInitialIncrementor() {
    return typeof BigInt === "undefined" ? -1 : BigInt(-1);
  }
}
