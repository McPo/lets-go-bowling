import Frame from '@/lib/Frame';
import FinalFrame from '@/lib/FinalFrame';
import { calculateScore } from '@/lib/helpers';
import { PinCount } from './types';

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
        /*
            Maybe this should have been auto generated
            To always ensure the last frame was a FinalFrame etc.
        */
        this._frames = frames;
    }

    public roll(count: PinCount) {
        if (!this._frames[this._currentFrameIndex]) throw new Error('Game over');

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
