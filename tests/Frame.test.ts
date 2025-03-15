import Frame, { calculateScore } from '@/lib/Frame';

test('Frame score', () => {
    const f = new Frame([5,3]);
    expect(f.score).toEqual(8);
});

test('Frame isSpare', () => {
    let f = new Frame([5,3]);
    expect(f.isSpare).toEqual(false);

    f = new Frame([9,1]);
    expect(f.isSpare).toEqual(true);

    f = new Frame([1,9]);
    expect(f.isSpare).toEqual(true);
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
