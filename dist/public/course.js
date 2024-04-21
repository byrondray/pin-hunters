export class Course {
    holes;
    constructor() {
        this.holes = new Array(18);
    }
    getHole(index) {
        if (index < 1 || index > 18) {
            throw new Error("Invalid hole number. Must be between 1 and 18.");
        }
        return this.holes[index - 1];
    }
    setHole(index, par, lat, lng) {
        if (index < 1 || index > 18) {
            throw new Error("Invalid hole number. Must be between 1 and 18.");
        }
        this.holes[index - 1] = { par, lat, lng };
    }
    getAllHoles() {
        return this.holes;
    }
    setAllHoles(holes) {
        if (holes.length !== 18) {
            throw new Error("A golf course must have exactly 18 holes.");
        }
        this.holes = holes;
    }
}
//# sourceMappingURL=course.js.map