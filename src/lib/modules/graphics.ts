const DISTORTION_AMOUNT = 0.7;

/**
 * Generates a distorted dot as an SVG path element.
 * 
 * @param {number} cx - The center x-coordinate of the dot.
 * @param {number} cy - The center y-coordinate of the dot.
 * @param {number} dotRadius - The base radius of the dot.
 * @param {string} color - The color of the dot.
 * @param {number} distortionAmount - The amount of distortion to be applied to the dot.
 * @returns {SVGPathElement} - The SVG path element representing the distorted dot.
 */
function createDistortedDot(
    cx: number,
    cy: number,
    dotRadius: number,
    color: string,
    distortionAmount: number
): SVGPathElement {
    const distortedRadiusX = dotRadius + (Math.random() - 0.5) * distortionAmount;
    const distortedRadiusY = dotRadius + (Math.random() - 0.5) * distortionAmount;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const d = `M${cx - distortedRadiusX},${cy} 
               a${distortedRadiusX},${distortedRadiusY} 0 1,0 ${2 * distortedRadiusX},0 
               a${distortedRadiusX},${distortedRadiusY} 0 1,0 -${2 * distortedRadiusX},0`;
    path.setAttribute('d', d);
    path.setAttribute('fill', color);

    return path;
}

/**
 * Generates an SVG containing a series of filled circles that are randomly shifted.
 * 
 * @param {HTMLDivElement} element - The div element to append the SVG to.
 * @param {number} width - The width for the line to fill in pixels.
 * @param {number} radius - The radius of the circles.
 * @param {number} baseDistance - The base distance between circles.
 * @param {string} color - The color of the circles.
 * @param {number} verticalShiftRange - Range of random shift of the dots in vertical position.
 * @param {number} horizontalShiftRange - Range of random shift of the dots in horizontal position.
 */
export function createDottedLine(
    element: HTMLDivElement,
    width: number,
    radius: number,
    baseDistance: number,
    color: string,
    verticalShiftRange: number,
    horizontalShiftRange: number
) {
    // Calculate the number of circles to fit within the width
    const numberOfCircles = Math.floor(width / baseDistance);

    // Create an SVG element to contain the circles
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', `${width}`);
    svg.setAttribute('height', `${2 * radius + 2 * verticalShiftRange}`);

    // Create the circles using the createDistortedDot function
    for (let i = 0; i < numberOfCircles; i++) {
        const cx = i * baseDistance + baseDistance / 2 + (Math.random() - 0.5) * horizontalShiftRange;
        const cy = radius + verticalShiftRange + (Math.random() - 0.5) * verticalShiftRange;

        const dot = createDistortedDot(cx, cy, radius, color, DISTORTION_AMOUNT);
        svg.appendChild(dot);
    }

    // Append the SVG to the specified div element
    element.appendChild(svg);
}

/**
 * Generates an SVG containing a series of filled circles forming a vertical line that are randomly shifted.
 * 
 * @param {HTMLDivElement} element - The div element to append the SVG to.
 * @param {number} height - The height for the line to fill in pixels.
 * @param {number} radius - The radius of the circles.
 * @param {number} baseDistance - The base distance between circles.
 * @param {string} color - The color of the circles.
 * @param {number} verticalShiftRange - Range of random shift of the dots in vertical position.
 * @param {number} horizontalShiftRange - Range of random shift of the dots in horizontal position.
 */
export function createVerticalDottedLine(
    element: HTMLDivElement,
    height: number,
    radius: number,
    baseDistance: number,
    color: string,
    verticalShiftRange: number,
    horizontalShiftRange: number
) {
    // Calculate the number of circles to fit within the height
    const numberOfCircles = Math.floor(height / baseDistance);

    // Create an SVG element to contain the circles
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', `${2 * radius + 2 * horizontalShiftRange}`);
    svg.setAttribute('height', `${height}`);

    // Create the circles using the createDistortedDot function
    for (let i = 0; i < numberOfCircles; i++) {
        const cy = i * baseDistance + baseDistance / 2 + (Math.random() - 0.5) * verticalShiftRange;
        const cx = radius + horizontalShiftRange + (Math.random() - 0.5) * horizontalShiftRange;

        const dot = createDistortedDot(cx, cy, radius, color, DISTORTION_AMOUNT);
        svg.appendChild(dot);
    }

    // Append the SVG to the specified div element
    element.appendChild(svg);
}

/**
 * Generates an SVG containing a circle of filled dots, with each dot potentially randomly shifted.
 * 
 * @param {HTMLElement} element - The HTML element to append the SVG to.
 * @param {number} circleWidth - The width of the circle.
 * @param {number} dotRadius - The radius of the dots.
 * @param {number} baseDistance - The base distance between dots.
 * @param {string} color - The color of the dots.
 * @param {number} verticalShiftRange - Range of random shift of the dots in vertical position.
 * @param {number} horizontalShiftRange - Range of random shift of the dots in horizontal position.
 */
export function createDottedCircle(
    element: HTMLElement,
    circleWidth: number,
    dotRadius: number,
    baseDistance: number,
    color: string,
    verticalShiftRange: number,
    horizontalShiftRange: number
) {
    const maxShiftRange = Math.max(verticalShiftRange, horizontalShiftRange);
    const svgWidth = circleWidth + 2 * (dotRadius + maxShiftRange);
    const svgHeight = svgWidth; // Assuming it's a circle, the height is the same as the width.

    // Create an SVG element to contain the dots
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', `${svgWidth}`);
    svg.setAttribute('height', `${svgHeight}`);

    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;

    const circumference = Math.PI * circleWidth;
    const numberOfDots = Math.floor(circumference / baseDistance);

    // Create the dots
    for (let i = 0; i < numberOfDots; i++) {
        const angle = (i / numberOfDots) * 2 * Math.PI;
        const cxBase = centerX + circleWidth / 2 * Math.cos(angle);
        const cyBase = centerY + circleWidth / 2 * Math.sin(angle);
        const cx = cxBase + (Math.random() - 0.5) * horizontalShiftRange;
        const cy = cyBase + (Math.random() - 0.5) * verticalShiftRange;

        const dot = createDistortedDot(cx, cy, dotRadius, color, DISTORTION_AMOUNT);
        svg.appendChild(dot);
    }

    // Append the SVG to the specified HTML element
    element.appendChild(svg);
}

