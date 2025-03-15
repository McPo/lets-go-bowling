import { calculateScore } from '@/lib/Frame';
import BowlingGame from '@/lib/BowlingGame';

jest.mock('@/lib/Frame', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
        roll: jest.fn(),
        isComplete: jest.fn().mockReturnValue(true)
    })),
    calculateScore: jest.fn().mockReturnValue(1234),
}));

test('Bowling score calls calculateScore', () => {
    const g = new BowlingGame();
    expect(g.score).toEqual(1234);
    expect(calculateScore).toHaveBeenCalledTimes(1);
    expect(calculateScore).toHaveBeenCalledWith((g as any)._frames) // HACK
});

test('Increment Frame', () => {
    const g = new BowlingGame();
    expect(g.currentFrameNumber).toEqual(1);
    g.roll(0);
    expect(g.currentFrameNumber).toEqual(2);
});
