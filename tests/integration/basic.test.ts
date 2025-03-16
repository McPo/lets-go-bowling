import BowlingGame from '@/lib';
import { PinCount } from '@/lib/types';

describe("Integration", () => {

    describe("Basic Frames", () => {

        test("Basic roll", () => {
            const game = new BowlingGame();
            ([
                5,3,
                2,1
            ] as PinCount[]).forEach(v => game.roll(v));
            expect(game.score).toBe(
                5+3
                +2+1
            );
        });

        test("Spare", () => {
            const game = new BowlingGame();
            ([
                4,6,
                5,0,
            ] as PinCount[]).forEach(p => game.roll(p));
            expect(game.score).toEqual(
                4+6+5
                +5+0
            );
        });

        test("Strike", () => {
            const game = new BowlingGame();
            ([
                10,
                5,4,
            ] as PinCount[]).forEach(p => game.roll(p));
            expect(game.score).toEqual(
                10+5+4
                +5+4
            );
        });

        test("Multiple strikes and spare", () => {
            const game = new BowlingGame();
            ([
                0,10,
                10,
                10,
                10,
                1,9,
                10,
                1,2
            ] as PinCount[]).forEach(p => game.roll(p));
            expect(game.score).toEqual(
                0+10+10
                +10+10+10
                +10+10+1
                +10+1+9
                +1+9+10
                +10+1+2
                +1+2
            );
        });
    });

    describe("Final Frame", () => {

        test("Basic roll", () => {
            const game = new BowlingGame();
            ([
                0,0,
                0,0,
                0,0,
                0,0,
                0,0,
                0,0,
                0,0,
                0,0,
                0,0,
                1,2
            ] as PinCount[]).forEach(p => game.roll(p));
            expect(game.score).toEqual(3);
            expect(() => game.roll(10)).toThrow('Game over');
        });

        test("Spare", () => {
            const game = new BowlingGame();
            ([
                0,0,
                0,0,
                0,0,
                0,0,
                0,0,
                0,0,
                0,0,
                0,0,
                0,0,
                9,1,8
            ] as PinCount[]).forEach(p => game.roll(p));
            expect(game.score).toEqual(9+1+8);
            expect(() => game.roll(1)).toThrow('Game over');
        });

        test("Strike", () => {
            const game = new BowlingGame();
            ([
                0,0,
                0,0,
                0,0,
                0,0,
                0,0,
                0,0,
                0,0,
                0,0,
                0,0,
                10,1,8
            ] as PinCount[]).forEach(p => game.roll(p));
            expect(game.score).toEqual(10+1+8);
            expect(() => game.roll(10)).toThrow('Game over');
        });

        test("Perfect Game", () => {
            const game = new BowlingGame();
            ([
                10,
                10,
                10,
                10,
                10,
                10,
                10,
                10,
                10,
                10,
                10,
                10
            ] as PinCount[]).forEach(p => game.roll(p));
            expect(game.score).toEqual(300);
            expect(() => game.roll(10)).toThrow('Game over');
        });

    });

});
