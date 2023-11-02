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

/**
 * Creates a nested circular pattern of groups with distorted dots within an SVG element.
 *
 * @param {HTMLElement} element - The HTML element to which the SVG will be appended.
 * @param {CircleGroup[]} circleGroups - An array of CircleGroup objects specifying each group's properties.
 * @param {string} color - The color of the dots.
 */
export function createNestedCircularPatternWithGroups(
    element: HTMLElement,
    circleGroups: CircleGroup[],
    color: string
) {
    // Define a constant for rotation increments (e.g., 5 degrees in radians).
    const rotationIncrement = Math.PI / 76;

    // Calculate the maximum possible shift range from all circle groups.
    const maxShiftRange = Math.max(
        ...circleGroups.map(group =>
            Math.max(group.verticalShiftRange, group.horizontalShiftRange)
        )
    );

    // Initialize the accumulated radius which will help track the radius as circles are added.
    let accumulatedRadius = 0;

    // Determine the radius of the outermost circle based on all provided circle groups.
    const outermostCircleRadius = circleGroups.reduce((maxRadius, group) => {
        const groupRadius = accumulatedRadius + group.dotRadius + (group.baseDistance * group.circleCount) + maxShiftRange;
        accumulatedRadius = groupRadius;  // Update accumulatedRadius for the next group
        return Math.max(maxRadius, groupRadius);
    }, 0);

    // Calculate the total width (or height) of the SVG based on the outermost circle.
    const totalWidth = outermostCircleRadius * 2;

    // Create an SVG element and set its width and height.
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', `${totalWidth}`);
    svg.setAttribute('height', `${totalWidth}`);

    // Define center coordinates for the SVG.
    const centerX = totalWidth / 2;
    const centerY = totalWidth / 2;

    // Place a single dot at the center of the SVG.
    const centerDotRadius = circleGroups[0].dotRadius; // Assuming the first circle group has the desired specs for the center dot.
    const centerDot = createDistortedDot(centerX, centerY, centerDotRadius, color, 0); // No distortion for the center dot.
    svg.appendChild(centerDot);

    // Initialize variables to track the starting radius and accumulated rotation for each circle group.
    let startingRadius = 0;
    let accumulatedRotation = 0;

    // Loop through each circle group to create the pattern.
    for (const group of circleGroups) {
        for (let i = 0; i < group.circleCount; i++) {
            // Randomly increase the distance between the circles.
            const randomIncrease = Math.random() * 2;  // Adjust this value to control the random increase.
            const currentCircleRadius = startingRadius + group.baseDistance * (i + 1) + randomIncrease;

            // Calculate the circumference for the current circle.
            const circumference = Math.PI * currentCircleRadius * 2;

            // Determine the number of dots based on the circumference and base distance.
            const numberOfDots = Math.floor(circumference / group.baseDistance);

            // Place dots around the current circle.
            for (let j = 0; j < numberOfDots; j++) {
                const angle = ((j / numberOfDots) * 2 * Math.PI) + accumulatedRotation;
                const cxBase = centerX + currentCircleRadius * Math.cos(angle);
                const cyBase = centerY + currentCircleRadius * Math.sin(angle);
                const cx = cxBase + (Math.random() - 0.5) * group.horizontalShiftRange;
                const cy = cyBase + (Math.random() - 0.5) * group.verticalShiftRange;

                // Create a distorted dot and add it to the SVG.
                const dot = createDistortedDot(cx, cy, group.dotRadius, color, DISTORTION_AMOUNT);
                svg.appendChild(dot);
            }

            // Increment the accumulated rotation for staggered circle placement.
            accumulatedRotation += rotationIncrement;
        }
        // Update the starting radius for the next group.
        startingRadius += group.baseDistance * group.circleCount;
    }

    // Append the constructed SVG to the provided HTML element.
    element.appendChild(svg);
}

/**
 * Creates a nested circular pattern of groups with distorted dots within an SVG element, animated from inside to out.
 *
 * @param {HTMLElement} element - The HTML element to which the SVG will be appended.
 * @param {CircleGroup[]} circleGroups - An array of CircleGroup objects specifying each group's properties.
 * @param {string} color - The color of the dots.
 * @param {number} delay - Delay in milliseconds between drawing each circle.
 */
export function createAnimatedNestedCircularPatternWithDots(
    element: HTMLElement,
    circleGroups: CircleGroup[],
    color: string,
    delay: number
) {
    // Define a constant for rotation increments (e.g., 5 degrees in radians).
    const rotationIncrement = Math.PI / 76;

    // Calculate the maximum possible shift range from all circle groups.
    const maxShiftRange = Math.max(
        ...circleGroups.map(group =>
            Math.max(group.verticalShiftRange, group.horizontalShiftRange)
        )
    );

    // Initialize the accumulated radius which will help track the radius as circles are added.
    let accumulatedRadius = 0;

    // Determine the radius of the outermost circle based on all provided circle groups.
    const outermostCircleRadius = circleGroups.reduce((maxRadius, group) => {
        const groupRadius = accumulatedRadius + group.dotRadius + (group.baseDistance * group.circleCount) + maxShiftRange;
        accumulatedRadius = groupRadius;  // Update accumulatedRadius for the next group
        return Math.max(maxRadius, groupRadius);
    }, 0);

    // Calculate the total width (or height) of the SVG based on the outermost circle.
    const totalWidth = outermostCircleRadius * 2;

    // Create an SVG element and set its width and height.
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', `${totalWidth}`);
    svg.setAttribute('height', `${totalWidth}`);

    // Define center coordinates for the SVG.
    const centerX = totalWidth / 2;
    const centerY = totalWidth / 2;

    // Place a single dot at the center of the SVG.
    const centerDotRadius = circleGroups[0].dotRadius; // Assuming the first circle group has the desired specs for the center dot.
    const centerDot = createDistortedDot(centerX, centerY, centerDotRadius, color, 0); // No distortion for the center dot.
    svg.appendChild(centerDot);

    // Initialize variables to track the starting radius and accumulated rotation for each circle group.
    let startingRadius = 0;
    let accumulatedRotation = 0;

    let dotsQueue: { cx: number, cy: number, radius: number }[] = [];

    for (const group of circleGroups) {
        for (let i = 0; i < group.circleCount; i++) {
            // Randomly increase the distance between the circles.
            const randomIncrease = Math.random() * 2;  // Adjust this value to control the random increase.
            const currentCircleRadius = startingRadius + group.baseDistance * (i + 1) + randomIncrease;

            // Calculate the circumference for the current circle.
            const circumference = Math.PI * currentCircleRadius * 2;

            // Determine the number of dots based on the circumference and base distance.
            const numberOfDots = Math.floor(circumference / group.baseDistance);

            // Add dots information to dotsQueue.
            for (let j = 0; j < numberOfDots; j++) {
                const angle = ((j / numberOfDots) * 2 * Math.PI) + accumulatedRotation;
                const cxBase = centerX + currentCircleRadius * Math.cos(angle);
                const cyBase = centerY + currentCircleRadius * Math.sin(angle);
                const cx = cxBase + (Math.random() - 0.5) * group.horizontalShiftRange;
                const cy = cyBase + (Math.random() - 0.5) * group.verticalShiftRange;

                dotsQueue.push({
                    cx: cx,
                    cy: cy,
                    radius: group.dotRadius
                });
            }

            // Increment the accumulated rotation for staggered circle placement.
            accumulatedRotation += rotationIncrement;
        }
        // Update the starting radius for the next group.
        startingRadius += group.baseDistance * group.circleCount;
    }

    // Function to draw dots one by one with a delay.
    function drawDot() {
        const dotInfo = dotsQueue.shift();  // Get the next dot from the queue
        if (dotInfo) {
            const dot = createDistortedDot(dotInfo.cx, dotInfo.cy, dotInfo.radius, color, DISTORTION_AMOUNT);
            svg.appendChild(dot);
            setTimeout(drawDot, delay);  // Schedule the next dot drawing
        } else {
            // Append the constructed SVG to the provided HTML element once all dots are drawn.
            element.appendChild(svg);
        }
    }

    drawDot();  // Start the drawing process
}



