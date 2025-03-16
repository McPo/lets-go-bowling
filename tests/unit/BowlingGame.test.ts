import BowlingGame from '@/lib/BowlingGame';

describe('BowlingGame', () => {

    test('.score calls helpers.calculateScore', () => {
        const mockCalculateScore = jest.spyOn(require('@/lib/helpers'), 'calculateScore').mockImplementation()

        mockCalculateScore.mockReturnValue(1234);
        const g = new BowlingGame();
        expect(g.score).toEqual(1234);
        expect(mockCalculateScore).toHaveBeenCalledTimes(1);
        expect(mockCalculateScore).toHaveBeenCalledWith(g.frames);
    });

    test('.roll calls frame.roll', () => {
        const g = new BowlingGame();
        const mockFrameRoll = jest.spyOn(g.currentFrame, 'roll').mockImplementation()
        g.roll(123);
        expect(mockFrameRoll).toHaveBeenCalledTimes(1);
        expect(mockFrameRoll).toHaveBeenCalledWith(123);
    });

    // currentframenumber currentframe isGameOver
    // add readonly frame tests

    test.each([
        ['Dont increment frame on roll as not completed', false, 1],
        ['Increment frame on roll as completed', true, 2],
    ])('%s', (name, completed, finalFrameNumber) => {
        const g = new BowlingGame();
        const mockFrameComplete = jest.spyOn(g.currentFrame, 'isComplete', 'get').mockImplementation()
        expect(g.currentFrameNumber).toEqual(1);

        mockFrameComplete.mockReturnValue(completed)
        g.roll(0);
        expect(g.currentFrameNumber).toEqual(finalFrameNumber);
    });

    test('roll returns error if game is over', () => {
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
