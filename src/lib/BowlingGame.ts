import Frame from '@/lib/Frame';
import FinalFrame from '@/lib/FinalFrame';
import { calculateScore } from '@/lib/helpers';

export default class BowlingGame {
    /*
        Could generate this in the constructor
        And have a dynamic frame count might be useful for tests
    */
    private _frames: Frame[] = [
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
    private _currentFrameIndex: number = 0;

    public roll(count: number) {
        if (this.isGameOver) throw new Error('Game Over');

        const currentFrame = this.currentFrame;
        currentFrame.roll(count);

        if (currentFrame.isComplete) {
            this._currentFrameIndex++;
        }
    }

    public get isGameOver(): boolean {
        return this.currentFrame instanceof FinalFrame && this.currentFrame.isComplete;
    }

    /*
        Could've returned undefined at end of game instead
        Or throw Game Over
    */
    public get currentFrameNumber(): number {
        return Math.min(this._currentFrameIndex+1, this._frames.length);
    }

    public get currentFrame(): Readonly<Frame> {
        return this._frames[this.currentFrameNumber-1];
    }

    public get frames(): ReadonlyArray<Readonly<Frame>> {
        return this._frames
    }

    public get score(): number {
        return calculateScore(this._frames)
    }

}
