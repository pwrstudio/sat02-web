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

/**
 * Splits an array into two parts. If the array has an odd length, the first part will have one more element than the second part.
 *
 * @template T - The type of the elements in the input array.
 * @param {T[]} array - The input array to be split.
 * @returns {[T[], T[]]} An array containing two parts. The first part may have one more element than the second if the original array has an odd length.
 * 
 * @example
 * const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 * console.log(splitArrayIntoTwoParts(arr)); // [[1,2,3,4,5], [6,7,8,9]]
 */
export function splitArrayIntoTwoParts<T>(array: T[]): [T[], T[]] {
    const middleIndex = Math.ceil(array.length / 2);

    const firstPart = array.slice(0, middleIndex);
    const secondPart = array.slice(middleIndex);

    return [firstPart, secondPart];
}