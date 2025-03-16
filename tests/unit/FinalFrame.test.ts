import FinalFrame from '@/lib/FinalFrame';

test.each([
    [ new FinalFrame([8, 1]), true ],
    [ new FinalFrame([9, 1]), false ],
    [ new FinalFrame([1, 9]), false ],
    [ new FinalFrame([10]), false ],
    [ new FinalFrame([10, 1]), false ],
    [ new FinalFrame([10, 1, 2]), true ],
    [ new FinalFrame([10, 10, 10]), true ],
])('Is Complete', (f, result) => {
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
])('Is Fill Ball', (f, result) => {
    expect(f.isFillBall).toEqual(result);
});
