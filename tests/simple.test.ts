import BowlingGame from '@/lib';

it("Simple Roll", () => {
    const game = new BowlingGame();
    game.roll(5)
    expect(game.score).toBe(5);
});
