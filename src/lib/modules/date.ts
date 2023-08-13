export function formatDate(dateTime: string) {
    // Create a new date object
    const myDate = new Date(dateTime);

    // MM/DD/YYYY
    const dateArray = myDate.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).split('/')

    // DD-MM-YYYY
    return `${dateArray[1]}-${dateArray[0]}-${dateArray[2]}`;
}

export function formatDateTime(dateTime: string) {
    // Create a new date object
    const myDate = new Date(dateTime);

    // MM/DD/YYYY
    const dateArray = myDate.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).split('/')

    const formattedTime = myDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        timeZone: 'CET'
    });

    // DD-MM-YYYY
    return `${dateArray[1]}-${dateArray[0]}-${dateArray[2]}, ${formattedTime}`;
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