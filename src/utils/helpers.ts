/**
 * @description get string from JSON and Parse to human like format date
 * @param {string} dateString
 * @returns {string}
 */

export const dateParser = (dateString: string): string => {
    return new Date(dateString).toDateString();
};