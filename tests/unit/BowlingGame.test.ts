import BowlingGame from '@/lib/BowlingGame';
import Frame from '@/lib/Frame';
import FinalFrame from '@/lib/FinalFrame';

describe('BowlingGame', () => {

    jest.mock('@/lib/Frame', () => {
        /*
            Auto mocking, causes an issue with getters
            To maintain purity of unit tests mock the whole class
            I personally would be tempted to just use spy on relevant methods
        */
        return jest.fn().mockImplementation(() => ({
            roll: jest.fn(),
            get isComplete(): boolean {
                return false;
            }
        }));
    });

    /*
        Technically testing two things as it also tests the default Frame setup
        Again I dont think its worth changing just for the sake of purity of unit tests
    */
    test('.score calls helpers.calculateScore', () => {
        const mockCalculateScore = jest.spyOn(require('@/lib/helpers'), 'calculateScore').mockImplementation()
        mockCalculateScore.mockReturnValue(1234);

        const g = new BowlingGame();
        expect(g.score).toEqual(1234);
        expect(mockCalculateScore).toHaveBeenCalledTimes(1);
        expect(mockCalculateScore).toHaveBeenCalledWith([
            new Frame(),
            new Frame(),
            new Frame(),
            new Frame(),
            new Frame(),
            new Frame(),
            new Frame(),
            new Frame(),
            new Frame(),
            new FinalFrame(),
        ]);
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
        g.roll(10);
        g.roll(0);
        expect(firstFrameRoll).toHaveBeenCalledTimes(firstFrameRollCallCount);
        expect(secondFrameRoll).toHaveBeenCalledTimes(secondFrameRollCallCount);
    });

    test('Game over', () => {
        const f = new FinalFrame();
        /*
            Initially it is not completed until after the roll
            Should maybe have the .roll mock set it to true
            As relying on sequential calls might make this test more brittle
        */
        jest.spyOn(f, 'isComplete', 'get')
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(true);

        const g = new BowlingGame([ f ]);
        g.roll(0)

        expect(() => g.roll(0)).toThrow(new Error('Game over'));
    });

    afterEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

});
