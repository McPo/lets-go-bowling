import Frame from '@/lib/Frame';


describe('Frame', () => {

    test.each([
        [ 'Empty', new Frame([]), 0],
        [ 'Single roll', new Frame([1]), 1],
        [ 'Two rolls', new Frame([5,3]), 8],
    ])('Simple frame score %s', (_name, f, result) => {
        expect(f.pinCount).toEqual(result);
    });

    test('Get rolls', () => {
        const f = new Frame([5,3]);
        expect(f.rolls).toEqual([5,3]);
    });

    test('Record roll', () => {
        const f = new Frame();
        f.roll(8);
        f.roll(5);
        expect(f.rolls).toEqual([8, 5]);
    });

    /*
        I would not normally do this
        I would normaly just try rolling again in the above test and assert the error
        However this might be more in keeping with the unit tests you specified
    */
    test('Roll on finished frame', () => {
        const f = new Frame();
        const firstFrameRoll = jest.spyOn(f, 'isComplete', 'get').mockReturnValue(true);
        expect(() => f.roll(10)).toThrow('Frame is over');
    });

    test.each([
        [ 'Empty', new Frame([]), false ],
        [ 'Incomplete', new Frame([1]), false ],
        [ 'Strike', new Frame([10]), true ],
        [ 'Spare', new Frame([9,1]), true ],
        [ 'Full', new Frame([5,3]), true ],
    ])('isComplete %s', (_name, f, result) => {
        expect(f.isComplete).toEqual(result);
    });

    test.each([
        [ new Frame([5,3]), false ],
        [ new Frame([9,1]), true ],
        [ new Frame([1,9]), true ],
        /*
            For a frame to be considered a spare frame
            All pins must be knocked down in the first 2 rolls
            This has an impact on the FinalFrame
        */
        [ new Frame([1,0,9]), false ]
    ])('isSpare %s', (frame, result) => {
        expect(frame.isSpare).toEqual(result);
    });

    test.each([
        [ new Frame([5,3]), false ],
        [ new Frame([9,1]), false ],
        [ new Frame([10]), true ],
        /*
            For a frame to be considered a spare frame
            All pins must be knocked down in the first 2 rolls
            This has an impact on the FinalFrame
        */
        [ new Frame([0,10,10]), false ]
        ])('isStrike %s', (frame, result) => {
            expect(frame.isStrike).toEqual(result);
    });

    test('toString', () => {
        const f = new Frame([3, 6])
        expect(f.toString()).toEqual('Frame[3,6]');
    });

});
