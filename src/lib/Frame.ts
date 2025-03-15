const MAX_PINS = 10;
const ROLLS_PER_FRAME = 2;

const sumArray = (arr: number[]) => arr.reduce((sum, r) => sum+r, 0)

export default class Frame {
    protected _rolls : number[];

    constructor(rolls:number[] = []) {
        this._rolls = rolls;
    }

    public roll(count:number) {
        this._rolls.push(count);
    }

    public get isComplete() {
        return this.isStrike || this._rolls.length === ROLLS_PER_FRAME;
    }

    public get score() {
        return sumArray(this._rolls);
    }

    public get rolls() {
        return [ ...this._rolls ];
    }

    public get isSpare() {
        return (this._rolls[0] + this._rolls[1]) === MAX_PINS;
    }

    public get isStrike() {
        return this._rolls[0] === MAX_PINS;
    }
}

export class FinalFrame extends Frame {
    public get isComplete() {
        return this._rolls.length === ROLLS_PER_FRAME
            + (this.isFillBall ? 1 : 0);
    }

    public get isFillBall() {
        return (this.isSpare || this.isStrike)
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
