import Frame from '@/lib/Frame';
import FinalFrame from '@/lib/Frame';
import { calculateScore } from '@/lib/helpers';

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
        return this.currentFrame === undefined;
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
