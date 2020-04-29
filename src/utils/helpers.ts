export const dateParser = (dateString:string):string => {
    return new Date(dateString).toDateString()
};