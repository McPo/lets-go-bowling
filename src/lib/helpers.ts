import Frame from "./Frame";

export function calculateScore(frames:Frame[]): number {
    return frames.flat().reduce((sum,f,i) => {
        const nextRolls =  [ frames?.[i+1]?.rolls||0, frames?.[i+2]?.rolls||0 ].flat();

        if (f.isStrike) return sum + f.score + nextRolls[0] + nextRolls[1];
        else if (f.isSpare) return sum + f.score + nextRolls[0];
        else return sum + f.score
    }, 0);
}
