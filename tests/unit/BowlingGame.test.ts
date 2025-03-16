import BowlingGame from '@/lib/BowlingGame';
import Frame from '@/lib/Frame';
import FinalFrame from '@/lib/FinalFrame';

describe('BowlingGame', () => {

    test('.score calls helpers.calculateScore', () => {
        const mockCalculateScore = jest.spyOn(require('@/lib/helpers'), 'calculateScore').mockImplementation()

        mockCalculateScore.mockReturnValue(1234);
        const g = new BowlingGame();
        expect(g.score).toEqual(1234);
        expect(mockCalculateScore).toHaveBeenCalledTimes(1);
        expect(mockCalculateScore).toHaveBeenCalledWith(g.frames);
    });

    test('.frames returns frames, list ends with Final Frame', () => {
        const g = new BowlingGame();
        expect(g.frames).toEqual([
            new Frame(),
            new Frame(),
            new Frame(),
            new Frame(),
            new Frame(),
            new Frame(),
            new Frame(),
            new Frame(),
            new Frame(),
            new FinalFrame()
        ]);
    });

    test('.roll calls frame.roll', () => {
        const g = new BowlingGame();
        const mockFrameRoll = jest.spyOn(g.currentFrame, 'roll').mockImplementation()
        g.roll(123);
        expect(mockFrameRoll).toHaveBeenCalledTimes(1);
        expect(mockFrameRoll).toHaveBeenCalledWith(123);
    });

    // add readonly frame tests

    test.each([
        ['Dont increment frame on roll as not completed', false, 1],
        ['Increment frame on roll as completed', true, 2],
    ])('currentFrameNumber %s', (name, completed, finalFrameNumber) => {
        const g = new BowlingGame();
        const mockFrameComplete = jest.spyOn(g.currentFrame, 'isComplete', 'get').mockImplementation()
        expect(g.currentFrameNumber).toEqual(1);

        mockFrameComplete.mockReturnValue(completed)
        g.roll(0);
        expect(g.currentFrameNumber).toEqual(finalFrameNumber);
    });

    test('currentFrame', () => {
        const g = new BowlingGame();
        const mockCurrentFrameNumber= jest.spyOn(g, 'currentFrameNumber', 'get').mockImplementation()

        mockCurrentFrameNumber.mockReturnValue(1);
        expect(g.currentFrame).toBe(g.frames[0]);

        mockCurrentFrameNumber.mockReturnValue(2);
        expect(g.currentFrame).toBe(g.frames[1]);
    });

    test.each([
        [new Frame(), false, false],
        [new Frame(), true, false],
        [new FinalFrame(), false, false],
        [new FinalFrame(), true, true],
    ])('isGameOver %s', (f, completed, gameOver) => {
        const g = new BowlingGame();
        const mockFrameIsComplete = jest.spyOn(f, 'isComplete', 'get').mockImplementation();
        const mockCurrentFrame = jest.spyOn(g, 'currentFrame', 'get').mockImplementation();

        mockFrameIsComplete.mockReturnValue(completed);
        mockCurrentFrame.mockReturnValue(f);

        expect(g.isGameOver).toBe(gameOver);
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
