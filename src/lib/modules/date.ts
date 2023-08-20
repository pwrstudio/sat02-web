/**
 * Formats a given datetime string into the format "DD-MM-YYYY".
 *
 * @param {string} dateTime - An ISO datetime string to format.
 * @returns {string} The formatted date string.
 * 
 * @example
 * formatDate("2023-11-22T15:37:00.000Z"); 
 * // returns "22-11-2023"
 */
export function formatDate(dateTime: string): string {
    // Create a new date object
    const myDate = new Date(dateTime);

    // Convert date to MM/DD/YYYY format
    const dateArray = myDate.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).split('/');

    // Return formatted string as DD-MM-YYYY
    return `${dateArray[1]}-${dateArray[0]}-${dateArray[2]}`;
}

/**
 * Formats a given datetime string into the format "DD-MM-YYYY, HH:mm (in CET timezone)".
 *
 * @param {string} dateTime - An ISO datetime string to format.
 * @returns {string} The formatted datetime string.
 * 
 * @example
 * formatDateTime("2023-11-22T15:37:00.000Z"); 
 * // returns "22-11-2023, 16:37" (given that CET is UTC+1)
 */
export function formatDateTime(dateTime: string): string {
    // Create a new date object
    const myDate = new Date(dateTime);

    // Convert date to MM/DD/YYYY format
    const dateArray = myDate.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).split('/');

    // Convert time to HH:mm format in CET timezone
    const formattedTime = myDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: 'CET'
    });

    // Return formatted string as DD-MM-YYYY, HH:mm
    return `${dateArray[1]}-${dateArray[0]}-${dateArray[2]}, ${formattedTime}`;
}

/**
 * Formats a given datetime string into the format "Thursday 8th Nov. 19:00".
 *
 * @param {string} dateTime - An ISO datetime string to format.
 * @returns {string} The formatted datetime string.
 *
 * @example
 * formatDateTime("2023-11-08T19:00:00.000Z"); 
 * // returns "Thursday 8th Nov. 19:00" (given that CET is UTC+1)
 */
export function formatFullDateTime(dateTime: string): string {
    // Create a new date object
    const myDate = new Date(dateTime);

    // Get day of the week (e.g., Thursday)
    const dayOfWeek = myDate.toLocaleString('en-US', {
        weekday: 'long',
        timeZone: 'CET'
    });

    // Get numeric day of the month
    const numericDayOfMonth = myDate.toLocaleString('en-US', {
        day: 'numeric',
        timeZone: 'CET'
    });

    // Get day of the month with ordinal suffix (e.g., 8th)
    const dayOfMonth = numericDayOfMonth + getOrdinalSuffix(Number(numericDayOfMonth));


    // Get month (e.g., Nov)
    const month = myDate.toLocaleString('en-US', {
        month: 'short',
        timeZone: 'CET'
    });

    // Convert time to HH:mm format in CET timezone
    const formattedTime = myDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: 'CET'
    });

    // Return formatted string
    return `${dayOfWeek} ${dayOfMonth} ${month}. ${formattedTime}`;
}

/**
 * Returns the ordinal suffix for a given number.
 * 
 * @param {number} n - The number for which to determine the ordinal suffix.
 * @returns {string} The ordinal suffix (e.g., "st", "nd", "rd", "th").
 */
function getOrdinalSuffix(n: number): string {
    if (n >= 11 && n <= 13) {
        return 'th';
    }
    switch (n % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}


/**
 * Calculate the time remaining until the specified datetime.
 *
 * @param targetDateTime - The target datetime string in the format "YYYY-MM-DDTHH:mm:ss.sssZ"
 * @returns A string representing the time remaining until the target datetime.
 */
export function timeUntil(targetDateTime: string): string {
    // Parse the provided date-time string into a Date object.
    const targetDate = new Date(targetDateTime);

    // Calculate the difference in milliseconds between the current time and the target time.
    const currentTime = new Date();
    const diffInMilliseconds = targetDate.getTime() - currentTime.getTime();

    // Check if the difference is less than one hour.
    if (diffInMilliseconds < 60 * 60 * 1000) {
        const diffInMinutes = Math.round(diffInMilliseconds / (60 * 1000));
        return `Starts in ${diffInMinutes} minutes`;
    }
    // Check if the difference is less than one day but more than one hour.
    else if (diffInMilliseconds < 24 * 60 * 60 * 1000) {
        const diffInHours = Math.round(diffInMilliseconds / (60 * 60 * 1000));
        return `Starts in ${diffInHours} hours`;
    } else {
        const diffInDays = Math.round(diffInMilliseconds / (24 * 60 * 60 * 1000));
        return `Starts in ${diffInDays} days`;
    }
}


export function getSharjahTime() {
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // 24-hour format
        timeZone: "Asia/Dubai",
    }
    const formattedTime = new Intl.DateTimeFormat("en-US", options).format(now)
    return formattedTime
}