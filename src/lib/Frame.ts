import { sumArray } from './helpers';

export const MAX_PINS = 10;
export const ROLLS_PER_FRAME = 2;

export default class Frame {
    protected _rolls : number[];

    constructor(rolls:number[] = []) { // constructor no longer needed, have test helper instead
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
        return (this._rolls[0] + this._rolls[1]) === MAX_PINS; // need more eaxct tests for this, its first two rolls not any two rolls
    }

    public get isStrike() {
        return this._rolls[0] === MAX_PINS;
    }
}
