type Hole = {
  par: number;
  lat: number;
  lng: number;
};

export class Course {
  private holes: Hole[];

  constructor() {
    this.holes = new Array(18);
  }

  public getHole(index: number): Hole | undefined {
    if (index < 1 || index > 18) {
      throw new Error("Invalid hole number. Must be between 1 and 18.");
    }
    return this.holes[index - 1];
  }

  public setHole(index: number, par: number, lat: number, lng: number): void {
    if (index < 1 || index > 18) {
      throw new Error("Invalid hole number. Must be between 1 and 18.");
    }
    this.holes[index - 1] = { par, lat, lng };
  }

  public getAllHoles(): Hole[] {
    return this.holes;
  }

  public setAllHoles(holes: Hole[]): void {
    if (holes.length !== 18) {
      throw new Error("A golf course must have exactly 18 holes.");
    }
    this.holes = holes;
  }

 
}

