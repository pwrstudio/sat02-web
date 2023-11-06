import type { CircleGroup } from "./types";

const DISTORTION_AMOUNT = 0.6;

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

    // Create individual groups for each dot
    for (let i = 0; i < numberOfCircles; i++) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('opacity', '0'); // Initially set each group's opacity to 0

        const cx = i * baseDistance + baseDistance / 2 + (Math.random() - 0.5) * horizontalShiftRange;
        const cy = radius + verticalShiftRange + (Math.random() - 0.5) * verticalShiftRange;

        const dot = createDistortedDot(cx, cy, radius, color, DISTORTION_AMOUNT);
        group.appendChild(dot);
        svg.appendChild(group);
    }

    // Append the SVG to the specified div element
    element.appendChild(svg);

    return svg;
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

    // Create individual groups for each dot
    for (let i = 0; i < numberOfCircles; i++) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('opacity', '0'); // Initially set each group's opacity to 0

        const cy = i * baseDistance + baseDistance / 2 + (Math.random() - 0.5) * verticalShiftRange;
        const cx = radius + horizontalShiftRange + (Math.random() - 0.5) * horizontalShiftRange;

        const dot = createDistortedDot(cx, cy, radius, color, DISTORTION_AMOUNT);
        group.appendChild(dot);
        svg.appendChild(group);
    }

    // Append the SVG to the specified div element
    element.appendChild(svg);

    return svg;
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

    // Create individual groups for each dot
    for (let i = 0; i < numberOfDots; i++) {
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        group.setAttribute('opacity', '0'); // Initially set each group's opacity to 0

        const angle = (i / numberOfDots) * 2 * Math.PI;
        const cxBase = centerX + circleWidth / 2 * Math.cos(angle);
        const cyBase = centerY + circleWidth / 2 * Math.sin(angle);
        const cx = cxBase + (Math.random() - 0.5) * horizontalShiftRange;
        const cy = cyBase + (Math.random() - 0.5) * verticalShiftRange;

        const dot = createDistortedDot(cx, cy, dotRadius, color, DISTORTION_AMOUNT);
        group.appendChild(dot);
        svg.appendChild(group);
    }

    // Append the SVG to the specified HTML element
    element.appendChild(svg);

    return svg;
}


/**
 * Creates a circular pattern of dots within an SVG element.
 *
 * @param {HTMLElement} element - The HTML element to which the SVG will be appended.
 * @param {number} circleWidth - The width of the circular pattern.
 * @param {number} dotRadius - The radius of each dot in the pattern.
 * @param {number} baseDistance - The base distance between dots on the circumference of the circle.
 * @param {string} color - The color of the dots.
 * @param {number} verticalShiftRange - The range of vertical shift for each dot.
 * @param {number} horizontalShiftRange - The range of horizontal shift for each dot.
 */
export function createCircularPattern(
    element: HTMLElement,
    circleWidth: number,
    dotRadius: number,
    baseDistance: number,
    color: string,
    verticalShiftRange: number,
    horizontalShiftRange: number
) {
    // Calculate the maximum shift range between dots.
    const maxShiftRange = Math.max(verticalShiftRange, horizontalShiftRange);

    // Calculate the SVG width and height.
    const svgWidth = circleWidth + 2 * (dotRadius + maxShiftRange);
    const svgHeight = svgWidth;

    // Create an SVG element.
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', `${svgWidth}`);
    svg.setAttribute('height', `${svgHeight}`);

    // Calculate the center coordinates of the SVG.
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;

    // Calculate the circumference of the circle and the number of dots to create.
    const circumference = Math.PI * circleWidth;
    const numberOfDots = Math.floor(circumference / baseDistance);

    // Generate and append dots to the SVG.
    for (let i = 0; i < numberOfDots; i++) {
        // Calculate the angle for placing dots evenly around the circle.
        const angle = (i / numberOfDots) * 2 * Math.PI;

        // Calculate the base coordinates of the dot on the circle's circumference.
        const cxBase = centerX + (circleWidth / 2) * Math.cos(angle);
        const cyBase = centerY + (circleWidth / 2) * Math.sin(angle);

        // Apply random horizontal and vertical shifts within the specified ranges.
        const cx = cxBase + (Math.random() - 0.5) * horizontalShiftRange;
        const cy = cyBase + (Math.random() - 0.5) * verticalShiftRange;

        // Create a distorted dot and append it to the SVG.
        const dot = createDistortedDot(cx, cy, dotRadius, color, DISTORTION_AMOUNT);
        svg.appendChild(dot);
    }

    // Append the SVG to the specified HTML element.
    element.appendChild(svg);
}

/**
 * Creates a pattern of nested circles with dots within an SVG element.
 *
 * @param {HTMLElement} element - The HTML element to which the SVG will be appended.
 * @param {number} outerCircleWidth - The width of the outer circle.
 * @param {number} dotRadius - The radius of each dot in the pattern.
 * @param {number} baseDistance - The base distance between dots on the circumference of the circles.
 * @param {string} color - The color of the dots.
 * @param {number} verticalShiftRange - The range of vertical shift for each dot.
 * @param {number} horizontalShiftRange - The range of horizontal shift for each dot.
 */
export function createNestedCircularPattern(
    element: HTMLElement,
    outerCircleWidth: number,
    dotRadius: number,
    baseDistance: number,
    color: string,
    verticalShiftRange: number,
    horizontalShiftRange: number
) {
    // Calculate the maximum shift range between dots.
    const maxShiftRange = Math.max(verticalShiftRange, horizontalShiftRange);

    // Calculate the SVG width and height based on the outer circle width.
    const svgWidth = outerCircleWidth + 2 * (dotRadius + maxShiftRange);
    const svgHeight = svgWidth;

    // Create an SVG element.
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', `${svgWidth}`);
    svg.setAttribute('height', `${svgHeight}`);

    // Calculate the center coordinates of the SVG.
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;

    // Generate and append nested circles with dots to the SVG.
    let currentCircleWidth = outerCircleWidth;
    let numberOfDots = 0;

    while (currentCircleWidth > dotRadius * 2) {
        // Calculate the circumference of the current circle and the number of dots to create.
        const circumference = Math.PI * currentCircleWidth;
        numberOfDots = Math.floor(circumference / baseDistance);

        for (let j = 0; j < numberOfDots; j++) {
            // Calculate the angle for placing dots evenly around the circle.
            const angle = (j / numberOfDots) * 2 * Math.PI;

            // Calculate the base coordinates of the dot on the circle's circumference.
            const cxBase = centerX + (currentCircleWidth / 2) * Math.cos(angle);
            const cyBase = centerY + (currentCircleWidth / 2) * Math.sin(angle);

            // Apply random horizontal and vertical shifts within the specified ranges.
            const cx = cxBase + (Math.random() - 0.5) * horizontalShiftRange;
            const cy = cyBase + (Math.random() - 0.5) * verticalShiftRange;

            // Create a distorted dot and append it to the SVG.
            const dot = createDistortedDot(cx, cy, dotRadius, color, DISTORTION_AMOUNT);
            svg.appendChild(dot);
        }

        // Reduce the current circle width for the next inner circle.
        currentCircleWidth -= 2 * baseDistance;
    }

    // Append the SVG to the specified HTML element.
    element.appendChild(svg);
}

// /**
//  * Creates a nested circular pattern of groups with distorted dots within an SVG element.
//  *
//  * @param {HTMLElement} element - The HTML element to which the SVG will be appended.
//  * @param {CircleGroup[]} circleGroups - An array of CircleGroup objects specifying each group's properties.
//  * @param {string} color - The color of the dots.
//  */
export function createNestedCircularPatternWithGroups(
    element: HTMLElement,
    circleGroups: CircleGroup[],
    color: string
) {
    const rotationIncrement = Math.PI / 76;

    const maxShiftRange = Math.max(
        ...circleGroups.map(group =>
            Math.max(group.verticalShiftRange, group.horizontalShiftRange)
        )
    );

    let accumulatedRadius = 0;

    const outermostCircleRadius = circleGroups.reduce((maxRadius, group) => {
        const groupRadius = accumulatedRadius + group.dotRadius + (group.baseDistance * group.circleCount) + maxShiftRange;
        accumulatedRadius = groupRadius;
        return Math.max(maxRadius, groupRadius);
    }, 0);

    const totalWidth = outermostCircleRadius * 2;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', `${totalWidth}`);
    svg.setAttribute('height', `${totalWidth}`);

    const centerX = totalWidth / 2;
    const centerY = totalWidth / 2;

    // Create a group (`<g>`) element for the center dot with opacity set to 0.
    const centerGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    centerGroup.classList.add('spin')
    svg.appendChild(centerGroup);

    const centerDotRadius = circleGroups[0].dotRadius;
    const centerDot = createDistortedDot(centerX, centerY, centerDotRadius, color, 0);
    centerGroup.appendChild(centerDot);  // Add the center dot to its group

    let startingRadius = 0;
    let accumulatedRotation = 0;

    for (const group of circleGroups) {
        for (let i = 0; i < group.circleCount; i++) {
            const randomIncrease = Math.random() * 2;
            const currentCircleRadius = startingRadius + group.baseDistance * (i + 1) + randomIncrease;
            const circumference = Math.PI * currentCircleRadius * 2;
            const numberOfDots = Math.floor(circumference / group.baseDistance);

            // Create a group (`<g>`) element for this circle with opacity set to 0.
            const circleGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            circleGroup.classList.add('spin')

            svg.appendChild(circleGroup);

            for (let j = 0; j < numberOfDots; j++) {
                const angle = ((j / numberOfDots) * 2 * Math.PI) + accumulatedRotation;
                const cxBase = centerX + currentCircleRadius * Math.cos(angle);
                const cyBase = centerY + currentCircleRadius * Math.sin(angle);
                const cx = cxBase + (Math.random() - 0.5) * group.horizontalShiftRange;
                const cy = cyBase + (Math.random() - 0.5) * group.verticalShiftRange;

                const dot = createDistortedDot(cx, cy, group.dotRadius, color, DISTORTION_AMOUNT);
                circleGroup.appendChild(dot);
            }

            accumulatedRotation += rotationIncrement;
        }

        startingRadius += group.baseDistance * group.circleCount;
    }

    element.appendChild(svg);

    return svg;
}

/**
 * Easing function that applies an 'ease-out quart' effect to the delay.
 * @param {number} t - The normalized time of the animation (from 0 to 1).
 * @return {number} - The eased delay time.
 */
function easeOutQuad(x: number): number {
    // return 1 - (1 - x) * (1 - x);
    return x * x;
}

function linear(x: number): number {
    return x;
}

/**
 * Gradually reveals each SVG group by fading in with a delay modified by an easing function.
 * @param {SVGSVGElement} svgElement - The SVG element containing the groups.
 * @param {number} totalDuration - The total duration in milliseconds for all groups to be revealed.
 */
export function revealGroupsWithEasing(svgElement: SVGSVGElement, totalDuration: number = 2000) {
    // Get all the group (`<g>`) elements in the SVG
    const groups = Array.from(svgElement.querySelectorAll('g'));
    const startTime = performance.now();

    function reveal(timestamp: number) {
        const elapsedTime = timestamp - startTime;
        const progress = elapsedTime / totalDuration;

        groups.forEach((group, index) => {
            const normalizedIndex = index / (groups.length - 1); // Normalize index to the range [0, 1]
            const delay = easeOutQuad(normalizedIndex);

            // Calculate the progress for each group
            if (progress >= delay && !group.classList.contains('shown')) {
                group.classList.add('shown');
            }
        });

        // Continue the animation until the total duration has been reached
        if (elapsedTime < totalDuration) {
            requestAnimationFrame(reveal);
        }
    }

    // Start the animation
    requestAnimationFrame(reveal);
}
// export function revealGroupsWithEasing(svgElement: SVGSVGElement, totalDuration: number = 2000) {
//     // Get all the group (`<g>`) elements in the SVG
//     const groups = svgElement.querySelectorAll('g');

//     groups.forEach((group, index) => {
//         // Calculate delay for each group based on its index and the easing function
//         const normalizedIndex = index / (groups.length - 1); // Normalize index to the range [0, 1]
//         const delay = easeOutQuad(normalizedIndex) * totalDuration;

//         // Set a timeout to change the opacity, based on the eased delay
//         setTimeout(() => {
//             group.classList.add('shown');
//         }, delay);
//     });
// }

/**
* Gradually reveals each SVG group by fading in with a delay modified by an easing function.
* @param {SVGSVGElement} svgElement - The SVG element containing the groups.
* @param {number} totalDuration - The total duration in milliseconds for all groups to be revealed.
*/
export function revealGroups(svgElement: SVGSVGElement, totalDuration: number = 2000) {
    // Get all the group (`<g>`) elements in the SVG
    const groups = svgElement.querySelectorAll('g');

    groups.forEach((group, index) => {
        // Calculate delay for each group based on its index and the easing function
        const normalizedIndex = index / (groups.length - 1); // Normalize index to the range [0, 1]
        const delay = linear(normalizedIndex) * totalDuration;

        // Set a timeout to change the opacity, based on the eased delay
        setTimeout(() => {
            group.classList.add('shown');
        }, delay);
    });
}
