import Frame from "./Frame";

export const sumArray = (arr: number[]) => arr.reduce((sum, r) => sum+r, 0)

export function calculateScore(frames:Frame[]): number {
    return frames.flat().reduce((sum,f,i) => {
        const upcomingRolls =  (x:number) : number[] => frames.slice(i+1).map(f => f.rolls).flat().slice(0, x);

        if (f.isStrike) return sum + f.score + sumArray(upcomingRolls(2));
        else if (f.isSpare) return sum + f.score + sumArray(upcomingRolls(1));
        else return sum + f.score
    }, 0);
}
