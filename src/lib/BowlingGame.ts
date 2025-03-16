import Frame from '@/lib/Frame';
import FinalFrame from '@/lib/FinalFrame';
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
        if (this.isGameOver) throw 'Game Over'; // need to decide if i like using getters internal, makes it easier to mock

        const currentFrame = this.currentFrame;
        currentFrame.roll(numPins);

        if (currentFrame.isComplete) {
            this._currentFrameIndex++;
        }
    }

    public get isGameOver() {
        return this.currentFrameNumber === this._frames.length && this.currentFrame.isComplete;
    }

    public get currentFrameNumber() {
        return Math.min(this._currentFrameIndex+1, this._frames.length);
    }

    public get currentFrame(): Readonly<Frame> {
        return this._frames[this.currentFrameNumber-1];
    }

    public get frames(): ReadonlyArray<Readonly<Frame>> {
        return this._frames
    }

    public get score() {
        return calculateScore(this._frames)
    }
}
