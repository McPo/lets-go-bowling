import Frame from '@/lib/Frame';


describe('Frame', () => {

    test.each([
        [ 'Empty', new Frame([]), 0],
        [ 'Single roll', new Frame([1]), 1],
        [ 'Two rolls', new Frame([5,3]), 8],
    ])('Simple frame score %s', (name, f, result) => {
        expect(f.pinCount).toEqual(result);
    });

    test('.rolls returns rolls', () => {
        const f = new Frame([5,3]);
        expect(f.rolls).toEqual([5,3]);
    });

    test('.roll records rolls', () => {
        const f = new Frame();
        f.roll(10);
        f.roll(5);
        f.roll(4);
        expect(f.rolls).toEqual([10, 5, 4]);
    });

    test.each([
        [ 'Empty', new Frame([]), false ],
        [ 'Incomplete', new Frame([1]), false ],
        [ 'Stike', new Frame([10]), true ],
        [ 'Spare', new Frame([9,1]), true ],
        [ 'Full', new Frame([5,3]), true ],
    ])('isComplete %s', (name, f, result) => {
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
