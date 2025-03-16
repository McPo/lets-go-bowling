import { sumArray } from './helpers';
import { PinCount } from './types';

export const MAX_PINS = 10;
export const ROLLS_PER_FRAME = 2;

export default class Frame {
    protected _rolls : PinCount[] = [];

    constructor(rolls: PinCount[] = []) {
        /*
            We could've looped a call to roll
            This would've protected constructing a Frame of more than two rolls
            However it has some knock on effects, and its not too bad
            Also could've set _rolls: []|[PinCount]|[PinCount,PinCount]
            However this has several knock on effects
        */
        this._rolls = rolls;
    }

    public roll(count: PinCount) {
        // Couldve used a custom Error type
        if (this.isComplete) throw new Error('Frame is over');
        this._rolls.push(count);
    }

    public get pinCount(): number {
        return sumArray(this._rolls);
    }

    public get rolls(): PinCount[] {
        return [ ...this._rolls ];
    }

    public get isComplete(): boolean {
        return this.isStrike || this._rolls.length === ROLLS_PER_FRAME;
    }

    /*
        Technically a spare must be accomplished in the *first 2 rolls*
        This is important when considering a FinalFrame with 3 rolls
        However it is also technically the exact logic for any Frame
    */
    public get isSpare(): boolean {
        return (this._rolls[0] + this._rolls[1]) === MAX_PINS;
    }

    /*
        Technically a strike must be accomplished in the *first roll*
        This is important when considering a FinalFrame
        However it is also technically the exact logic for any Frame
    */
    public get isStrike(): boolean {
        return this._rolls[0] === MAX_PINS;
    }

    public toString(): string {
        return `${this.constructor.name}[${this._rolls.toString()}]` 
    }

}
