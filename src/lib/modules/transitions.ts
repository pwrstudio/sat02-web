/**
 * Simulate a typewriter effect on the given node's text content.
 *
 * @param {Node} node - The HTML node where the typewriter effect will be applied.
 * @param {object} options - Configuration options for the typewriter effect.
 * @param {number} [options.delay=0] - The delay before starting the typewriter effect.
 * @param {number} [options.speed=50] - The speed at which characters are typed.
 * @returns {object} Object containing properties related to the effect.
 */
export function typewriter(node: Node, { delay = 0, speed = 50 }: { delay?: number, speed?: number }) {
    const textNodes = getAllTextNodes(node);
    if (!textNodes.length) {
        throw new Error(`This transition only works on elements with text nodes`);
    }

    let totalLength = 0;
    const ranges = textNodes.map(textNode => {
        const range = [totalLength, totalLength + textNode.textContent!.length];
        totalLength += textNode.textContent!.length;
        const text = textNode.textContent;
        textNode.textContent = '';
        return { textNode, range, text };
    });

    let currentRangeIndex = 0;
    function getCurrentRange(i: number) {
        while (ranges[currentRangeIndex].range[1] < i && currentRangeIndex < ranges.length) {
            const { textNode, text } = ranges[currentRangeIndex];
            textNode.textContent = text; // finish typing up the last node
            currentRangeIndex++;
        }
        return ranges[currentRangeIndex];
    }
    const duration = totalLength * speed;

    return {
        delay,
        duration,
        tick: (t: number) => {
            const progress = ~~(totalLength * t);
            const { textNode, range, text } = getCurrentRange(progress);
            const [start, end] = range;
            const textLength = ((progress - start) / (end - start)) * text.length;
            textNode.textContent = text.slice(0, textLength);
        },
    };
}

/**
 * Retrieve all text nodes within the given node.
 *
 * @param {Node} node - The parent node from which text nodes will be retrieved.
 * @returns {Node[]} An array of text nodes.
 */
function getAllTextNodes(node: Node): Node[] {
    if (node.nodeType === 3) {
        return [node];
    } else if (node.hasChildNodes()) {
        let list: Node[] = [];
        for (let child of Array.from(node.childNodes)) {
            getAllTextNodes(child).forEach(textNode => list.push(textNode));
        }
        return list;
    }
    return [];
}
