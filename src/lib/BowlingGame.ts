
export default class BowlingGame {
    private _score : number = 0;

    public roll(numPins:number) {
        this._score += numPins;
    }

    public get score() {
        return this._score;
    }
}
