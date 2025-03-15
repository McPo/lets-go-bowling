import Frame, { ROLLS_PER_FRAME } from './Frame';

export default class FinalFrame extends Frame {
    public get isComplete() {
        return this._rolls.length === ROLLS_PER_FRAME
            + (this.isFillBall ? 1 : 0);
    }

    public get isFillBall() {// needs test
        return (this.isSpare || this.isStrike)
    }
}
