import Frame from '@/lib/Frame';
import FinalFrame from '@/lib/FinalFrame';
import { sumArray, calculateScore } from '@/lib/helpers';

describe('Helpers', () => {

    test.each([
        ['Empty', [], 0],
        ['Not empty', [1,2,3], 6]
    ])('Sum array %s', (name, arr, result) => {
        expect(sumArray(arr)).toEqual(result);
    });

    // Technically not a unit test as Frame.score is called, we could remove it though
    describe('calculateScore', () => {

        test('Basic rolls', () => {

            expect(calculateScore([
                new Frame([5,3]),
                new Frame([2,1])
            ]) ).toEqual(
                5+3
                +2+1
            );
        });

        test('Spare rolls', () => {
            expect(calculateScore([
                new Frame([9,1]),
                new Frame([2,1])
            ]) ).toEqual(
                9+1+2
                +2+1
            );
        });

        test('Spare pending', () => {
            expect(calculateScore([
                new Frame([9,1])
            ]) ).toEqual(
                9+1
            );
        });

        test('Spares in a row', () => {
            expect(calculateScore([
                new Frame([9,1]),
                new Frame([1,9]),
                new Frame([5,5])
            ]) ).toEqual(
                9+1+1
                +1+9+5
                +5+5
            );
        });

        test('Strike rolls', () => {
            expect(calculateScore([
                new Frame([10]),
                new Frame([5,4])
            ]) ).toEqual(
                10+5+4
                +5+4
            );
        });

        test('Strike pending', () => {
            expect(calculateScore([
                new Frame([10])
            ]) ).toEqual(
                10
            );
        });

        test('Strikes in a row', () => {
            expect(calculateScore([
                new Frame([10]),
                new Frame([10]),
                new Frame([10])
            ]) ).toEqual(
                10+10+10
                +10+10
                +10
            );
        });

        test('Spare on final frame', () => {
            expect(calculateScore([
                new Frame([0, 0]),
                new Frame([0, 0]),
                new Frame([0, 0]),
                new Frame([0, 0]),
                new Frame([0, 0]),
                new Frame([0, 0]),
                new Frame([0, 0]),
                new Frame([0, 0]),
                new Frame([0, 0]),
                new FinalFrame([1,9,1]),
            ]) ).toEqual(
                1+9+1
            );
        });

        test('Strike on final frame', () => {
            expect(calculateScore([
                new Frame([0,0]),
                new Frame([0,0]),
                new Frame([0,0]),
                new Frame([0,0]),
                new Frame([0,0]),
                new Frame([0,0]),
                new Frame([0,0]),
                new Frame([0,0]),
                new Frame([0,0]),
                new FinalFrame([10,10,10]),
            ]) ).toEqual(
                10+10+10
            );
        });

        test('Perfect Game', () => {
            expect(calculateScore([
                new Frame([10]),
                new Frame([10]),
                new Frame([10]),
                new Frame([10]),
                new Frame([10]),
                new Frame([10]),
                new Frame([10]),
                new Frame([10]),
                new Frame([10]),
                new FinalFrame([10,10,10]),
            ]) ).toEqual(
                300
            );

        });

    });

});
