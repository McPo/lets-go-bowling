import Frame, { calculateScore } from '@/lib/Frame';

test('Frame score', () => {
    const f = new Frame([5,3]);
    expect(f.score).toEqual(8);
});

test('Frame rolls', () => {
    const f = new Frame([5,3]);
    expect(f.rolls).toEqual([5,3]);
});

test.each([
        [ new Frame([5,3]), false ],
        [ new Frame([9,1]), true ],
        [ new Frame([1,9]), true ]
    ])('Frame isSpare', (frame, result) => {
    expect(frame.isSpare).toEqual(result);
});

test.each([
        [ new Frame([5,3]), false ],
        [ new Frame([9,1]), false ],
        [ new Frame([10]), true ]
    ])('Frame isStrike', (frame, result) => {
    expect(frame.isStrike).toEqual(result);
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

test('Spare pending', () => {
    expect(calculateScore([
        new Frame([9,1])
    ]) ).toEqual(
        9+1
    );
});

test('Spares in a row', () => {
    expect(calculateScore([
        new Frame([9, 1]),
        new Frame([1, 9]),
        new Frame([5, 5])
    ]) ).toEqual(
        9+1+1
        +1+9+5
        +5+5
    );
});

test('Strike rolls', () => {
    expect(calculateScore([
        new Frame([10]),
        new Frame([5,4])
    ]) ).toEqual(
        10+5+4
        +5+4
    );
});

test('Strike pending', () => {
    expect(calculateScore([
        new Frame([10])
    ]) ).toEqual(
        10
    );
});

test('Strikes in a row', () => {
    expect(calculateScore([
        new Frame([10]),
        new Frame([10]),
        new Frame([10])
    ]) ).toEqual(
        10+10+10
        +10+10
        +10
    );
});
