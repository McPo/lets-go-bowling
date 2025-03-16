import Frame, { ROLLS_PER_FRAME } from './Frame';

export default class FinalFrame extends Frame {

    public get isComplete(): boolean {
        return this._rolls.length === ROLLS_PER_FRAME
            + (this.isFillBall ? 1 : 0);
    }

    public get isFillBall(): boolean {
        return (this.isSpare || this.isStrike)
    }

}
