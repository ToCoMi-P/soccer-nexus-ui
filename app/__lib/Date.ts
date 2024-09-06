export function getNextMonday(date: Date): string {
    const dayOfWeek = date.getDay(); // Sunday - Saturday : 0 - 6
    const daysUntilNextMonday = (8 - dayOfWeek) % 7 || 7; // Calculate the offset for the next Monday

    const nextMonday = new Date(date); // Create a new Date object to avoid mutating the original date
    nextMonday.setDate(date.getDate() + daysUntilNextMonday);

    // Format the date to 'YYYY-MM-DD'
    const year = nextMonday.getFullYear();
    const month = String(nextMonday.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const day = String(nextMonday.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
