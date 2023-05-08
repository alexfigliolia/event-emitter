export class AutoIncrementingID {
  private incrementor = -1;

  public get() {
    return `${++this.incrementor}`;
  }

  public reset() {
    this.incrementor - 1;
  }
}
