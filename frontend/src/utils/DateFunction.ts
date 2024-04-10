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

export const calculateAge = (birthdate?: string): number | undefined => {
    // Check if the birthdate is provided
    if (!birthdate) {
        return undefined; // Return null if birthdate is not provided
    }

    const today = new Date(); // Get the current date
    const birthDate = new Date(birthdate); // Convert the birthdate string to a Date object

    // Check if the birthdate is valid
    if (isNaN(birthDate.getTime())) {
        return undefined; // Return null if birthdate is invalid
    }

    let age = today.getFullYear() - birthDate.getFullYear(); // Calculate the difference in years

    // Check if the birthday has occurred this year
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--; // Subtract 1 from age if birthday hasn't occurred yet
    }

    return age; // Return the calculated age
}
