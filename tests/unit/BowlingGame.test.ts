import BowlingGame from '@/lib/BowlingGame';
import Frame from '@/lib/Frame';
import FinalFrame from '@/lib/FinalFrame';

describe('BowlingGame', () => {

    test('.score calls helpers.calculateScore', () => {
        const mockCalculateScore = jest.spyOn(require('@/lib/helpers'), 'calculateScore').mockImplementation()

        mockCalculateScore.mockReturnValue(1234);

        const frames  = [new Frame()];
        const g = new BowlingGame(frames);

        expect(g.score).toEqual(1234);
        expect(mockCalculateScore).toHaveBeenCalledTimes(1);
        expect(mockCalculateScore).toHaveBeenCalledWith(frames);
    });

    test.each([
        ['Stay on current frame as not completed', false, 2, 0],
        ['Move to next frame as completed', true, 1, 1],
    ])('%s', (_name, isComplete, firstFrameRollCallCount, secondFrameRollCallCount) => {
        const firstFrame = new Frame();
        const firstFrameRoll = jest.spyOn(firstFrame, 'roll').mockImplementation();
        const firstFrameIsComplete = jest.spyOn(firstFrame, 'isComplete', 'get').mockImplementation();
        const secondFrame = new Frame();

        const secondFrameRoll = jest.spyOn(secondFrame, 'roll').mockImplementation();

        const g = new BowlingGame([
            firstFrame,
            secondFrame,
        ]);

        firstFrameIsComplete.mockReturnValue(isComplete);
        g.roll(123);
        g.roll(123);
        expect(firstFrameRoll).toHaveBeenCalledTimes(firstFrameRollCallCount);
        expect(secondFrameRoll).toHaveBeenCalledTimes(secondFrameRollCallCount);
    });

    test('Game Over', () => {
        const f = new FinalFrame();
        jest.spyOn(f, 'roll').mockImplementation();
        jest.spyOn(f, 'isComplete', 'get').mockReturnValue(true);

        const g = new BowlingGame([ f ]);
        g.roll(0)

        expect(() => g.roll(0)).toThrow(new Error('Game Over'));
    });

    afterEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

});
