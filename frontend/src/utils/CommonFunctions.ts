export const generateRandomId = () => {
    return Math.random().toString(36).substring(7);
};

export const getMiddleInitial = (middlename: string) => {
    if (middlename && middlename.length > 0) {
        return middlename.charAt(0).toUpperCase() + '.';
    }
    return '';
};