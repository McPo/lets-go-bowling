import Frame, { calculateScore } from '@/lib/Frame';

test('Frame score', () => {
    const f = new Frame([5,3]);
    expect(f.score).toEqual(8);
});

test.each([
        [ new Frame([5,3]), false ],
        [ new Frame([9,1]), true ],
        [ new Frame([1,9]), true ]
    ])('Frame isSpare', (frame, result) => {
    expect(frame.isSpare).toEqual(result);
});

test('Basic rolls', () => {
    expect(calculateScore([
        new Frame([5,3]),
        new Frame([2,1])
    ]) ).toEqual(
        5+3
        +2+1
    );
});

test('Spare rolls', () => {
    expect(calculateScore([
        new Frame([9,1]),
        new Frame([2,1])
    ]) ).toEqual(
        9+1+2
        +2+1
    );
});
