import Frame from '@/lib/Frame';
import FinalFrame from '@/lib/FinalFrame';
import { calculateScore } from '@/lib/helpers';

export default class BowlingGame {
    private _frames: Frame[] = [];
    private _currentFrameIndex: number = 0;

    constructor(frames: Frame[] = [
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
    ]) {
        this._frames = frames;
    }

    public roll(count: number) {
        if (!this._frames[this._currentFrameIndex]) throw new Error('Game Over');

        const currentFrame = this._frames[this._currentFrameIndex];
        currentFrame.roll(count);

        if (currentFrame.isComplete) {
            this._currentFrameIndex++;
        }
    }

    public get score(): number {
        return calculateScore(this._frames)
    }

}
