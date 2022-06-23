export class NoteData {
  public percentRest: number = 100;
  public keySostenido: boolean;
  public keyValue: number;
  public className: string;
  public durationMS: number;
  public initialDurationMS: number;
  public timer;

  public readonly sostenidos: {[key: number]: boolean} = {
    37: true,
    39: true,
    42: true,
    44: true,
    46: true,
    49: true,
    51: true,
    54: true,
    56: true,
    58: true,
    61: true,
    63: true,
    66: true,
    68: true,
    70: true,
    73: true,
    75: true,
    78: true,
    80: true,
    82: true,
    85: true,
    87: true,
    90: true,
    92: true,
    94: true,
  };

  public constructor(keyValue: number, durationMS: number, endCallback: () => void) {
    this.keySostenido = this.sostenidos[keyValue] == true;
    this.keyValue = keyValue;
    this.className = `k`+keyValue;
    this.durationMS = durationMS;
    this.initialDurationMS = durationMS;
    this.timer = setInterval(() => {
      this.durationMS--;
      this.recalcPercent();
      if(this.percentRest <= -1) {
        clearInterval(this.timer);
        endCallback();
      }
    }, 10)
  }

  public stop() {
    clearInterval(this.timer);
  }

  private recalcPercent() {
    this.percentRest = this.durationMS * 100 / this.initialDurationMS;
  }
}
