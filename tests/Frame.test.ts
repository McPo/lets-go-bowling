import { calculateScore } from '@/lib/Frame';

test("Basic rolls", () => {
    expect(calculateScore([
        [5,3],
        [2,1]
    ]) ).toBe(5+3+2+1);
});
