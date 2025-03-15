import Frame, { calculateScore } from '@/lib/Frame';

test('Frame score', () => {
    const f = new Frame([5,3]);
    expect(f.score).toEqual(8);
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
