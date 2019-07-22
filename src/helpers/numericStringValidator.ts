export let isNumericString = (str: string): boolean => {
    return /^\d+$/.test(str);
};