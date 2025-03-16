import BowlingGame from '@/lib/BowlingGame';

describe('BowlingGame', () => {

    test('.score calls helpers.calculateScore', () => {
        const mockCalculateScore = jest.spyOn(require('@/lib/helpers'), 'calculateScore').mockImplementation()

        mockCalculateScore.mockReturnValue(1234);
        const g = new BowlingGame();
        expect(g.score).toEqual(1234);
        expect(mockCalculateScore).toHaveBeenCalledTimes(1);
        expect(mockCalculateScore).toHaveBeenCalledWith((g as any)._frames) // HACK
    });

    // roll calls frame.roll

    //currentframenumber currentframe

    test('Increment frames once completed', () => {
        const g = new BowlingGame();
        const mockFrameComplete = jest.spyOn(g.currentFrame, 'isComplete', 'get').mockImplementation()
        expect(g.currentFrameNumber).toEqual(1);

        mockFrameComplete.mockReturnValue(false)
        g.roll(0);
        expect(g.currentFrameNumber).toEqual(1);

        mockFrameComplete.mockReturnValue(false)
        g.roll(0);
        expect(g.currentFrameNumber).toEqual(1);

        mockFrameComplete.mockReturnValue(false)
        g.roll(0);
        expect(g.currentFrameNumber).toEqual(1);

        mockFrameComplete.mockReturnValue(true)
        g.roll(0);
        expect(g.currentFrameNumber).toEqual(2);
    });

    test('Game over', () => {
        const g = new BowlingGame();
        const mockIsGameOver = jest.spyOn(g, 'isGameOver', 'get').mockImplementation()
        mockIsGameOver.mockReturnValue(true);
        expect(() => g.roll(0)).toThrow('Game Over');
    });

    afterEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });
});
