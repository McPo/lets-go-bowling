import { sumArray } from './helpers';

export const MAX_PINS = 10;
export const ROLLS_PER_FRAME = 2;

export default class Frame {
    protected _rolls : number[]; // can we limit this here

    constructor(rolls:number[] = []) { // constructor no longer needed, have test helper insteadq
        this._rolls = rolls;
    }

    public roll(count:number) {
        if (this.isComplete) throw new Error('Frame is over');
        this._rolls.push(count);
    }

    public get pinCount() {
        return sumArray(this._rolls);
    }

    public get rolls() {
        return [ ...this._rolls ];
    }

    public get isComplete() {
        return this.isStrike || this._rolls.length === ROLLS_PER_FRAME;
    }

    /*
        Technically a spare must be accomplished in the *first 2 rolls*
        This is important when considering a FinalFrame with 3 rolls
        However it is also technically the exact logic for any Frame
    */
    public get isSpare() {
        return (this._rolls[0] + this._rolls[1]) === MAX_PINS;
    }

    /*
        Technically a spare must be accomplished in the *first 2 rolls*
        This is important when considering a FinalFrame with 3 rolls
        However it is also technically the exact logic for any Frame
    */
    public get isStrike() {
        return this._rolls[0] === MAX_PINS;
    }

    toString() {
        return `${this.constructor.name}[${this._rolls.toString()}]` 
    }
}
