export const DateToString = (dateString?: string) => {
    if (!dateString) {
        return ''; // Or you can return some default value if necessary
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        // Invalid date string
        return ''; // Or you can handle the error accordingly
    }
    const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    return formattedDate;
}

export const TimeToString12Hour = (timeString?: string) => {
    if (!timeString) {
        return ''; // Or you can return some default value if necessary
    }

    const [hours, minutes] = timeString.split(':');
    let hoursNum = parseInt(hours, 10);
    const period = hoursNum >= 12 ? 'PM' : 'AM';

    if (hoursNum === 0) {
        hoursNum = 12;
    } else if (hoursNum > 12) {
        hoursNum -= 12;
    }

    const formattedTime = `${hoursNum}:${minutes} ${period}`;
    return formattedTime;
}
