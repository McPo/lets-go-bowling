import Frame, { calculateScore, FinalFrame } from './Frame';

export default class BowlingGame {
    private _frames : Frame[] = [
        new Frame(),
        new Frame(),
        new Frame(),
        new Frame(),
        new Frame(),
        new Frame(),
        new Frame(),
        new Frame(),
        new Frame(),
        new FinalFrame(),
    ];
    private _currentFrameIndex : number = 0;

    public roll(numPins:number) {
        if (this.isGameOver) throw 'Game Over';

        const currentFrame = this._frames[this._currentFrameIndex]
        currentFrame.roll(numPins);

        if (currentFrame.isComplete) {
            this._currentFrameIndex++;
        }
    }

    public get isGameOver() {
        return this.currentFrame === undefined;//.isComplete && this._currentFrameIndex === this._frames.length;
    }

    public get currentFrameNumber() {
        return this._currentFrameIndex+1;
    }

    public get currentFrame() {
        return this._frames[this._currentFrameIndex];
    }

    public get score() {
        return calculateScore(this._frames)
    }
}
