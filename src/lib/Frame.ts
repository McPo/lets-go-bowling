
export type Frame = [number, number];

export function calculateScore(frames:Frame[]): number {
    return frames.flat().reduce((sum,r) => sum+r);
}
