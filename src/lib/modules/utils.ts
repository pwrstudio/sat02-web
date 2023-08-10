/**
 * Shuffle an array using the Fisher-Yates algorithm.
 * 
 * @template T - The type of array elements.
 * @param {T[]} arr - The array to be shuffled.
 * @returns {T[]} - The shuffled array.
 */
export function shuffle<T>(arr: T[]): T[] {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap
    }
    return shuffled;
}

/**
 * Picks a specified number of random elements from an array.
 * 
 * @template T - The type of array elements.
 * @param {T[]} arr - The array from which to pick elements.
 * @param {number} count - The number of elements to pick.
 * @returns {T[]} - An array of randomly picked elements.
 */
export function pickRandom<T>(arr: T[], count: number): T[] {
    const shuffled = shuffle(arr);
    return shuffled.slice(0, count);
}