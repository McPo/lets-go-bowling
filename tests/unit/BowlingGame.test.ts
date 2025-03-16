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

    test('.roll calls frame.roll', () => {

        const firstFrame = new Frame();
        const secondFrame = new Frame();

        const froll = jest.spyOn(firstFrame, 'roll').mockImplementation();
        const sroll = jest.spyOn(secondFrame, 'roll').mockImplementation();

        const fcom = jest.spyOn(firstFrame, 'isComplete', 'get').mockImplementation();
        const scom = jest.spyOn(secondFrame, 'isComplete', 'get').mockImplementation();

        const g = new BowlingGame([
            firstFrame,
            secondFrame,
        ]);

        fcom.mockReturnValue(true);
        g.roll(123);
        g.roll(123);
        expect(froll).toHaveBeenCalledTimes(1);
        expect(sroll).toHaveBeenCalledTimes(1);
    });
/*
    test('Stay on frame until completed') {
        /

    test('Move to next frame when completed', () => {
        const firstFrame = new Frame();
        const secondFrame = new Frame();


        const g = new BowlingGame([
            firstFrame,
            secondFrame,
        ]);

        g.roll(123);
        expect(mockFirstFrame).toHaveBeenCalledTimes(1);
        expect(mockFirstFrame).toHaveBeenCalledWith(123);
        expect(mockSecondFrame).toHaveBeenCalledTimes(0);

    });

    test.each([
        ['Dont increment frame on roll as not completed', false, ],
        ['Increment frame on roll as completed', true, 2],
    ])('currentFrameNumber %s', (name, completed, finalFrameNumber) => {

        const firstFrame = new Frame();
        const secondFrame = new Frame();

        const mockFirstFrame = jest.spyOn(firstFrame, 'roll').mockImplementation()
        const mockSecondFrame = jest.spyOn(secondFrame, 'roll').mockImplementation()

        const g = new BowlingGame([
            firstFrame,
            secondFrame,
        ]);

        g.roll(123);
        expect(mockFirstFrame).toHaveBeenCalledTimes(1);
        expect(mockFirstFrame).toHaveBeenCalledWith(123);
        expect(mockSecondFrame).toHaveBeenCalledTimes(0);
        

        const g = new BowlingGame();
        const mockFrameComplete = jest.spyOn(g.currentFrame, 'isComplete', 'get').mockImplementation()
        expect(g.currentFrameNumber).toEqual(1);

        mockFrameComplete.mockReturnValue(completed)
        g.roll(0);
        expect(g.currentFrameNumber).toEqual(finalFrameNumber);
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
    });*/

    /*afterEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });*/
});
