import Frame from "./Frame";

export const sumArray = (arr: number[]) => arr.reduce((sum, r) => sum+r, 0);

export function calculateScore(frames: Frame[]): number {
    const upcomingRolls =  (i: number, x: number): number[] => frames.slice(i+1, i+x+1).map(f => f.rolls).flat().slice(0, x);
    return frames.flat().reduce((sum, f, i) => {
        if (f.isStrike) return sum + f.pinCount + sumArray(upcomingRolls(i, 2));
        else if (f.isSpare) return sum + f.pinCount + sumArray(upcomingRolls(i, 1));
        else return sum + f.pinCount
    }, 0);
}
