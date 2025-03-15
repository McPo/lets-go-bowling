import Frame, { calculateScore } from '@/lib/Frame';

test.each([
    [ new Frame([]), 0],
    [ new Frame([1]), 1],
    [ new Frame([5,3]), 8],
])('Frame score', (f, result) => {
    expect(f.score).toEqual(result);
});

test('Frame rolls', () => {
    const f = new Frame([5,3]);
    expect(f.rolls).toEqual([5,3]);
});

test('Frame roll', () => {
    const f = new Frame();
    f.roll(10);
    f.roll(5);
    f.roll(4);
    expect(f.rolls).toEqual([10, 5, 4]);
});

test.each([
    [ new Frame([]), false ],
    [ new Frame([1]), false ],
    [ new Frame([10]), true ],
    [ new Frame([9,1]), true ],
    [ new Frame([5,3]), true ],
])('Frame isComplete', (f, result) => {
    expect(f.isComplete).toEqual(result);
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

test('Spare on final frame', () => {
    expect(calculateScore([
        new Frame([0,0]),
        new Frame([0,0]),
        new Frame([0,0]),
        new Frame([0,0]),
        new Frame([0,0]),
        new Frame([0,0]),
        new Frame([0,0]),
        new Frame([0,0]),
        new Frame([0,0]),
        new Frame([1, 9, 1]),
    ]) ).toEqual(
        1+9+1
    );
});

test('Strike on final frame', () => {
    expect(calculateScore([
        new Frame([0,0]),
        new Frame([0,0]),
        new Frame([0,0]),
        new Frame([0,0]),
        new Frame([0,0]),
        new Frame([0,0]),
        new Frame([0,0]),
        new Frame([0,0]),
        new Frame([0,0]),
        new Frame([10, 10, 10]),
    ]) ).toEqual(
        10+10+10
    );
});

test('Perfect Game', () => {
    expect(calculateScore([
        new Frame([10]),
        new Frame([10]),
        new Frame([10]),
        new Frame([10]),
        new Frame([10]),
        new Frame([10]),
        new Frame([10]),
        new Frame([10]),
        new Frame([10]),
        new Frame([10, 10, 10]),
    ]) ).toEqual(
        300
    );
});
