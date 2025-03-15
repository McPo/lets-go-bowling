const MAX_PINS = 10;

const sumArray = (arr: number[]) => arr.reduce((sum, r) => sum+r)

export default class Frame {
    private _rolls : number[];

    constructor(rolls:number[] = []) {
        this._rolls = rolls;
    }

    public get score() {
        return sumArray(this._rolls);
    }

    public get rolls() {
        return [ ...this._rolls ];
    }

    public get isSpare() {
        return this._rolls.length == 2 && sumArray(this._rolls) === MAX_PINS;
    }
}

export function calculateScore(frames:Frame[]): number {
    return frames.flat().reduce((sum,f,i) => {
        if (f.isSpare) return sum+f.score+frames[i+1].rolls[0];
        else return sum+f.score
    }, 0);
}
