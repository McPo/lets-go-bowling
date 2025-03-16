import FinalFrame from '@/lib/FinalFrame';


describe('FinalFrame', () => {

    test.each([
        [ new FinalFrame([8, 1]), true ],
        [ new FinalFrame([9, 1]), false ],
        [ new FinalFrame([1, 9]), false ],
        [ new FinalFrame([10]), false ],
        [ new FinalFrame([10, 1]), false ],
        [ new FinalFrame([10, 1, 2]), true ],
        [ new FinalFrame([10, 10, 10]), true ],
    ])('isComplete %s', (f, result) => {
        expect(f.isComplete).toEqual(result);
    });

    test.each([
        [ new FinalFrame([8, 1]), false ],
        [ new FinalFrame([9, 1]), true ],
        [ new FinalFrame([1, 9]), true ],
        [ new FinalFrame([10]), true ],
        [ new FinalFrame([10, 1]), true ],
        [ new FinalFrame([10, 1, 2]), true ],
        [ new FinalFrame([10, 10, 10]), true ],
    ])('isFillBall %s', (f, result) => {
        expect(f.isFillBall).toEqual(result);
    });

    test('toString', () => {
        const f = new FinalFrame([3,6])
        expect(f.toString()).toEqual('FinalFrame[3,6]');
    });

});
