const MAX_PINS = 10;

const sumArray = (arr: number[]) => arr.reduce((sum, r) => sum+r, 0)

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

    public get isStrike() {
        return this._rolls.length === 1 && this._rolls[0] === MAX_PINS;
    }
}

export function calculateScore(frames:Frame[]): number {
    return frames.flat().reduce((sum,f,i) => {
        const upcomingRolls =  (x:number) : number[] => frames.slice(i+1).map(f => f.rolls).flat().slice(0, x);

        if (f.isStrike) return sum + f.score + sumArray(upcomingRolls(2));
        else if (f.isSpare) return sum + f.score + sumArray(upcomingRolls(1));
        else return sum + f.score
    }, 0);
}
