import { calculateScore } from '@/lib/Frame';

test("Basic rolls", () => {
    expect(calculateScore([
        [5,3],
        [2,1]
    ]) ).toEqual(
        5+3
        +2+1
    );
});

test("Spare rolls", () => {
    expect(calculateScore([
        [9,1],
        [2,1]
    ]) ).toEqual(
        9+1+2
        +2+1
    );
});
