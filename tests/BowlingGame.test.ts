import BowlingGame from '@/lib/BowlingGame';
import Frame, { calculateScore } from '@/lib/Frame';

test('Bowling score calls calculateScore', () => {
    const g = new BowlingGame();
    expect(g.score).toEqual(0);
});
