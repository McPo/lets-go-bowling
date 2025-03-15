import Frame, { calculateScore } from './Frame';

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
        new Frame(),
    ];
    private _currentFrameIndex : number = 0;

    public roll(numPins:number) {
        const currentFrame = this._frames[this._currentFrameIndex]
        currentFrame.roll(numPins);
        if (currentFrame.isComplete) this._currentFrameIndex++
    }

    public get score() {
        return calculateScore(this._frames)
    }
}
