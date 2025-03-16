import { sumArray } from './helpers';

export const MAX_PINS = 10;
export const ROLLS_PER_FRAME = 2;

export default class Frame {
    protected _rolls : number[]; // can we limit this here

    constructor(rolls:number[] = []) { // constructor no longer needed, have test helper instead
        this._rolls = rolls;
    }

    public roll(count:number) {
         // throw error? and add test
        this._rolls.push(count);
    }

    public get score() {
        // get rid of this ?
        return sumArray(this._rolls);
    }

    public get rolls() {
        return [ ...this._rolls ];
    }

    public get isComplete() {
        return this.isStrike || this._rolls.length === ROLLS_PER_FRAME;
    }

    // Technically a spare must be accomplished in first 2 rolls
    public get isSpare() {
        return (this._rolls[0] + this._rolls[1]) === MAX_PINS;
    }

    // Technically a strike must occur on first roll of frame
    public get isStrike() {
        return this._rolls[0] === MAX_PINS;
    }

    toString() {
        return `${this.constructor.name}[${this._rolls.toString()}]` 
    }
}
