
export default class Frame {
    private _rolls : number[];

    constructor(rolls:number[] = []) {
        this._rolls = rolls;
    }

    public get score() {
        return this._rolls.reduce((sum, r) => sum+r);
    }
}

export function calculateScore(frames:Frame[]): number {
    return frames.flat().reduce((sum,r) => sum+r.score, 0);
}
